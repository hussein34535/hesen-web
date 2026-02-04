'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PlayerContent from './PlayerContent';

export default function PlayerPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-black">
                <Loader2 size={48} className="animate-spin text-[var(--primary)]" />
            </div>
        }>
            <PlayerContent />
        </Suspense>
    );
}
