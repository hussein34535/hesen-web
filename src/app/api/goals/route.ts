// API Proxy for Goals
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

interface ImageObject {
    url?: string;
    [key: string]: unknown;
}

interface SourceLink {
    name: string;
    url: string;
}

interface ApiGoal {
    id: string;
    title: string;
    image?: ImageObject | ImageObject[] | string | null;
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
        const res = await fetch(`${BASE_URL}/goals`, {
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

        const transformedGoals = data.data.map((goal: ApiGoal) => ({
            id: goal.id,
            title: goal.title,
            thumbnail: extractImageUrl(goal.image),
            videoUrl: goal.url || goal.sources?.[0]?.url || '',
            sources: goal.sources || [],
            is_premium: goal.is_premium,
            createdAt: goal.created_at
        }));

        return Response.json({ success: true, data: transformedGoals });
    } catch (error) {
        console.error('Goals API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
