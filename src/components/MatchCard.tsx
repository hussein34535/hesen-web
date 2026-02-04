'use client';

import Link from 'next/link';
import { Radio, Clock, CheckCircle } from 'lucide-react';

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
    streamLinks?: StreamLink[];
}

interface MatchCardProps {
    match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
    const isLive = match.status === 'live';
    const isUpcoming = match.status === 'upcoming';
    const isFinished = match.status === 'finished';

    const firstStreamUrl = match.streamLinks?.[0]?.url;

    const card = (
        <div className={`match-card ${isLive ? 'live' : ''}`}>
            {/* Header */}
            <div className="match-header">
                <span className="match-league">{match.league || 'مباراة'}</span>
                <div className={`match-status ${match.status}`}>
                    {isLive && <Radio size={12} style={{ animation: 'pulse 1s infinite' }} />}
                    {isUpcoming && <Clock size={12} />}
                    {isFinished && <CheckCircle size={12} />}
                    <span>{isLive ? 'مباشر' : isUpcoming ? 'قادمة' : 'انتهت'}</span>
                </div>
            </div>

            {/* Teams */}
            <div className="match-teams">
                {/* Home Team */}
                <div className="match-team">
                    <img
                        src={match.homeLogo || '/no-image.png'}
                        alt={match.homeTeam}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/no-image.png';
                        }}
                    />
                    <span className="match-team-name">{match.homeTeam}</span>
                </div>

                {/* Score / Time */}
                <div className="match-score">
                    {isUpcoming ? (
                        <span style={{ fontSize: '18px', color: 'var(--primary)' }}>{match.matchTime}</span>
                    ) : (
                        <>
                            <span>{match.homeScore ?? '-'}</span>
                            <span className="separator">:</span>
                            <span>{match.awayScore ?? '-'}</span>
                        </>
                    )}
                </div>

                {/* Away Team */}
                <div className="match-team">
                    <img
                        src={match.awayLogo || '/no-image.png'}
                        alt={match.awayTeam}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/no-image.png';
                        }}
                    />
                    <span className="match-team-name">{match.awayTeam}</span>
                </div>
            </div>

            {/* Watch Button */}
            {firstStreamUrl && (
                <div className="match-watch-btn">
                    شاهد الآن
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
