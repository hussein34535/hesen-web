// API Service for Hesen TV

const BASE_URL = 'https://7esentvbackend.vercel.app/api/mobile';

export async function fetchChannels() {
    const res = await fetch(`${BASE_URL}/channels`);
    if (!res.ok) throw new Error('Failed to fetch channels');
    const data = await res.json();
    if (data.success) {
        return data.data || [];
    }
    throw new Error('API returned success=false');
}

export async function fetchNews() {
    const res = await fetch(`${BASE_URL}/news`);
    if (!res.ok) throw new Error('Failed to fetch news');
    const data = await res.json();
    if (data.success) {
        return data.data || [];
    }
    throw new Error('API returned success=false');
}

export async function fetchGoals() {
    const res = await fetch(`${BASE_URL}/goals`);
    if (!res.ok) throw new Error('Failed to fetch goals');
    const data = await res.json();
    if (data.success) {
        return data.data || [];
    }
    throw new Error('API returned success=false');
}

export async function fetchMatches() {
    const res = await fetch(`${BASE_URL}/matches`);
    if (!res.ok) throw new Error('Failed to fetch matches');
    const data = await res.json();
    if (data.success) {
        return data.data || [];
    }
    throw new Error('API returned success=false');
}

export async function fetchHighlights() {
    const res = await fetch(`${BASE_URL}/highlights`);
    if (!res.ok) throw new Error('Failed to fetch highlights');
    const data = await res.json();
    if (data.success) {
        return data.data || [];
    }
    throw new Error('API returned success=false');
}

export async function fetchCategories() {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    if (data.success) {
        return data.data || [];
    }
    throw new Error('API returned success=false');
}
