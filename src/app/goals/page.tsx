'use client';

import { useState, useEffect } from 'react';
import GoalCard from '@/components/GoalCard';

interface Goal {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    videoUrl: string;
    createdAt?: string;
}

export default function GoalsPage() {
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

    if (goals.length === 0) {
        return (
            <div className="empty-state fade-in">
                <p>لا توجد أهداف متاحة</p>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ padding: '0 16px' }}>
            <h1 className="page-title">أهداف اليوم</h1>
            <div className="videos-grid">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
}
