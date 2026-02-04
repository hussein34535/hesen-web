'use client';

import Link from 'next/link';
import { Play, Clock, Diamond } from 'lucide-react';

interface Goal {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    videoUrl: string;
    createdAt?: string;
    is_premium?: boolean;
}

interface GoalCardProps {
    goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
    const isPremium = goal.is_premium;

    return (
        <Link
            href={`/player?url=${encodeURIComponent(goal.videoUrl)}&name=${encodeURIComponent(goal.title)}`}
            className="video-card fade-in"
        >
            {/* Thumbnail */}
            <div className="video-thumbnail">
                <img
                    src={goal.thumbnail || '/no-image.png'}
                    alt={goal.title}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/no-image.png';
                    }}
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
                        <Diamond size={14} fill="white" />
                        <span>مميز</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="video-info">
                <h3 className="video-title">{goal.title}</h3>
                <div className="video-divider" />
                {goal.createdAt && (
                    <div className="video-meta">
                        <Clock size={14} />
                        <span>{goal.createdAt}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
