/** @format */

import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit, DM_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Navbar from '@/components/Navbar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-outfit',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'LuxEstate — Premium Apartment Investment Platform',
    template: '%s | LuxEstate',
  },
  description:
    'A premier luxury property platform for renting and buying apartments. Discover exclusive listings in prime locations, backed by expert guidance and seamless service.',
  keywords: [
    'luxury real estate',
    'property investment',
    'apartments for sale',
    'apartments for rent',
    'premium properties',
    'Lagos',
    'Abuja',
  ],
  metadataBase: new URL('https://luxestate.vercel.app'),
  openGraph: {
    title: 'LuxEstate — Premium Apartment Investment Platform',
    description:
      'Discover exclusive listings in prime locations, backed by expert guidance and seamless service.',
    url: 'https://luxestate.vercel.app',
    siteName: 'LuxEstate',
    images: [
      {
        url: '/logo1.png', // Place in /public folder
        width: 1200,
        height: 630,
        alt: 'Luxurious property managed by LuxEstate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxEstate — Premium Apartment Investment Platform',
    description:
      'Discover exclusive listings in prime locations, backed by expert guidance and seamless service.',
    images: ['/logo1.png'], // Place in /public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      <body className='bg-obsidian-950 text-gold-100/80 font-sans'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
