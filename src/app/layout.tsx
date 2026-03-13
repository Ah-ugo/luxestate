/** @format */

import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit, DM_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: 'LuxEstate — Premium Apartment Investment Platform',
  description:
    "The nation's premier luxury property platform for renting and buying apartments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='!scroll-smooth'>
      <AuthProvider>
        <body
          className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable} font-sans noise-overlay bg-obsidian-950 text-gold-100/90 overflow-x-hidden`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
