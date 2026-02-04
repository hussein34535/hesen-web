'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import Skeleton from '@/components/Skeleton';

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
            <div className="page-fade-in" style={{ padding: '0 16px' }}>
                <Skeleton width="150px" height="28px" style={{ marginBottom: '24px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} height="120px" borderRadius="20px" />
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

    if (news.length === 0) {
        return (
            <div className="empty-state page-fade-in">
                <p>لا توجد أخبار متاحة</p>
            </div>
        );
    }

    return (
        <div className="page-fade-in" style={{ padding: '0 4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                {news.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
