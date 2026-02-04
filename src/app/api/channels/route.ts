// API Proxy for Channels - Groups channels by category
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

interface StreamLink {
    name: string;
    url: string;
    is_premium?: boolean;
}

interface ApiChannel {
    id: string;
    name: string;
    categories?: { id: string | number; name: string; is_premium?: boolean }[];
    stream_link?: StreamLink[];
    logo?: string;
    image?: string;
    created_at?: string;
}

interface Category {
    id: string;
    name: string;
    image?: string;
    is_premium?: boolean;
    channels: {
        id: string;
        name: string;
        logo: string;
        streamUrl: string;
        is_premium?: boolean;
    }[];
}

export async function GET() {
    try {
        const res = await fetch(`${BASE_URL}/channels`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return Response.json({ success: false, error: 'Failed to fetch' }, { status: res.status });
        }

        const data = await res.json();

        if (!data.success || !Array.isArray(data.data)) {
            return Response.json({ success: false, error: 'Invalid data format' }, { status: 500 });
        }

        // Group channels by category
        const categoryMap = new Map<string, Category>();

        for (const channel of data.data as ApiChannel[]) {
            // Get first stream URL
            const streamUrl = channel.stream_link?.[0]?.url || '';
            const isPremium = channel.stream_link?.some(l => l.is_premium);

            // If channel has categories, add to each one
            if (channel.categories && channel.categories.length > 0) {
                for (const cat of channel.categories) {
                    const catId = String(cat.id);

                    if (!categoryMap.has(catId)) {
                        categoryMap.set(catId, {
                            id: catId,
                            name: cat.name,
                            is_premium: cat.is_premium,
                            channels: []
                        });
                    }

                    categoryMap.get(catId)!.channels.push({
                        id: channel.id,
                        name: channel.name,
                        logo: channel.logo || channel.image || '',
                        streamUrl: streamUrl,
                        is_premium: isPremium
                    });
                }
            } else {
                // Channels without category go to "عام"
                const generalId = 'general';
                if (!categoryMap.has(generalId)) {
                    categoryMap.set(generalId, {
                        id: generalId,
                        name: 'عام',
                        channels: []
                    });
                }
                categoryMap.get(generalId)!.channels.push({
                    id: channel.id,
                    name: channel.name,
                    logo: channel.logo || channel.image || '',
                    streamUrl: streamUrl,
                    is_premium: isPremium
                });
            }
        }

        // Convert map to array and sort by category name
        const categories = Array.from(categoryMap.values()).sort((a, b) => {
            // Put BEIN categories first
            if (a.name.includes('BEIN') && !b.name.includes('BEIN')) return -1;
            if (!a.name.includes('BEIN') && b.name.includes('BEIN')) return 1;
            return a.name.localeCompare(b.name, 'ar');
        });

        return Response.json({ success: true, data: categories });
    } catch (error) {
        console.error('Channels API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
