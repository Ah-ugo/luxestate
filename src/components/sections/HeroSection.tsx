/** @format */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden'>
      {/* Background Image with Parallax Effect */}
      <div className='absolute inset-0 z-0'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-spin-slow'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80')",
            animationDuration: '60s',
            animationDirection: 'alternate',
          }}
        />
        <div className='absolute inset-0 bg-obsidian-950/40' />
        <div className='absolute inset-0 bg-gradient-to-b from-obsidian-950/60 via-transparent to-obsidian-950' />
      </div>

      <div className='relative z-10 text-center px-4 max-w-5xl mx-auto mt-20'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className='section-eyebrow mb-6 block'>
            Premium Real Estate
          </span>
          <h1 className='font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8'>
            Experience the <br />
            <span className='italic text-gold-400 font-light'>Pinnacle</span> of
            Living.
          </h1>
          <p className='text-gold-100/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed'>
            Discover the most exclusive portfolio of luxury apartments. From the
            skyline of Manhattan to the serenity of Beverly Hills.
          </p>

          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <Link
              href='#listings'
              className='btn-gold w-full md:w-auto min-w-[200px]'
            >
              Explore Listings
            </Link>
            <Link
              href='#listings'
              className='btn-ghost w-full md:w-auto min-w-[200px]'
            >
              Book Private Tour
            </Link>
          </div>
        </motion.div>
      </div>

      <div className='absolute bottom-10 left-0 right-0 flex justify-center animate-bounce'>
        <div className='w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-400 to-transparent' />
      </div>
    </section>
  );
}
