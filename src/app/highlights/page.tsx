'use client';

import { useState, useEffect, useMemo } from 'react';
import HighlightCard from '@/components/HighlightCard';
import { GlassFilter } from '@/components/ChannelCard';
import { useSearch } from '@/context/SearchContext';

interface Highlight {
    id: string;
    title: string;
    thumbnail?: string;
    videoUrl: string;
    duration?: string;
}

export default function HighlightsPage() {
    const { searchQuery } = useSearch();
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

    const filteredHighlights = useMemo(() => {
        if (!searchQuery.trim()) return highlights;
        const query = searchQuery.toLowerCase();
        return highlights.filter(h =>
            h.title.toLowerCase().includes(query)
        );
    }, [searchQuery, highlights]);

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

    return (
        <div className="fade-in" style={{ padding: '0 4px' }}>
            {filteredHighlights.length === 0 ? (
                <div className="empty-state">
                    <p>لا توجد ملخصات تطابق بحثك</p>
                </div>
            ) : (
                <div className="videos-grid">
                    {filteredHighlights.map((highlight) => (
                        <HighlightCard key={highlight.id} highlight={highlight} />
                    ))}
                </div>
            )}
            <GlassFilter />
        </div>
    );
}
