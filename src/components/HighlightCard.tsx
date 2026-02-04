'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, Stars } from 'lucide-react';

interface Highlight {
    id: string;
    title: string;
    thumbnail?: string;
    videoUrl: string;
    duration?: string;
    is_premium?: boolean;
}

interface HighlightCardProps {
    highlight: Highlight;
}

export default function HighlightCard({ highlight }: HighlightCardProps) {
    const isPremium = highlight.is_premium;

    return (
        <Link
            href={`/player?url=${encodeURIComponent(highlight.videoUrl)}&name=${encodeURIComponent(highlight.title)}`}
            className="video-card fade-in"
        >
            {/* Thumbnail */}
            <div className="video-thumbnail">
                <Image
                    src={highlight.thumbnail || '/no-image.png'}
                    alt={highlight.title}
                    width={400}
                    height={225}
                    unoptimized
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />

                {/* Play Button Overlay */}
                <div className="video-play-overlay">
                    <div className="play-button">
                        <Play size={32} fill="currentColor" />
                    </div>
                </div>

                {/* Premium Badge */}
                {isPremium && (
                    <div className="premium-badge-absolute">
                        <Stars size={14} fill="white" />
                        <span>مميز</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="video-info">
                <h3 className="video-title">{highlight.title}</h3>
                <div className="video-divider" />
                {highlight.duration && (
                    <div className="video-meta">
                        <Clock size={14} />
                        <span>{highlight.duration}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
