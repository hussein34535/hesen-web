'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tv, Newspaper, Trophy, CalendarCheck, Library } from 'lucide-react';

const navItems = [
    { href: '/', label: 'القنوات', Icon: Tv },
    { href: '/news', label: 'الأخبار', Icon: Newspaper },
    { href: '/goals', label: 'الأهداف', Icon: Trophy },
    { href: '/matches', label: 'المباريات', Icon: CalendarCheck },
    { href: '/highlights', label: 'الملخصات', Icon: Library },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="bottom-nav">
            {navItems.map(({ href, label, Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Icon size={24} />
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
