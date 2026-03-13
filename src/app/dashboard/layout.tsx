/** @format */
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className='min-h-screen bg-obsidian-950 flex'>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className='flex-1 md:ml-64 flex flex-col'>
        <header className='md:hidden bg-obsidian-900 border-b border-gold-400/10 p-4 flex items-center justify-between sticky top-0 z-40'>
          <Link
            href='/'
            className='font-display text-lg text-gold-100 tracking-widest uppercase'
          >
            Lux<span className='text-gold-400'>Estate</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className='text-gold-100'
          >
            <Menu />
          </button>
        </header>
        <main className='flex-1 p-4 sm:p-8'>{children}</main>
      </div>
    </div>
  );
}
