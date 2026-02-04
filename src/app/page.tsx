'use client';

import { useState, useEffect } from 'react';
import CategoryCard from '@/components/ChannelCard';

interface Channel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  is_premium?: boolean;
}

interface Category {
  id: string;
  name: string;
  image?: string;
  channels: Channel[];
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadChannels() {
      try {
        const res = await fetch('/api/channels');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        if (data.success) {
          setCategories(data.data || []);
        } else {
          throw new Error('API error');
        }
      } catch (e) {
        setError('فشل تحميل القنوات');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadChannels();
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
        <button
          onClick={() => window.location.reload()}
          className="retry-btn"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="empty-state fade-in">
        <p>لا توجد قنوات متاحة</p>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ padding: '0 16px' }}>
      <div className="channels-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
