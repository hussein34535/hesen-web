'use client';

import { Bell, Search, User } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <Link href="/" className="header-title">
                <img
                    src="/icons/icon-192.png"
                    alt="7eSen TV"
                    className="header-logo"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
                <span>7eSen TV</span>
            </Link>

            <div className="header-actions">
                <button className="header-btn" aria-label="Search">
                    <Search size={20} />
                </button>
                <button className="header-btn" aria-label="Notifications">
                    <Bell size={20} />
                </button>
                <Link href="/profile" className="header-btn" aria-label="Profile">
                    <User size={20} />
                </Link>
            </div>
        </header>
    );
}
