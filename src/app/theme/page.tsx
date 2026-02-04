'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Palette, RotateCcw } from 'lucide-react';

export default function ThemePage() {
    const [colors, setColors] = useState({
        primary: '#673AB7',
        scaffold: '#000000',
        card: '#1C1C1C',
        appBar: '#000000',
        secondary: '#B81CB0',
    });

    const themeItems = [
        { label: 'اللون الأساسي', key: 'primary', color: colors.primary },
        { label: 'لون خلفية التطبيق', key: 'scaffold', color: colors.scaffold },
        { label: 'لون البطاقات', key: 'card', color: colors.card },
        { label: 'لون شريط التطبيق', key: 'appBar', color: colors.appBar },
        { label: 'اللون الثانوي', key: 'secondary', color: colors.secondary },
    ];

    const resetColors = () => {
        setColors({
            primary: '#673AB7',
            scaffold: '#000000',
            card: '#1C1C1C',
            appBar: '#000000',
            secondary: '#B81CB0',
        });
    };

    return (
        <div className="app-container">
            <Header />
            <main className="page-content" style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>تخصيص الألوان</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {themeItems.map((item) => (
                        <div key={item.key} style={{
                            background: '#1C1C1C',
                            padding: '16px 20px',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{item.label}</span>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '22px',
                                background: item.color,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                border: '2px solid rgba(255,255,255,0.1)'
                            }} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={resetColors}
                    style={{
                        width: '100%',
                        marginTop: '32px',
                        background: '#673AB7',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 15px rgba(103, 58, 183, 0.3)'
                    }}
                >
                    <RotateCcw size={20} />
                    إعادة تعيين الألوان
                </button>
            </main>
            <BottomNav />
        </div>
    );
}
