// API Proxy for Highlights
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

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
        return Response.json(data);
    } catch (error) {
        console.error('Highlights API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
