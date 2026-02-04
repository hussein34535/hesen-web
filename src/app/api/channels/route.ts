// API Proxy for Channels
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

export async function GET() {
    try {
        const res = await fetch(`${BASE_URL}/channels`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) {
            return Response.json({ success: false, error: 'Failed to fetch' }, { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error('Channels API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
