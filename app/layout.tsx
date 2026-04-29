import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Metric House — Software for better workflows',
  description:
    'Metric House is a software company building Knowmad and Formulate. Tools that help people work better.',
  openGraph: {
    title: 'Metric House — Software for better workflows',
    description:
      'Metric House is a software company building Knowmad and Formulate. Tools that help people work better.',
    url: 'https://metric-house.com',
    siteName: 'Metric House',
    images: [{ url: 'https://metric-house.com/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metric House — Software for better workflows',
    images: ['https://metric-house.com/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
