/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Listings', href: '/listings' },
  { name: 'Why Us', href: '/about' },
  { name: 'Process', href: '/process' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const checkLoginStatus = useCallback(() => {
    setIsLoggedIn(!!localStorage.getItem('lux_token'));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();

    // Listen for storage changes to update login status across tabs
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [checkLoginStatus]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-obsidian-950/70 backdrop-blur-xl border-white/5 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between'>
        <Link href='/' className='group relative z-50'>
          <div className='font-display text-2xl text-gold-100 tracking-[0.2em] uppercase group-hover:text-white transition-colors'>
            Lux
            <span className='text-gold-400 group-hover:text-gold-300 transition-colors'>
              Estate
            </span>
          </div>
        </Link>

        <div className='hidden lg:flex items-center gap-8'>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-[2px] transition-colors uppercase font-medium relative group ${
                  isActive
                    ? 'text-gold-400'
                    : 'text-gold-100/60 hover:text-gold-400'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-gold-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </div>

        <div className='hidden lg:flex items-center gap-6'>
          {isLoggedIn ? (
            <Link
              href='/dashboard/user'
              className='flex items-center gap-2 text-xs font-bold text-gold-100 tracking-widest uppercase hover:text-gold-400 transition-colors'
            >
              <User size={14} />
              Dashboard
            </Link>
          ) : (
            <Link
              href='/login'
              className='text-xs font-bold text-gold-100/60 tracking-widest uppercase hover:text-white transition-colors'
            >
              Sign In
            </Link>
          )}

          <Link
            href='/listings'
            className='px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gold-400 text-[10px] font-bold tracking-[2px] hover:bg-gold-400 hover:text-obsidian-950 transition-all duration-500 uppercase backdrop-blur-md'
          >
            Book Private Tour
          </Link>
        </div>

        <button
          className='lg:hidden text-gold-100 z-50'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='absolute top-0 left-0 right-0 bottom-0 h-screen bg-obsidian-950/95 backdrop-blur-xl p-6 flex flex-col items-center justify-center lg:hidden z-40'
          >
            <div className='flex flex-col gap-4'>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 block text-center uppercase tracking-widest text-xl font-display ${isActive ? 'text-gold-400' : 'text-gold-100/80 hover:text-gold-400'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href={isLoggedIn ? '/dashboard/user' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className='text-gold-400 py-2 block text-center uppercase tracking-widest text-sm mt-4'
              >
                {isLoggedIn ? 'Dashboard' : 'Sign In'}
              </Link>

              <Link
                href='/listings'
                onClick={() => setMobileMenuOpen(false)}
                className='w-full mt-8 px-8 py-4 bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest rounded-full block text-center'
              >
                Book Private Tour
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
