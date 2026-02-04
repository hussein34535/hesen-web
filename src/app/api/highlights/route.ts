// API Proxy for Highlights
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

interface ImageObject {
    url?: string;
    [key: string]: unknown;
}

interface SourceLink {
    name: string;
    url: string;
}

interface ApiHighlight {
    id: string;
    title: string;
    image?: ImageObject | ImageObject[] | string;
    url?: string;
    sources?: SourceLink[];
    is_premium?: boolean;
    created_at?: string;
}

// Helper to extract URL from various image formats
function extractImageUrl(imageData: unknown): string {
    if (!imageData) return '';

    if (Array.isArray(imageData) && imageData.length > 0) {
        const firstImage = imageData[0];
        if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
            return (firstImage as ImageObject).url || '';
        }
    }

    if (typeof imageData === 'object' && imageData !== null && 'url' in imageData) {
        return (imageData as ImageObject).url || '';
    }

    if (typeof imageData === 'string') {
        return imageData;
    }

    return '';
}

export async function GET() {
    try {
        const res = await fetch(`${BASE_URL}/highlights`, {
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return Response.json({ success: false, error: 'Failed to fetch' }, { status: res.status });
        }

        const data = await res.json();

        if (!data.success || !Array.isArray(data.data)) {
            return Response.json(data);
        }

        const transformedHighlights = data.data.map((highlight: ApiHighlight) => ({
            id: highlight.id,
            title: highlight.title,
            thumbnail: extractImageUrl(highlight.image),
            videoUrl: highlight.url || highlight.sources?.[0]?.url || '',
            sources: highlight.sources || [],
            is_premium: highlight.is_premium,
            createdAt: highlight.created_at
        }));

        return Response.json({ success: true, data: transformedHighlights });
    } catch (error) {
        console.error('Highlights API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
