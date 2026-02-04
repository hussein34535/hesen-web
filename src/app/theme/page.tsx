'use client';

import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, RotateCcw } from 'lucide-react';

export default function ThemePage() {
    const { colors, setColor, resetColors } = useTheme();

    const themeItems = [
        { label: 'اللون الأساسي', key: 'primary', color: colors.primary },
        { label: 'لون خلفية التطبيق', key: 'scaffold', color: colors.scaffold },
        { label: 'لون البطاقات', key: 'card', color: colors.card },
        { label: 'لون شريط التطبيق', key: 'appBar', color: colors.appBar },
        { label: 'اللون الثانوي', key: 'secondary', color: colors.secondary },
    ];

    return (
        <div className="page-fade-in">
            <main className="page-content" style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>تخصيص الألوان</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {themeItems.map((item) => (
                        <div key={item.key} style={{
                            background: 'var(--card-background)',
                            padding: '16px 20px',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-color)' }}>{item.label}</span>
                            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                                <input
                                    type="color"
                                    value={item.color as string}
                                    onChange={(e) => setColor(item.key as any, e.target.value)}
                                    style={{
                                        border: 'none',
                                        padding: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        position: 'absolute',
                                        top: 0, left: 0,
                                        zIndex: 2,
                                        cursor: 'pointer'
                                    }}
                                />
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: item.color as string,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                    border: '2px solid rgba(255,255,255,0.1)',
                                    zIndex: 1
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={resetColors}
                    style={{
                        width: '100%',
                        marginTop: '32px',
                        background: 'var(--primary-color)',
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
        </div>
    );
}
