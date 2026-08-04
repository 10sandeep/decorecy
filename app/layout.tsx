import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PhoneButton } from '@/components/PhoneButton';
import { StructuredData } from '@/components/StructuredData';
import { siteConfig } from '@/lib/site-config';
import {
  localBusinessSchema,
  websiteSchema,
  organizationSchema,
} from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Interior Designers in Bhubaneswar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'interior designers in Bhubaneswar',
    'interior designer in Bhubaneswar',
    'interior design company in Bhubaneswar',
    'home interior designers in Bhubaneswar',
    'modular kitchen designers in Bhubaneswar',
    'office interior designers in Bhubaneswar',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Interior Designers in Bhubaneswar`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Interior Designers in Bhubaneswar`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        <StructuredData data={localBusinessSchema()} />
        <StructuredData data={websiteSchema()} />
        <StructuredData data={organizationSchema()} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <PhoneButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
