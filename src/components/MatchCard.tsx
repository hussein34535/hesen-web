'use client';

import Link from 'next/link';
import { Tv, Mic, Star } from 'lucide-react';

interface StreamLink {
    name: string;
    url: string;
    is_premium?: boolean;
}

interface Match {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeLogo?: string;
    awayLogo?: string;
    homeScore?: number;
    awayScore?: number;
    status: string;
    matchTime: string;
    league?: string;
    channel?: string;
    commentator?: string;
    streamLinks?: StreamLink[];
    is_premium?: boolean;
}

interface MatchCardProps {
    match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
    const isLive = match.status === 'live';
    const isUpcoming = match.status === 'upcoming';
    const isFinished = match.status === 'finished';

    const firstStreamUrl = match.streamLinks?.[0]?.url;
    const isPremium = match.is_premium || match.streamLinks?.some(l => l.is_premium);
    const channel = match.channel || '';
    const commentator = match.commentator || '';
    const champion = match.league || '';

    // Status colors - solid fill like Flutter
    let statusBg = 'rgba(80, 80, 80, 1)'; // finished
    let badgeBg = 'rgba(80, 80, 80, 1)';
    let statusText = 'انتهت';

    if (isLive) {
        statusBg = '#F44336';
        badgeBg = 'rgba(244, 67, 54, 0.7)';
        statusText = 'مباشر';
    } else if (isUpcoming) {
        statusBg = '#2196F3';
        badgeBg = 'rgba(33, 150, 243, 0.7)';
        statusText = match.matchTime;
    }

    const card = (
        <div
            style={{
                position: 'relative',
                background: 'linear-gradient(to bottom right, #141414, #000000)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
                margin: '8px',
                transition: 'all 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.borderColor = '#673ab7';
                e.currentTarget.style.borderWidth = '2px';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(103, 58, 183, 0.4)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderWidth = '1px';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
            }}
        >
            {/* Premium Star */}
            {isPremium && (
                <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 10,
                }}>
                    <Star size={18} fill="#FFC107" color="#FFC107" />
                </div>
            )}

            {/* Teams & Score Section */}
            <div style={{
                padding: '24px 16px 0 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                {/* Team A */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <img
                        src={match.homeLogo || '/no-image.png'}
                        alt={match.homeTeam}
                        style={{
                            width: 45,
                            height: 45,
                            objectFit: 'contain',
                            borderRadius: 8,
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/no-image.png';
                        }}
                    />
                    <span style={{
                        marginTop: 6,
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'center',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>{match.homeTeam}</span>
                </div>

                {/* Time/Status Badge - Solid Fill */}
                <div style={{
                    padding: '4px 10px',
                    background: statusBg,
                    borderRadius: 8,
                }}>
                    <span style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: 'white',
                    }}>{statusText}</span>
                </div>

                {/* Team B */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <img
                        src={match.awayLogo || '/no-image.png'}
                        alt={match.awayTeam}
                        style={{
                            width: 45,
                            height: 45,
                            objectFit: 'contain',
                            borderRadius: 8,
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/no-image.png';
                        }}
                    />
                    <span style={{
                        marginTop: 6,
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'center',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>{match.awayTeam}</span>
                </div>
            </div>

            {/* Divider - 120px centered */}
            <div style={{
                width: 120,
                height: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '8px auto',
            }} />

            {/* Metadata Row - Channel & Commentator */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: commentator ? 48 : 0,
                padding: '0 16px 45px 16px',
            }}>
                {/* Channel */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                }}>
                    <Tv size={14} style={{ color: 'rgba(128, 128, 128, 1)' }} />
                    <span style={{
                        color: 'rgba(160, 160, 160, 1)',
                        fontSize: 11,
                    }}>{channel || 'غير محدد'}</span>
                </div>

                {/* Commentator */}
                {commentator && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                    }}>
                        <Mic size={14} style={{ color: 'rgba(128, 128, 128, 1)' }} />
                        <span style={{
                            color: 'rgba(160, 160, 160, 1)',
                            fontSize: 11,
                        }}>{commentator}</span>
                    </div>
                )}
            </div>

            {/* Champion Triangle Badge at Bottom */}
            {champion && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px 6px',
                    background: badgeBg,
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
                }}>
                    <span style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: 'white',
                    }}>{champion}</span>
                </div>
            )}
        </div>
    );

    if (firstStreamUrl) {
        return (
            <Link
                href={`/player?url=${encodeURIComponent(firstStreamUrl)}&name=${encodeURIComponent(`${match.homeTeam} vs ${match.awayTeam}`)}`}
                style={{ textDecoration: 'none' }}
            >
                {card}
            </Link>
        );
    }

    return card;
}
