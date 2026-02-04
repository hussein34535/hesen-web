'use client';

import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function NotificationsPage() {
    // Mock notification data (Matches RemoteMessage structure from Flutter)
    const message = {
        notification: {
            title: "تحديث جديد متوفر",
            body: "قم بتحديث التطبيق الآن للحصول على أحدث المميزات والقنوات."
        },
        data: {
            "version": "4.0.0",
            "type": "forced_update",
            "priority": "high"
        }
    };

    return (
        <div className="app-container">
            <Header />
            <main className="page-content" style={{ padding: '20px' }}>
                <div style={{
                    background: '#1C1C1C',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                            {message.notification.title}
                        </h2>
                        <p style={{ opacity: 0.7, fontSize: '16px' }}>
                            {message.notification.body}
                        </p>
                    </div>

                    <div style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#B81CB0', marginBottom: '16px' }}>
                            بيانات إضافية (Data Payload)
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {Object.entries(message.data).map(([key, value]) => (
                                <div key={key} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: '12px',
                                    borderBottom: '1px solid rgba(255,255,255,0.03)'
                                }}>
                                    <span style={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.6)' }}>{key}:</span>
                                    <span style={{ color: 'white' }}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center', opacity: 0.5 }}>
                    <p>لا توجد تنبيهات أخرى حالياً</p>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
