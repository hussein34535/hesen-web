'use client';

import Link from 'next/link';
import {
    Menu as MenuIcon, User, Search, Bell, Diamond,
    Palette, Send, ShieldCheck, Moon, Sun, Edit2, X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
    // Mock user state (Matches Flutter main.dart defaults)
    const [userName, setUserName] = useState("المستخدم");
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [daysRemaining, setDaysRemaining] = useState(25);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTelegramOpen, setIsTelegramOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const userProfileImage = null;

    // Simulate Flutter's showTelegramDialog logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTelegramOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const menuItems = [
        { icon: <User size={22} />, label: "حسابي", href: "/profile" },
        { icon: isDarkMode ? <Moon size={22} /> : <Sun size={22} />, label: "وضع التشغيل", action: () => setIsDarkMode(!isDarkMode) },
        { icon: <Bell size={22} />, label: "التنبيهات", href: "/notifications" },
        { icon: <Diamond size={22} color="#FFD700" />, label: "الاشتراك المميز", href: "/premium", premium: true },
        { icon: <Palette size={22} />, label: "تخصيص الألوان", href: "/theme" },
        { icon: <Send size={22} />, label: "Telegram", action: () => window.open('https://t.me/tv_7esen', '_blank') },
        { icon: <Search size={22} />, label: "البحث", action: () => setIsSearchActive(true) },
        { icon: <ShieldCheck size={22} />, label: "سياسة الخصوصية", href: "/privacy" },
    ];

    return (
        <>
            <header className="header" style={{
                background: 'transparent',
                boxShadow: 'none',
                height: '70px',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="header-btn menu-btn" onClick={() => setIsMenuOpen(true)}>
                        <MenuIcon size={28} />
                    </button>
                    <div className="user-greeting" dir="rtl" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="greeting-text" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>أهلاً بك </span>
                        <span className="username-gradient" style={{ fontSize: '20px' }}>{userName}</span>
                    </div>
                </div>

                <div className="header-right">
                    <div className="header-actions">
                        <Link href="/profile" className="profile-hero">
                            <div className={`avatar-container ${isSubscribed ? 'premium-ring' : ''}`}>
                                <div className="avatar-main">
                                    {userProfileImage ? (
                                        <img src={userProfileImage} alt={userName} className={`avatar-img ${isSubscribed ? 'premium-border' : ''}`} />
                                    ) : (
                                        <span className="avatar-initial">{userName[0].toUpperCase()}</span>
                                    )}
                                </div>
                                {isSubscribed && <div className="days-badge">{daysRemaining} يوم</div>}
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Flutter-style Search Bar (Body level) */}
            {isSearchActive && (
                <div className="search-bar-container" style={{ padding: '8px 16px' }}>
                    <div style={{
                        height: '48px',
                        background: '#1C1C1C',
                        borderRadius: '24px',
                        border: '1px solid rgba(184, 28, 176, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px'
                    }}>
                        <Search size={22} color="#B81CB0" />
                        <input
                            type="text"
                            placeholder="بحث عن قناة..."
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                padding: '0 12px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <button onClick={() => { setIsSearchActive(false); setSearchQuery(""); }} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={22} />
                        </button>
                    </div>
                </div>
            )}

            {/* Flutter-style ModalBottomSheet Menu */}
            {isMenuOpen && (
                <div className="modal-overlay" onClick={() => setIsMenuOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="menu-header" style={{ padding: '0 24px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <User size={28} color="#B81CB0" />
                                    <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>{userName}</span>
                                </div>
                                <button className="header-btn" onClick={() => setIsMenuOpen(false)} style={{ background: 'transparent' }}>
                                    <Edit2 size={20} color="rgba(255,255,255,0.5)" />
                                </button>
                            </div>
                            <div className="menu-divider" />
                        </div>

                        {menuItems.map((item, index) => (
                            <div key={index}>
                                {item.href ? (
                                    <Link href={item.href} className="menu-item" onClick={() => setIsMenuOpen(false)}>
                                        <span className="menu-item-text">{item.label}</span>
                                        {item.icon}
                                    </Link>
                                ) : (
                                    <button className="menu-item" onClick={() => { item.action?.(); setIsMenuOpen(false); }}>
                                        <span className="menu-item-text" style={item.premium ? { color: '#FFD700' } : {}}>{item.label}</span>
                                        {item.icon}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Telegram Dialog */}
            {isTelegramOpen && (
                <div className="modal-overlay" style={{ alignItems: 'center' }}>
                    <div className="dialog-container">
                        <div className="dialog-title" dir="rtl">
                            كيف حالك يا <b>{userName || 'صديقي'}</b>؟
                        </div>
                        <div className="dialog-subtitle" dir="rtl">
                            أتمنى أن تكون بخير وفي أفضل حال ❤️<br />
                            صل على النبي
                        </div>
                        <div className="dialog-actions">
                            <button className="dialog-btn dialog-btn-close" onClick={() => setIsTelegramOpen(false)}>إغلاق</button>
                            <button className="dialog-btn dialog-btn-action" onClick={() => window.open('https://t.me/tv_7esen', '_blank')}>
                                <Send size={18} />
                                انضم للتيليجرام
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
