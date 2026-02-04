'use client';

import { useState, useEffect } from 'react';
import CategoryCard from '@/components/ChannelCard';
import Skeleton from '@/components/Skeleton';
import { Search } from 'lucide-react';

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
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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
          setFilteredCategories(data.data || []);
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

  // Filter categories whenever search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = categories.filter(cat => {
      // Match category name
      if (cat.name.toLowerCase().includes(query)) return true;
      // Match any channel name within the category
      return cat.channels?.some(ch => ch.name.toLowerCase().includes(query));
    });
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  if (loading) {
    return (
      <div className="page-fade-in" style={{ padding: '0 16px' }}>
        <div style={{ padding: '16px 0' }}>
          <Skeleton width="100%" height="48px" borderRadius="12px" style={{ marginBottom: '24px' }} />
        </div>
        <div className="channels-grid">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="135px" borderRadius="24px" />
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
    <div className="page-fade-in" style={{ padding: '0 16px' }}>
      {/* Search Bar - Matching Flutter's _buildSearchBar */}
      <div className="search-container">
        <div className="search-bar">
          <Search className="search-icon" size={20} color="#B81CB0" />
          <input
            type="text"
            placeholder="بحث عن قناة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="empty-state">
          <p>لا توجد نتائج للبحث</p>
        </div>
      ) : (
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
