'use client';

import Link from 'next/link';
import { Play } from 'lucide-react';

interface NewsArticle {
    id: string;
    title: string;
    description?: string;
    image?: string;
    videoUrl?: string;
    createdAt?: string;
}

interface NewsCardProps {
    article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
    const hasVideo = article.videoUrl && article.videoUrl.length > 0;

    const content = (
        <div
            className="news-card"
            style={{
                borderRadius: '25px',
                transition: 'all 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(103, 58, 183, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Image */}
            <div style={{ position: 'relative' }}>
                <img
                    src={article.image || '/no-image.png'}
                    alt={article.title}
                    className="news-image"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/no-image.png';
                    }}
                />
                {hasVideo && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '12px'
                    }}>
                        <Play size={24} fill="white" color="white" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                {article.description && (
                    <p className="news-description">{article.description}</p>
                )}
                {article.createdAt && (
                    <span className="news-date">{article.createdAt}</span>
                )}
            </div>
        </div>
    );

    if (hasVideo) {
        return (
            <Link
                href={`/player?url=${encodeURIComponent(article.videoUrl!)}&name=${encodeURIComponent(article.title)}`}
                style={{ textDecoration: 'none' }}
            >
                {content}
            </Link>
        );
    }

    return content;
}
