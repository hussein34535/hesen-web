'use client';

import { useState, useEffect } from 'react';
import HighlightCard from '@/components/HighlightCard';

interface Highlight {
    id: string;
    title: string;
    thumbnail?: string;
    videoUrl: string;
    duration?: string;
}

export default function HighlightsPage() {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadHighlights() {
            try {
                const res = await fetch('/api/highlights');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (data.success) {
                    setHighlights(data.data || []);
                } else {
                    throw new Error('API error');
                }
            } catch (e) {
                setError('فشل تحميل الملخصات');
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadHighlights();
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

    if (highlights.length === 0) {
        return (
            <div className="empty-state fade-in">
                <p>لا توجد ملخصات متاحة</p>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ padding: '0 4px' }}>
            <div className="videos-grid">
                {highlights.map((highlight) => (
                    <HighlightCard key={highlight.id} highlight={highlight} />
                ))}
            </div>
        </div>
    );
}
