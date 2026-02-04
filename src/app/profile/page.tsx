'use client';

import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { User, LogOut, Settings, CreditCard, Shield } from 'lucide-react';

export default function ProfilePage() {
    const userName = "المستخدم";
    const isSubscribed = true;
    const daysRemaining = 25;

    return (
        <div className="app-container">
            <Header />
            <main className="page-content" style={{ padding: '30px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                    <div className={`avatar-container ${isSubscribed ? 'premium-ring' : ''}`} style={{ width: '120px', height: '120px' }}>
                        <div className="avatar-main" style={{ background: '#1C1C1C' }}>
                            <span style={{ fontSize: '48px', color: isSubscribed ? '#FFD700' : 'white', fontWeight: 'bold' }}>
                                {userName[0].toUpperCase()}
                            </span>
                        </div>
                        {isSubscribed && (
                            <div className="days-badge" style={{ bottom: '-10px', padding: '4px 12px', fontSize: '14px' }}>
                                {daysRemaining} يوم متبقي
                            </div>
                        )}
                    </div>
                    <h2 style={{ marginTop: '24px', fontSize: '24px', fontWeight: '900', color: 'white' }}>{userName}</h2>
                    {isSubscribed && (
                        <div style={{
                            background: 'linear-gradient(to right, #FFD700, #FFA000)',
                            color: 'black',
                            padding: '4px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginTop: '8px',
                            textTransform: 'uppercase'
                        }}>
                            Premium Member
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        { icon: <CreditCard size={20} />, label: "إدارة الاشتراك", color: "#FFD700" },
                        { icon: <Settings size={20} />, label: "إعدادات الحساب", color: "white" },
                        { icon: <Shield size={20} />, label: "الأمان والخصوصية", color: "white" },
                        { icon: <LogOut size={20} />, label: "تسجيل الخروج", color: "#F44336" },
                    ].map((item, index) => (
                        <div key={index} style={{
                            background: '#1C1C1C',
                            padding: '18px 24px',
                            borderRadius: '16px',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center',
                            border: '1px solid rgba(255,255,255,0.05)',
                            cursor: 'pointer'
                        }}>
                            <div style={{ color: item.color }}>{item.icon}</div>
                            <span style={{ fontSize: '16px', fontWeight: '700', color: item.color }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
