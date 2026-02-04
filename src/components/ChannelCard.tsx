'use client';

import Link from 'next/link';
import { Tv, Film, Newspaper, Music, Baby, Trophy, Crown } from 'lucide-react';

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
    image?: string | { url?: string };
    channels: Channel[];
    is_premium?: boolean;
}

interface CategoryCardProps {
    category: Category;
}

// Get category color and icon based on name
function getCategoryStyle(name: string) {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('sport') || lowerName.includes('koora') || lowerName.includes('match') || lowerName.includes('bein')) {
        return { colorClass: 'green', Icon: Trophy };
    } else if (lowerName.includes('movie') || lowerName.includes('film') || lowerName.includes('cinema')) {
        return { colorClass: 'red', Icon: Film };
    } else if (lowerName.includes('news') || lowerName.includes('akhbar')) {
        return { colorClass: 'blue', Icon: Newspaper };
    } else if (lowerName.includes('serie') || lowerName.includes('show') || lowerName.includes('drama') || lowerName.includes('مسلسل')) {
        return { colorClass: 'purple', Icon: Film };
    } else if (lowerName.includes('kid') || lowerName.includes('toon') || lowerName.includes('carton') || lowerName.includes('أطفال')) {
        return { colorClass: 'orange', Icon: Baby };
    } else if (lowerName.includes('music') || lowerName.includes('song') || lowerName.includes('أغاني')) {
        return { colorClass: 'pink', Icon: Music };
    }
    return { colorClass: 'purple', Icon: Tv };
}

// Helper to get image URL from various formats
function getImageUrl(image: string | { url?: string } | undefined): string | null {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (typeof image === 'object' && image.url) return image.url;
    return null;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const { colorClass, Icon } = getCategoryStyle(category.name);
    const imageUrl = getImageUrl(category.image);
    const hasImage = imageUrl && imageUrl.length > 0;
    const isPremium = category.is_premium === true;

    // Get first channel URL if available
    const firstChannel = category.channels?.[0];
    const channelUrl = firstChannel?.streamUrl;

    const href = channelUrl
        ? `/player?url=${encodeURIComponent(channelUrl)}&name=${encodeURIComponent(firstChannel?.name || category.name)}`
        : '#';

    return (
        <Link href={href} className="category-card">
            {/* Background */}
            <div className={`category-card-bg ${colorClass}`} />

            {/* Premium Badge */}
            {isPremium && (
                <div className="premium-badge">
                    <Crown size={12} />
                    <span>مميز</span>
                </div>
            )}

            {/* Content */}
            <div className="category-card-content">
                <div className="category-icon">
                    {hasImage ? (
                        <img
                            src={imageUrl!}
                            alt={category.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <Icon size={28} />
                    )}
                </div>
                <span className="category-name">{category.name}</span>
            </div>
        </Link>
    );
}

// Single Channel Card for inside categories
interface ChannelCardProps {
    channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
    const logoUrl = typeof channel.logo === 'string' ? channel.logo : '';

    return (
        <Link
            href={`/player?url=${encodeURIComponent(channel.streamUrl || '')}&name=${encodeURIComponent(channel.name || '')}`}
            className="category-card"
            style={{ height: '120px' }}
        >
            <div className="category-card-bg purple" />

            {channel.is_premium && (
                <div className="premium-badge">
                    <Crown size={12} />
                    <span>مميز</span>
                </div>
            )}

            <div className="category-card-content">
                <div className="category-icon">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt={channel.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <Tv size={28} />
                    )}
                </div>
                <span className="category-name">{channel.name}</span>
            </div>
        </Link>
    );
}
