/** @format */

/** @format */

'use client';

import { ArrowRight, Mail } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className='py-24 bg-gold-400 relative overflow-hidden'>
      <div className='absolute inset-0 bg-obsidian-950/10 pattern-grid-lg opacity-20' />

      <div className='max-w-4xl mx-auto px-6 text-center relative z-10'>
        <h2 className='font-display text-4xl md:text-5xl text-obsidian-950 mb-6'>
          Exclusive Off-Market Deals
        </h2>
        <p className='text-obsidian-950/70 text-lg mb-10 max-w-xl mx-auto font-medium'>
          Join our private investor circle. Receive first access to new
          developments and off-market opportunities before they go public.
        </p>

        <form className='flex flex-col md:flex-row gap-4 max-w-lg mx-auto'>
          <div className='relative flex-1'>
            <Mail
              className='absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-950/40'
              size={18}
            />
            <input
              type='email'
              placeholder='Enter your email address'
              className='w-full bg-obsidian-950/5 border border-obsidian-950/10 rounded-lg px-12 py-4 text-obsidian-950 placeholder-obsidian-950/40 focus:outline-none focus:bg-white/40 transition-all'
            />
          </div>
          <button className='bg-obsidian-950 text-gold-400 px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-obsidian-900 transition-colors flex items-center justify-center gap-2 group'>
            Subscribe
            <ArrowRight
              size={16}
              className='group-hover:translate-x-1 transition-transform'
            />
          </button>
        </form>

        <p className='mt-6 text-xs text-obsidian-950/40 uppercase tracking-widest font-bold'>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
