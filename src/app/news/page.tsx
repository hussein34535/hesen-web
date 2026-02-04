'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';

interface NewsArticle {
    id: string;
    title: string;
    description?: string;
    image?: string;
    videoUrl?: string;
    createdAt?: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadNews() {
            try {
                const res = await fetch('/api/news');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (data.success) {
                    setNews(data.data || []);
                } else {
                    throw new Error('API error');
                }
            } catch (e) {
                setError('فشل تحميل الأخبار');
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadNews();
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

    if (news.length === 0) {
        return (
            <div className="empty-state fade-in">
                <p>لا توجد أخبار متاحة</p>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ padding: '0 16px' }}>
            <h1 className="page-title">آخر الأخبار</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {news.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
