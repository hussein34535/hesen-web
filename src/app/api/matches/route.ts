// API Proxy for Matches - Transforms data to match component format
const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

interface ApiMatch {
    id: string;
    team_a: string;
    team_b: string;
    logo_a?: string;
    logo_b?: string;
    match_time: string;
    channel?: string;
    commentator?: string;
    champion?: string;
    is_premium?: boolean;
    stream_link?: { name: string; url: string; is_premium?: boolean }[];
    created_at?: string;
}

// Parse logo URL from JSON string or direct URL
function parseLogoUrl(logo: string | undefined): string {
    if (!logo) return '';
    try {
        const parsed = JSON.parse(logo);
        return parsed.url || '';
    } catch {
        return logo;
    }
}

// Determine match status based on time
function getMatchStatus(matchTime: string): string {
    const now = new Date();
    const [hours, minutes] = matchTime.split(':').map(Number);

    const matchDate = new Date();
    matchDate.setHours(hours, minutes, 0, 0);

    const matchEndEstimate = new Date(matchDate.getTime() + 110 * 60 * 1000);

    if (now >= matchDate && now <= matchEndEstimate) {
        return 'live';
    } else if (now < matchDate) {
        return 'upcoming';
    } else {
        return 'finished';
    }
}

export async function GET() {
    try {
        const res = await fetch(`${BASE_URL}/matches`, {
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return Response.json({ success: false, error: 'Failed to fetch' }, { status: res.status });
        }

        const data = await res.json();

        if (!data.success || !Array.isArray(data.data)) {
            return Response.json({ success: false, error: 'Invalid data format' }, { status: 500 });
        }

        const matches = (data.data as ApiMatch[]).map((match) => ({
            id: match.id,
            homeTeam: match.team_a,
            awayTeam: match.team_b,
            homeLogo: parseLogoUrl(match.logo_a),
            awayLogo: parseLogoUrl(match.logo_b),
            matchTime: match.match_time,
            status: getMatchStatus(match.match_time),
            channel: match.channel || '',
            commentator: match.commentator || '',
            league: match.champion || '',
            is_premium: match.is_premium,
            streamLinks: match.stream_link || []
        }));

        return Response.json({ success: true, data: matches });
    } catch (error) {
        console.error('Matches API error:', error);
        return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
