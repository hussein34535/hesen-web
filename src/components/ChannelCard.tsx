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

// Get category color and icon based on name - matching Flutter exactly
function getCategoryStyle(name: string) {
    const lowerName = name.toLowerCase();

    if (lowerName.includes('sport') || lowerName.includes('koora') || lowerName.includes('match')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #00C853, rgba(46, 125, 50, 0.8), rgba(27, 94, 32, 0.6), #00C853)',
            baseColor: '#00C853',
            Icon: Trophy
        };
    } else if (lowerName.includes('movie') || lowerName.includes('film') || lowerName.includes('cinema')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #FF1744, rgba(198, 40, 40, 0.8), rgba(183, 28, 28, 0.6), #FF1744)',
            baseColor: '#FF1744',
            Icon: Film
        };
    } else if (lowerName.includes('news') || lowerName.includes('akhbar')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #2979FF, rgba(21, 101, 192, 0.8), rgba(13, 71, 161, 0.6), #2979FF)',
            baseColor: '#2979FF',
            Icon: Newspaper
        };
    } else if (lowerName.includes('serie') || lowerName.includes('show') || lowerName.includes('drama') || lowerName.includes('مسلسل')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #D500F9, rgba(123, 31, 162, 0.8), rgba(74, 20, 140, 0.6), #D500F9)',
            baseColor: '#D500F9',
            Icon: Film
        };
    } else if (lowerName.includes('kid') || lowerName.includes('toon') || lowerName.includes('carton') || lowerName.includes('أطفال')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #FF9100, rgba(239, 108, 0, 0.8), rgba(230, 81, 0, 0.6), #FF9100)',
            baseColor: '#FF9100',
            Icon: Baby
        };
    } else if (lowerName.includes('music') || lowerName.includes('song') || lowerName.includes('أغاني')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #F50057, rgba(194, 24, 91, 0.8), rgba(136, 14, 79, 0.6), #F50057)',
            baseColor: '#F50057',
            Icon: Music
        };
    } else if (lowerName.includes('bein')) {
        return {
            gradient: 'conic-gradient(from 225deg at 0% 0%, #9067C6, rgba(103, 58, 183, 0.8), rgba(36, 0, 70, 0.6), #9067C6)',
            baseColor: '#673AB7',
            Icon: Tv
        };
    }
    return {
        gradient: 'conic-gradient(from 225deg at 0% 0%, #7E57C2, rgba(103, 58, 183, 0.8), rgba(81, 45, 168, 0.6), #7E57C2)',
        baseColor: '#673AB7',
        Icon: Tv
    };
}

// Helper to get image URL from various formats
function getImageUrl(image: string | { url?: string } | undefined): string | null {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (typeof image === 'object' && image.url) return image.url;
    return null;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const { gradient, baseColor, Icon } = getCategoryStyle(category.name);
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
        <Link
            href={href}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                minHeight: '140px',
                borderRadius: '24px',
                overflow: 'hidden',
                textDecoration: 'none',
                border: '1.2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.15s ease-out',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.2), 0 10px 25px ${baseColor}4D`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            }}
        >
            {/* White overlay gradient (topLeft to bottomRight) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05))',
                zIndex: 0,
            }} />

            {/* SweepGradient background at 60% opacity */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: hasImage ? 'var(--bg-card)' : gradient,
                opacity: 0.6,
                zIndex: 1,
            }} />

            {/* Circle Decoration (only when no image) */}
            {!hasImage && (
                <div style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    zIndex: 2,
                }} />
            )}

            {/* Premium Badge */}
            {isPremium && (
                <div style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 8px',
                    background: '#FFC107',
                    borderRadius: 8,
                    zIndex: 10,
                }}>
                    <Crown size={12} color="white" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>مميز</span>
                </div>
            )}

            {/* Main Content */}
            <div style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                {/* Image or Icon */}
                {hasImage ? (
                    <img
                        src={imageUrl!}
                        alt={category.name}
                        style={{
                            width: 60,
                            height: 60,
                            objectFit: 'contain',
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div style={{
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                    }}>
                        <Icon size={28} color="white" />
                    </div>
                )}

                {/* Category Name */}
                <span style={{
                    marginTop: 12,
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}>{category.name}</span>
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
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                height: '120px',
                borderRadius: '24px',
                overflow: 'hidden',
                textDecoration: 'none',
                background: 'conic-gradient(from 225deg at 0% 0%, #7E57C2, rgba(103, 58, 183, 0.8), rgba(81, 45, 168, 0.6), #7E57C2)',
                border: '1.2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.15s ease-out',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2), 0 10px 25px rgba(103, 58, 183, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            }}
        >
            {/* White overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05))',
                zIndex: 0,
            }} />

            {channel.is_premium && (
                <div style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 8px',
                    background: '#FFC107',
                    borderRadius: 8,
                    zIndex: 10,
                }}>
                    <Crown size={12} color="white" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>مميز</span>
                </div>
            )}

            <div style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt={channel.name}
                        style={{
                            width: 40,
                            height: 40,
                            objectFit: 'contain',
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div style={{
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                    }}>
                        <Tv size={28} color="white" />
                    </div>
                )}
                <span style={{
                    marginTop: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}>{channel.name}</span>
            </div>
        </Link>
    );
}
