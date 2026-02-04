'use client';

import Link from 'next/link';
import { Tv, Film, Newspaper, Music, Baby, Trophy, Stars, Clapperboard, MonitorPlay, Play, ChevronLeft } from 'lucide-react';

export interface Channel {
    id: string;
    name: string;
    logo?: string;
    streamUrl?: string;
    is_premium?: boolean;
}

export interface Category {
    id: string;
    name: string;
    image?: any;
    channels: Channel[];
    is_premium?: boolean;
}

interface CategoryCardProps {
    category: Category;
}

// Get category style based on name - matching Flutter source (channels_widgets.dart)
function getCategoryInfo(name: string) {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('sport') || lowerName.includes('koora') || lowerName.includes('match') || lowerName.includes('رياضة')) {
        return { bgClass: 'green', Icon: Trophy };
    } else if (lowerName.includes('movie') || lowerName.includes('film') || lowerName.includes('cinema') || lowerName.includes('أفلام')) {
        return { bgClass: 'red', Icon: Film };
    } else if (lowerName.includes('news') || lowerName.includes('akhbar') || lowerName.includes('أخبار')) {
        return { bgClass: 'blue', Icon: Newspaper };
    } else if (lowerName.includes('serie') || lowerName.includes('show') || lowerName.includes('drama') || lowerName.includes('مسلسل')) {
        return { bgClass: 'purple', Icon: Clapperboard }; // video_collection_rounded
    } else if (lowerName.includes('kid') || lowerName.includes('toon') || lowerName.includes('carton') || lowerName.includes('أطفال')) {
        return { bgClass: 'orange', Icon: Baby };
    } else if (lowerName.includes('music') || lowerName.includes('song') || lowerName.includes('أغاني')) {
        return { bgClass: 'pink', Icon: Music };
    } else if (lowerName.includes('bein')) {
        return { bgClass: 'bein', Icon: MonitorPlay }; // live_tv_rounded
    }
    return { bgClass: 'default', Icon: Tv };
}

// Helper to get image URL from various formats
function getImageUrl(image: string | { url?: string } | undefined): string | null {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (typeof image === 'object' && image.url) return image.url;
    return null;
}

// Final Category Card - Source Synced (Lines 66-428)
export default function CategoryCard({ category }: CategoryCardProps) {
    const { bgClass, Icon } = getCategoryInfo(category.name);
    const imageUrl = getImageUrl(category.image);
    const isPremium = category.is_premium === true;
    const lowerName = category.name.toLowerCase();

    return (
        <Link href={`/category/${category.id}`} className="category-card fade-in">
            {/* Glossy Top Highlight (Line 774) */}
            <div className="glossy-highlight" />

            {/* Background Layers (Lines 228, 243) */}
            <div className="category-card-bg-glass" />
            <div className={`category-card-bg ${bgClass}`} />

            {/* Pattern Overlay - Circles (Line 268) */}
            {!imageUrl && !lowerName.includes('bein') && <div className="category-card-pattern" />}

            {/* Premium Badge (Line 375) */}
            {isPremium && (
                <div className="premium-tag">
                    <Stars size={12} fill="white" />
                    <span>PREMIUM</span>
                </div>
            )}

            {/* Content (Line 282) */}
            <div className="category-card-content">
                <div className="category-icon-container">
                    {imageUrl ? (
                        <img src={imageUrl} alt={category.name} loading="lazy" className="category-img" />
                    ) : lowerName.includes('bein') ? (
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png"
                            alt="beIN"
                            className="category-img"
                        />
                    ) : (
                        <div className="icon-circle">
                            <Icon size={28} className="base-icon" />
                        </div>
                    )}
                </div>
                <h3 className="category-name">{category.name}</h3>
            </div>
        </Link>
    );
}

// Single Channel Card for inside categories
interface ChannelCardProps {
    channel: Channel;
}

// Final Channel Tile - Source Synced (Lines 607-921)
export function ChannelCard({ channel }: ChannelCardProps) {
    const isPremium = channel.is_premium === true;

    return (
        <Link
            href={`/player?url=${encodeURIComponent(channel.streamUrl || '')}&name=${encodeURIComponent(channel.name || '')}`}
            className="channel-card-tile fade-in"
        >
            <div className="glossy-highlight" />
            <div className="channel-card-bg" />

            {/* Selected Accent Bar (Line 794) - inactive by default */}

            <div className="channel-card-content-row">
                <div className="channel-info-stack">
                    <span className="channel-tile-name">{channel.name}</span>
                    {isPremium && (
                        <div className="premium-badge-row">
                            <Stars size={10} fill="#FFC107" />
                            <span>PREMIUM</span>
                        </div>
                    )}
                </div>

                {/* Play Indicator (Line 888) */}
                <div className="play-indicator-circle">
                    <Play size={16} fill="white" />
                </div>
            </div>
        </Link>
    );
}
