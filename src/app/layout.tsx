// This file is simplified to keep Metadata working. We will create a `components/Providers.tsx` first. 
// Wait, I should create Providers.tsx first in the next tool call, then update this.
// But I can't do conditional logic here easily.
// I will create Providers.tsx right now via write_to_file in the NEXT step (parallel tool calls not supported for dependencies).
// So I will edit layout.tsx to import Providers (which I will create in the next step).

import './globals.css';
import './premium.css';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Providers } from '@/components/Providers';
import { Metadata, Viewport } from 'next';
import SplashScreen from '@/components/SplashScreen';

export const metadata: Metadata = {
  title: 'Hesen TV',
  description: 'Watch Live TV and News',
  manifest: '/manifest.json',
  referrer: 'no-referrer',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Hesen TV',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#7C52D8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Native feel
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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=block" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=block" rel="stylesheet" />

        {/* Vidstack Player */}
        <link rel="stylesheet" href="https://cdn.vidstack.io/player/theme.css" />
        <link rel="stylesheet" href="https://cdn.vidstack.io/player/video.css" />
        <script type="module" src="https://cdn.vidstack.io/player" async />
      </head>
      <body>
        <Providers>
          <SplashScreen />
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
