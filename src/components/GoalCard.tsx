'use client';

import Link from 'next/link';
import { Play } from 'lucide-react';

interface Goal {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    videoUrl: string;
    createdAt?: string;
}

interface GoalCardProps {
    goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
    return (
        <Link
            href={`/player?url=${encodeURIComponent(goal.videoUrl)}&name=${encodeURIComponent(goal.title)}`}
            className="video-card"
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

                {/* Play Overlay */}
                <div className="video-play-overlay">
                    <div className="play-button">
                        <Play size={28} fill="white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="video-info">
                <h3 className="video-title">{goal.title}</h3>
                {goal.createdAt && (
                    <p style={{ fontSize: '11px', color: 'var(--primary)', marginTop: '8px' }}>
                        {goal.createdAt}
                    </p>
                )}
            </div>
        </Link>
    );
}
