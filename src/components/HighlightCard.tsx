'use client';

import Link from 'next/link';
import { Play, Clock } from 'lucide-react';

interface Highlight {
    id: string;
    title: string;
    thumbnail?: string;
    videoUrl: string;
    duration?: string;
}

interface HighlightCardProps {
    highlight: Highlight;
}

export default function HighlightCard({ highlight }: HighlightCardProps) {
    return (
        <Link
            href={`/player?url=${encodeURIComponent(highlight.videoUrl)}&name=${encodeURIComponent(highlight.title)}`}
            className="video-card"
        >
            {/* Thumbnail */}
            <div className="video-thumbnail">
                <img
                    src={highlight.thumbnail || '/no-image.png'}
                    alt={highlight.title}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/no-image.png';
                    }}
                />

                {/* Duration Badge */}
                {highlight.duration && (
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '4px',
                        fontSize: '11px'
                    }}>
                        <Clock size={12} />
                        <span>{highlight.duration}</span>
                    </div>
                )}

                {/* Play Overlay */}
                <div className="video-play-overlay">
                    <div className="play-button">
                        <Play size={28} fill="white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="video-info">
                <h3 className="video-title">{highlight.title}</h3>
            </div>
        </Link>
    );
}
