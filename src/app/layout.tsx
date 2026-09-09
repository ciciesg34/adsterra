import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteSettings, getSiteName, getSiteDescription } from '@/lib/settings';

/**
 * Root layout for Vidnesia
 * Provides the overall structure for all pages
 */
export const metadata: Metadata = {
  title: {
    default: 'Vidnesia - Watch Amazing Videos Online',
    template: '%s | Vidnesia',
  },
  description: 'Discover and watch amazing videos from creators around the world. Vidnesia brings you the best content across all categories.',
  keywords: ['videos', 'streaming', 'entertainment', 'tutorials', 'education', 'vidnesia'],
  openGraph: {
    title: 'Vidnesia - Watch Amazing Videos Online',
    description: 'Discover and watch amazing videos from creators around the world.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = getSiteSettings();
  const siteName = getSiteName();
  const siteDescription = getSiteDescription();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={siteSettings.faviconUrl || '/images/placeholder-thumbnail.svg'} />
      </head>
      <body>
        <Header siteName={siteName} logoUrl={siteSettings.logoUrl} />
        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>
        <Footer settings={siteSettings} />
      </body>
    </html>
  );
}