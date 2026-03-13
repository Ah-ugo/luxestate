/** @format */

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-center px-6'>
      <div className='bg-gold-400/5 rounded-full p-8 mb-6'>
        <h1 className='font-display text-8xl text-gold-400'>404</h1>
      </div>
      <h2 className='text-2xl text-gold-100 font-light mb-4'>Page Not Found</h2>
      <p className='text-gold-100/50 max-w-md mb-8'>
        The luxury residence you are looking for might have been moved or does
        not exist.
      </p>
      <Link href='/' className='btn-gold'>
        <Home className='w-4 h-4 mr-2' /> Return Home
      </Link>
      <div className='absolute bottom-10 text-xs text-gold-100/20 uppercase tracking-widest'>
        LuxEstate Exclusive
      </div>
    </div>
  );
}
