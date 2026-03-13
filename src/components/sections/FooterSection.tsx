/** @format */

import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className='bg-obsidian-950 pt-24 pb-12 border-t border-gold-400/10'>
      <div className='max-w-7xl mx-auto px-6 lg:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 mb-20'>
          <div className='md:col-span-5'>
            <Link
              href='/'
              className='font-display text-3xl text-gold-100 tracking-widest uppercase mb-6 block'
            >
              Lux<span className='text-gold-400'>Estate</span>
            </Link>
            <p className='text-gold-100/60 font-light leading-relaxed max-w-sm mb-8'>
              The premier luxury real estate platform. We bridge the gap between
              discerning investors and exceptional properties across the United
              States.
            </p>
            <div className='flex gap-4'>
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  className='w-10 h-10 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-obsidian-950 transition-all'
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className='md:col-span-2'>
            <h4 className='text-gold-100 font-bold uppercase tracking-widest text-xs mb-6'>
              Company
            </h4>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/about'
                  className='text-gold-100/60 hover:text-gold-400 text-sm transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gold-100/60 hover:text-gold-400 text-sm transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-2'>
            <h4 className='text-gold-100 font-bold uppercase tracking-widest text-xs mb-6'>
              Legal
            </h4>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/terms'
                  className='text-gold-100/60 hover:text-gold-400 text-sm transition-colors'
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-gold-100/60 hover:text-gold-400 text-sm transition-colors'
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-3'>
            <h4 className='text-gold-100 font-bold uppercase tracking-widest text-xs mb-6'>
              Office
            </h4>
            <p className='text-gold-100/60 text-sm leading-relaxed mb-2'>
              152 West 57th Street,
              <br />
              Manhattan, New York.
            </p>
            <a
              href='mailto:concierge@luxestate.us'
              className='text-gold-400 text-sm hover:underline'
            >
              concierge@luxestate.us
            </a>
          </div>
        </div>

        <div className='border-t border-gold-400/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gold-100/30'>
          <p>© {new Date().getFullYear()} LuxEstate US. All rights reserved.</p>
          <p>Designed for Luxury.</p>
        </div>
      </div>
    </footer>
  );
}
