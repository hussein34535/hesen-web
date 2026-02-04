'use client';

import { useState, useEffect } from 'react';
import MatchCard from '@/components/MatchCard';

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

export default function MatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadMatches() {
            try {
                const res = await fetch('/api/matches');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (data.success) {
                    const matchesData = data.data || [];

                    // Sort: live first, then upcoming, then finished
                    const sorted = matchesData.sort((a: Match, b: Match) => {
                        const order: Record<string, number> = { live: 0, upcoming: 1, finished: 2 };
                        return (order[a.status] || 2) - (order[b.status] || 2);
                    });

                    setMatches(sorted);
                } else {
                    throw new Error('API error');
                }
            } catch (e) {
                setError('فشل تحميل المباريات');
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadMatches();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container fade-in">
                <p className="error-text">{error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="empty-state fade-in">
                <p>لا توجد مباريات متاحة</p>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ padding: '0 16px' }}>
            <h1 className="page-title">المباريات</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}
