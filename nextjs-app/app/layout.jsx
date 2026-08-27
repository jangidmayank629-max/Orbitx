import './globals.css';
import React from 'react';
import './globals.css';
import { Inter, Lexend } from 'next/font/google';
import { siteConfig } from '../lib/seo/siteConfig';
import { generateLocalBusinessSchema } from '../lib/seo/schema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'OrbitX Marketing - Best Social Media Marketing Agency in Mahwa, Rajasthan (321608)',
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.url
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'OrbitX Marketing - Best Social Media Marketing Agency in Mahwa, Rajasthan',
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'OrbitX Marketing - Dominate the Digital Space in Mahwa, Rajasthan'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrbitX Marketing - Best Social Media Marketing Agency in Mahwa',
    description: 'Cinematic video editing, hyper-targeted ad campaigns & SEO in Mahwa, Rajasthan (321608).',
    site: '@orbitxmarketing',
    creator: '@orbitxmarketing',
    images: [`${siteConfig.url}/opengraph-image`]
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Mahwa, Rajasthan',
    'geo.position': `${siteConfig.location.geo.latitude};${siteConfig.location.geo.longitude}`,
    'ICBM': `${siteConfig.location.geo.latitude}, ${siteConfig.location.geo.longitude}`,
    'zipcode': siteConfig.location.postalCode,
    'city': siteConfig.location.addressLocality,
    'state': siteConfig.location.addressRegion,
    'country': 'India'
  }
};

export default function RootLayout({ children }) {
  const jsonLdData = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${lexend.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Inject JSON-LD LocalBusiness & ProfessionalService Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary font-sans">
        {/* Semantic Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
