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
            className="goal-card"
            style={{
                display: 'block',
                textDecoration: 'none',
                background: 'var(--bg-card)',
                borderRadius: '25px',
                overflow: 'hidden',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(103, 58, 183, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            }}
        >
            {/* Thumbnail */}
            <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                background: '#000',
            }}>
                <img
                    src={goal.thumbnail || '/no-image.png'}
                    alt={goal.title}
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/no-image.png';
                    }}
                />

                {/* Play Button Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        width: 64,
                        height: 64,
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '50%',
                        border: '2px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Play size={36} fill="white" color="white" />
                    </div>
                </div>

                {/* Premium Badge */}
                {isPremium && (
                    <div style={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        padding: '5px 10px',
                        background: '#FFC107',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.26)',
                    }}>
                        <Diamond size={14} color="white" />
                        <span style={{
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 12,
                        }}>مميز</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: 12 }}>
                <h3 style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>{goal.title}</h3>

                {goal.createdAt && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        marginTop: 8,
                    }}>
                        <Clock size={14} style={{ color: 'rgba(160, 160, 160, 1)' }} />
                        <span style={{
                            fontSize: 12,
                            color: 'rgba(128, 128, 128, 1)',
                            fontWeight: 500,
                        }}>{goal.createdAt}</span>
                    </div>
                )}
            </div>
        </Link>
    );
}
