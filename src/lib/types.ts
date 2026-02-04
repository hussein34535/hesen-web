// TypeScript types for Hesen TV

export interface Channel {
    id: string;
    name: string;
    logo: string;
    streamUrl: string;
    is_premium?: boolean;
}

export interface ChannelCategory {
    id: string;
    name: string;
    image?: string;
    channels: Channel[];
}

export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    videoUrl?: string;
    date: string;
}

export interface Goal {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    date: string;
}

export interface Match {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeLogo: string;
    awayLogo: string;
    homeScore?: number;
    awayScore?: number;
    status: 'live' | 'upcoming' | 'finished';
    matchTime: string;
    league: string;
    streamLinks?: StreamLink[];
}

export interface StreamLink {
    name: string;
    url: string;
    is_premium?: boolean;
}

export interface Highlight {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
}

export interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    isSubscribed?: boolean;
    subscriptionExpiry?: string;
}
