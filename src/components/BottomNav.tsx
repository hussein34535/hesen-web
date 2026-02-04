'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tv, Newspaper, Target, Trophy, Film } from 'lucide-react';

const navItems = [
    { href: '/', icon: Tv, label: 'القنوات' },
    { href: '/news', icon: Newspaper, label: 'الأخبار' },
    { href: '/goals', icon: Target, label: 'الأهداف' },
    { href: '/matches', icon: Trophy, label: 'المباريات' },
    { href: '/highlights', icon: Film, label: 'الملخصات' },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
