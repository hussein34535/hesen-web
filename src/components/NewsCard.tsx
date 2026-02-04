'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock } from 'lucide-react';

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
        <div className="news-card fade-in">
            {/* Image / Thumbnail */}
            <div className="news-thumbnail-container">
                <Image
                    src={article.image || '/no-image.png'}
                    alt={article.title}
                    className="news-image"
                    width={400}
                    height={200}
                    style={{ objectFit: 'cover' }}
                />
                {hasVideo && (
                    <div className="video-play-overlay">
                        <div className="play-button" style={{ width: '40px', height: '40px' }}>
                            <Play size={20} fill="currentColor" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <div className="news-divider" />
                {article.createdAt && (
                    <div className="news-date">
                        <Clock size={14} />
                        <span>{article.createdAt}</span>
                    </div>
                )}
            </div>
        </div>
    );

    if (hasVideo) {
        return (
            <Link
                href={`/player?url=${encodeURIComponent(article.videoUrl!)}&name=${encodeURIComponent(article.title)}`}
                style={{ textDecoration: 'none' }}
                className="news-card-link"
            >
                {content}
            </Link>
        );
    }

    return content;
}

