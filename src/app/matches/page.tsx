'use client';

import { useState, useEffect, useMemo } from 'react';
import MatchCard from '@/components/MatchCard';
import Skeleton from '@/components/Skeleton';
import { GlassFilter } from '@/components/ChannelCard';
import { useSearch } from '@/context/SearchContext';

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
    const { searchQuery } = useSearch();
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
                    setMatches(data.data || []);
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

    const filteredMatches = useMemo(() => {
        // Sort: live first, then upcoming, then finished
        const sortedMatches = [...matches].sort((a: Match, b: Match) => {
            const order: Record<string, number> = { live: 0, upcoming: 1, finished: 2 };
            return (order[a.status] || 2) - (order[b.status] || 2);
        });

        if (!searchQuery.trim()) return sortedMatches;
        const query = searchQuery.toLowerCase();
        return sortedMatches.filter(m =>
            m.homeTeam.toLowerCase().includes(query) ||
            m.awayTeam.toLowerCase().includes(query) ||
            (m.league && m.league.toLowerCase().includes(query))
        );
    }, [searchQuery, matches]);

    if (loading) {
        return (
            <div className="page-fade-in" style={{ padding: '0 8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} height="135px" borderRadius="28px" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container page-fade-in">
                <p className="error-text">{error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    return (
        <div className="page-fade-in" style={{ padding: '0 8px' }}>
            {filteredMatches.length === 0 ? (
                <div className="empty-state">
                    <p>لا توجد مباريات تطابق بحثك</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredMatches.map((match) => (
                        <MatchCard key={match.id} match={match} />
                    ))}
                </div>
            )}
            <GlassFilter />
        </div>
    );
}
