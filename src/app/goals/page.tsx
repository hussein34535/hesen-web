'use client';

import { useState, useEffect, useMemo } from 'react';
import GoalCard from '@/components/GoalCard';
import Skeleton from '@/components/Skeleton';
import { GlassFilter } from '@/components/ChannelCard';
import { useSearch } from '@/context/SearchContext';

interface Goal {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    videoUrl: string;
    createdAt?: string;
}

export default function GoalsPage() {
    const { searchQuery } = useSearch();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadGoals() {
            try {
                const res = await fetch('/api/goals');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (data.success) {
                    setGoals(data.data || []);
                } else {
                    throw new Error('API error');
                }
            } catch (e) {
                setError('فشل تحميل الأهداف');
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadGoals();
    }, []);

    const filteredGoals = useMemo(() => {
        if (!searchQuery.trim()) return goals;
        const query = searchQuery.toLowerCase();
        return goals.filter(g =>
            g.title.toLowerCase().includes(query)
        );
    }, [searchQuery, goals]);

    if (loading) {
        return (
            <div className="page-fade-in" style={{ padding: '0 16px' }}>
                <Skeleton width="130px" height="28px" style={{ marginBottom: '24px' }} />
                <div className="videos-grid">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} height="200px" borderRadius="20px" />
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
        <div className="page-fade-in" style={{ padding: '0 4px' }}>
            {filteredGoals.length === 0 ? (
                <div className="empty-state">
                    <p>لا توجد أهداف تطابق بحثك</p>
                </div>
            ) : (
                <div className="videos-grid">
                    {filteredGoals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </div>
            )}
            <GlassFilter />
        </div>
    );
}
