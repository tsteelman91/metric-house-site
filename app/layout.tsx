import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

const TITLE = 'Metric House | How AI describes your business';
const DESCRIPTION =
  'Metric House helps local businesses see and improve how ChatGPT and Gemini describe them. A small studio in Chapel Hill, NC, that also builds software for research.';
// TODO(tyler): new og image that matches the GEO hero.
const OG_IMAGE = 'https://metric-house.com/og-image.png';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://metric-house.com',
    siteName: 'Metric House',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
