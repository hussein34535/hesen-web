// API Proxy for News
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

interface ImageObject {
    url?: string;
    [key: string]: unknown;
}

interface ApiNews {
    id: string;
    title: string;
    description?: string;
    image?: ImageObject | ImageObject[] | string | null;
    videoUrl?: string;
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
        const res = await fetch(`${BASE_URL}/news`, {
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

        // Transform news to extract image URLs properly
        const transformedNews = data.data.map((article: ApiNews) => ({
            id: article.id,
            title: article.title,
            description: article.description || '',
            image: extractImageUrl(article.image),
            videoUrl: article.videoUrl || '',
            createdAt: article.created_at
        }));

        return Response.json({ success: true, data: transformedNews });
    } catch (error) {
        console.error('News API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
