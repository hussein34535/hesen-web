'use client';

import { User, LogOut, Crown, Settings } from 'lucide-react';

export default function ProfilePage() {
    // TODO: Implement Firebase auth state
    const isLoggedIn = false;
    const user = null;

    return (
        <div className="px-4 py-4 fade-in">
            <h1 className="text-2xl font-bold mb-6">الملف الشخصي</h1>

            {!isLoggedIn ? (
                <div className="text-center py-12">
                    {/* Guest Avatar */}
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-900 flex items-center justify-center mb-6">
                        <User size={48} className="text-white" />
                    </div>

                    <h2 className="text-xl font-bold mb-2">مرحباً بك</h2>
                    <p className="text-[var(--muted)] mb-6">سجل دخولك للوصول لجميع المميزات</p>

                    <button className="px-8 py-3 bg-[var(--primary)] rounded-full text-white font-bold hover:bg-[var(--primary-light)] transition-colors">
                        تسجيل الدخول
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* User Info */}
                    <div className="glass-card p-6 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-900 flex items-center justify-center mb-4">
                            <User size={40} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold">الاسم</h2>
                        <p className="text-[var(--muted)]">email@example.com</p>
                    </div>

                    {/* Subscription */}
                    <div className="glass-card p-4">
                        <div className="flex items-center gap-3">
                            <Crown className="text-amber-500" size={24} />
                            <div>
                                <h3 className="font-bold">الاشتراك</h3>
                                <p className="text-sm text-[var(--muted)]">غير مشترك</p>
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="glass-card p-4">
                        <button className="flex items-center gap-3 w-full">
                            <Settings size={24} />
                            <span>الإعدادات</span>
                        </button>
                    </div>

                    {/* Logout */}
                    <button className="glass-card p-4 flex items-center gap-3 w-full text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={24} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            )}
        </div>
    );
}
