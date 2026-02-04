// This file is simplified to keep Metadata working. We will create a `components/Providers.tsx` first. 
// Wait, I should create Providers.tsx first in the next tool call, then update this.
// But I can't do conditional logic here easily.
// I will create Providers.tsx right now via write_to_file in the NEXT step (parallel tool calls not supported for dependencies).
// So I will edit layout.tsx to import Providers (which I will create in the next step).

import type { Metadata, Viewport } from 'next';
import './globals.css';
import './premium.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: '7eSen TV',
  description: 'شاهد القنوات والمباريات مباشرة',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <div className="app-container">
            <Header />
            <main className="main-content">{children}</main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
