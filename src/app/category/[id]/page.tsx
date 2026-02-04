'use client';

import { useState, useEffect, use } from 'react';
import { ChannelCard, type Channel, type Category } from '@/components/ChannelCard';
import Skeleton from '@/components/Skeleton';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategory() {
            try {
                const res = await fetch(`/api/channels?id=${resolvedParams.id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                // If API doesn't support direct ID fetch, filter from all
                if (data.success) {
                    const allData: Category[] = data.data || [];
                    const found = allData.find(c => c.id.toString() === resolvedParams.id);
                    if (found) {
                        setCategory(found);
                    } else {
                        setError('الفئة غير موجودة');
                    }
                }
            } catch (e) {
                setError('فشل تحميل القنوات');
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadCategory();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="page-fade-in">
                <div style={{ height: '120px', background: '#673AB7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton width="150px" height="30px" />
                </div>
                <div className="channels-grid">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} height="95px" borderRadius="22px" />
                    ))}
                </div>
            </div>
        );
    }

    if (error || !category) {
        return (
            <div className="error-container">
                <p>{error || 'حدث خطأ ما'}</p>
                <Link href="/" className="retry-btn">العودة للرئيسية</Link>
            </div>
        );
    }

    return (
        <div className="page-fade-in category-screen">
            {/* Header - Flutter Match (Line 461) */}
            <div className="category-header">
                <Link href="/" className="back-btn">
                    <ChevronRight size={28} color="white" />
                </Link>
                <div className="header-bg" />
                {category.image && (
                    <div className="header-icon-center">
                        <img src={category.image} alt="" />
                    </div>
                )}
                <h1 className="category-title">{category.name}</h1>
            </div>

            {/* Channels Grid - Flutter Match (Line 546) */}
            <div className="channels-grid">
                {category.channels?.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))}
            </div>

            <div style={{ height: '100px' }} />
        </div>
    );
}
