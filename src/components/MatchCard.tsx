'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        <div className={`match-card fade-in ${isLive ? 'live' : ''}`}>
            {/* Premium Star - Flutter stars_rounded */}
            {isPremium && (
                <div className="premium-tag" style={{ top: '12px', right: '12px', background: 'transparent', boxShadow: 'none' }}>
                    <Star size={18} fill="#FFC107" color="#FFC107" />
                </div>
            )}

            {/* Teams & Status Section - exact padding */}
            <div className="match-teams" style={{ padding: '24px 16px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="match-team home" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                        className="match-team-logo"
                        src={match.homeLogo || '/no-image.png'}
                        alt={match.homeTeam}
                        width={45}
                        height={45}
                        unoptimized
                        style={{ width: '45px', height: '45px', marginBottom: '6px', objectFit: 'contain' }}
                    />
                    <span className="match-team-name" style={{ fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center' }}>{match.homeTeam}</span>
                </div>

                <div className="match-center-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="match-status-badge" style={{ background: statusBg, padding: '4px 10px', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
                        {statusText}
                    </div>
                </div>

                <div className="match-team away" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                        className="match-team-logo"
                        src={match.awayLogo || '/no-image.png'}
                        alt={match.awayTeam}
                        width={45}
                        height={45}
                        unoptimized
                        style={{ width: '45px', height: '45px', marginBottom: '6px', objectFit: 'contain' }}
                    />
                    <span className="match-team-name" style={{ fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center' }}>{match.awayTeam}</span>
                </div>
            </div>

            {/* Divider - exact width */}
            <div className="match-divider" style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px auto' }} />

            {/* Metadata Row - exact spacing for breathing room */}
            <div className="match-metadata" style={{ padding: '0 16px 45px 16px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <div className="match-metadata-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9e9e9e' }}>
                    <Tv size={14} />
                    <span>{channel || 'غير محدد'}</span>
                </div>

                {commentator && (
                    <div className="match-metadata-item" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9e9e9e' }}>
                        <Mic size={14} />
                        <span>{commentator}</span>
                    </div>
                )}
            </div>

            {/* Champion Badge - triangular clip */}
            {champion && (
                <div className={`match-champion-badge ${match.status}`}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: badgeBg,
                        color: 'white',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '4px 16px 6px 16px',
                        clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
                        whiteSpace: 'nowrap'
                    }}>
                    {champion}
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
