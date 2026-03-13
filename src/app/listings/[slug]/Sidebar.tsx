/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PieChart,
  Building,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { useRouter } from 'next/router';

const MENU_ITEMS = [
  { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
  { name: 'Investments', href: '/dashboard/investment', icon: PieChart },
  { name: 'My Properties', href: '/dashboard/properties', icon: Building },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const ADMIN_ITEMS = [
  { name: 'Admin Console', href: '/dashboard/admin', icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    // In a real app, you'd also call an API to invalidate the token
    localStorage.removeItem('lux_token');
    router.push('/login');
  };

  return (
    <aside className='w-64 bg-obsidian-900 border-r border-gold-400/10 hidden md:flex flex-col h-screen fixed left-0 top-0'>
      <div className='p-8'>
        <Link
          href='/'
          className='font-display text-2xl text-gold-100 tracking-widest uppercase'
        >
          Lux<span className='text-gold-400'>Estate</span>
        </Link>
      </div>

      <div className='flex-1 px-4 space-y-8'>
        <div>
          <p className='px-4 text-[10px] uppercase tracking-[2px] text-gold-400/50 mb-4'>
            Menu
          </p>
          <nav className='space-y-1'>
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all ${
                    isActive
                      ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20'
                      : 'text-gold-100/60 hover:text-gold-100 hover:bg-white/5'
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className='px-4 text-[10px] uppercase tracking-[2px] text-gold-400/50 mb-4'>
            Management
          </p>
          <Link
            href='/dashboard/admin'
            className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all ${pathname === '/dashboard/admin' ? 'bg-gold-400/10 text-gold-400' : 'text-gold-100/60 hover:text-gold-100'}`}
          >
            <Shield size={18} />
            Admin Console
          </Link>
        </div>
      </div>

      <div className='p-4 border-t border-gold-400/10'>
        <button
          onClick={handleSignOut}
          className='flex items-center gap-3 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 w-full rounded-lg hover:bg-red-400/10 transition-colors'
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
