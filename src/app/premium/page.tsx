'use client';

import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { Check, Diamond } from 'lucide-react';

export default function SubscriptionPage() {
    const plans = [
        {
            name: "اسبوعي",
            price: "10$",
            color: "#4CAF50",
            features: ["قنوات رياضية", "مباريات مباشرة", "دعم فني 7/24"]
        },
        {
            name: "شهري",
            price: "25$",
            color: "#2196F3",
            features: ["كل مميزات الاسبوعي", "جودة 4K", "بدون إعلانات"]
        },
        {
            name: "سنوي",
            price: "150$",
            color: "#FFD700",
            popular: true,
            features: ["كل مميزات الشهري", "توفير 50%", "قنوات حصرية"]
        }
    ];

    return (
        <div className="app-container">
            <Header />
            <main className="page-content" style={{ padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <Diamond size={32} color="#FFD700" />
                        الاشتراك المميز
                    </h2>
                    <p style={{ opacity: 0.7, marginTop: '8px' }}>استمتع بتجربة مشاهدة لا محدودة وبدون إعلانات</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
                    {plans.map((plan, index) => (
                        <div key={index} style={{
                            background: '#1C1C1C',
                            borderRadius: '24px',
                            padding: '24px',
                            border: `1.5px solid ${plan.popular ? plan.color : 'rgba(255,255,255,0.05)'}`,
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: plan.popular ? `0 10px 30px ${plan.color}20` : 'none'
                        }}>
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '-30px',
                                    background: plan.color,
                                    color: 'black',
                                    padding: '4px 40px',
                                    transform: 'rotate(45deg)',
                                    fontSize: '10px',
                                    fontWeight: '900'
                                }}>
                                    الأكثر طلباً
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: '900', color: plan.color }}>{plan.name}</h3>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: 'white' }}>{plan.price}</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {plan.features.map((feature, fIndex) => (
                                    <div key={fIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Check size={18} color={plan.color} />
                                        <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button style={{
                                width: '100%',
                                marginTop: '24px',
                                background: plan.color,
                                color: plan.name === 'سنوي' ? 'black' : 'white',
                                padding: '14px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                                اشترك الآن
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
