'use client';

import { ReactNode } from 'react';
import { SearchProvider } from '@/context/SearchContext';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SearchProvider>
            {children}
        </SearchProvider>
    );
}
