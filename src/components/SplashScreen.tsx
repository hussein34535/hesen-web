'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
    const [hidden, setHidden] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        // Simulate "Flutter-like" initialization delay
        const timer = setTimeout(() => {
            setHidden(true);
            setTimeout(() => setRemoved(true), 500); // Match CSS transition duration
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (removed) return null;

    return (
        <div id="splash" className={hidden ? 'hidden' : ''}>
            <div className="logo-container">
                <img src="/apple-touch-icon.png" alt="7esenTV Logo" onError={(e) => e.currentTarget.src = '/favicon.ico'} />
            </div>
            <div className="loader"></div>
        </div>
    );
}
