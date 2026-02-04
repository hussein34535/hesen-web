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
    useEffect(() => {
        const isUserSubscribed = true; // Placeholder for Firebase Auth
        if (isPremium && !isUserSubscribed) {
            router.push('/premium');
            return;
        }
    }, [isPremium, router]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        if (!url || !videoRef.current) return;

        const video = videoRef.current;

        // Check if URL is HLS
        if (url.includes('.m3u8')) {
            if (Hls.isSupported()) {
                // Use HLS.js for non-Safari browsers
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
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
                        setError('فشل تحميل البث');
                        setIsLoading(false);
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

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
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
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
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
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                            <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full">
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>

                            <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-full">
                                {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
