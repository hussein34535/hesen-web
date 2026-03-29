'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Hls from 'hls.js';
import { ArrowRight, Maximize2, Minimize2, Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';

export default function PlayerContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const url = searchParams.get('url') || '';
    const name = searchParams.get('name') || 'مشغل الفيديو';
    const isPremium = searchParams.get('premium') === 'true';

    // Premium Check Logic (User Suggestion)
    // Premium Check Logic (User Suggestion)
    useEffect(() => {
        // Mock Auth State - In a real app, this comes from useAuth() context
        const user = { isLoggedIn: true, isSubscribed: true }; // CHANGE THIS TO TEST

        if (isPremium) {
            if (!user.isLoggedIn) {
                router.replace('/login'); // Redirect to login first (Secure Replace)
                return;
            }
            if (!user.isSubscribed) {
                router.replace('/premium'); // Then check premium (Secure Replace)
                return;
            }
        }
    }, [isPremium, router]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showControls, setShowControls] = useState(true);

    // Volume Persistence
    useEffect(() => {
        const savedVolume = localStorage.getItem('player_volume');
        if (savedVolume !== null) {
            const vol = parseFloat(savedVolume);
            setVolume(vol);
            setIsMuted(vol === 0);
        }
    }, []);

    useEffect(() => {
        if (!url || !videoRef.current) return;

        const video = videoRef.current;
        video.volume = volume;

        // Check if URL is HLS
        if (url.includes('.m3u8')) {
            if (Hls.isSupported()) {
                // Use HLS.js for non-Safari browsers
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 60,
                    maxBufferLength: 30,
                    maxMaxBufferLength: 60,
                    manifestLoadingMaxRetry: 4,
                    levelLoadingMaxRetry: 4,
                });
                hlsRef.current = hls;

                hls.loadSource(url);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setIsLoading(false);
                    video.play().catch(() => { });
                });

                hls.on(Hls.Events.ERROR, (_, data) => {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                hls.recoverMediaError();
                                break;
                            default:
                                setError('فشل تحميل البث');
                                setIsLoading(false);
                                break;
                        }
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native HLS support (Safari/iOS)
                video.src = url;
                video.addEventListener('loadedmetadata', () => {
                    setIsLoading(false);
                    video.play().catch(() => { });
                });
            } else {
                setError('المتصفح لا يدعم هذا النوع من الفيديو');
                setIsLoading(false);
            }
        } else {
            // Regular video
            video.src = url;
            video.addEventListener('loadeddata', () => setIsLoading(false));
        }

        video.addEventListener('play', () => setIsPlaying(true));
        video.addEventListener('pause', () => setIsPlaying(false));
        video.addEventListener('error', () => {
            setError('فشل تشغيل الفيديو');
            setIsLoading(false);
        });

        // Track PiP changes
        const onEnterPiP = () => setIsPiP(true);
        const onLeavePiP = () => setIsPiP(false);
        video.addEventListener('enterpictureinpicture', onEnterPiP);
        video.addEventListener('leavepictureinpicture', onLeavePiP);

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
            video.removeEventListener('enterpictureinpicture', onEnterPiP);
            video.removeEventListener('leavepictureinpicture', onLeavePiP);
        };
    }, [url]);

    // Auto-hide controls
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (showControls && isPlaying) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [showControls, isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMute = !isMuted;
            videoRef.current.muted = newMute;
            setIsMuted(newMute);
            if (!newMute && volume === 0) {
                setVolume(1);
                videoRef.current.volume = 1;
                localStorage.setItem('player_volume', '1');
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = value;
            videoRef.current.muted = value === 0;
            setVolume(value);
            setIsMuted(value === 0);
            localStorage.setItem('player_volume', value.toString());
        }
    };

    const togglePiP = async () => {
        if (!videoRef.current) return;
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await videoRef.current.requestPictureInPicture();
            }
        } catch (e) {
            console.error('PiP error:', e);
        }
    };

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        try {
            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
                setIsFullscreen(true);
                // Lock to landscape on mobile
                if (screen.orientation && 'lock' in screen.orientation) {
                    try {
                        await (screen.orientation as any).lock('landscape');
                    } catch { }
                }
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
                if (screen.orientation && 'unlock' in screen.orientation) {
                    (screen.orientation as any).unlock();
                }
            }
        } catch (e) {
            console.error('Fullscreen error:', e);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-black/80 backdrop-blur">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ArrowRight size={24} />
                </button>
                <h1 className="text-lg font-bold truncate">{name}</h1>
            </div>

            {/* Video Container */}
            <div
                ref={containerRef}
                className="relative video-container mx-auto max-w-4xl"
                style={{ direction: 'ltr' }}
                onClick={() => setShowControls(!showControls)}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    playsInline
                    autoPlay
                    webkit-playsinline="true"
                />

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 size={48} className="animate-spin text-[var(--primary)]" />
                    </div>
                )}

                {/* Error Overlay */}
                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                        <p className="text-[var(--error)] text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-[var(--primary)] rounded-full"
                        >
                            إعادة المحاولة
                        </button>
                    </div>
                )}

                {/* Controls Overlay */}
                {showControls && !isLoading && !error && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300">
                        {/* Center Play Button */}
                        <button
                            onClick={togglePlay}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause size={32} fill="white" />
                            ) : (
                                <Play size={32} fill="white" className="ml-1" />
                            )}
                        </button>

                        {/* Bottom Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 group/volume">
                                    <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                        {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="w-0 group-hover/volume:w-24 transition-all duration-300 accent-[var(--primary)] cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={togglePiP}
                                    className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isPiP ? 'text-[var(--primary)]' : ''}`}
                                    title="Picture in Picture"
                                >
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 4.5v5H3m-1.87 0h19.74c.6 0 1.13.43 1.13 1.3v9c0 .87-.53 1.3-1.13 1.3H1.13C.53 21.1 0 20.67 0 19.8v-9c0-.87.53-1.3 1.13-1.3z" />
                                        <path d="M13 11h7v6h-7z" />
                                    </svg>
                                </button>

                                <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
