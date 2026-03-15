/** @format */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  PieChart,
  Building,
  Settings,
  LogOut,
  Shield,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const MENU_ITEMS = [
  { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
  // { name: 'Investments', href: '/dashboard/investment', icon: PieChart },
  { name: 'My Properties', href: '/dashboard/properties', icon: Building },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const ADMIN_ITEMS = [
  { name: 'Admin Console', href: '/dashboard/admin', icon: Shield },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false); // Set to false for regular user view

  const handleSignOut = () => {
    localStorage.removeItem('lux_token');
    router.push('/login');
  };

  // Close sidebar on route change on mobile
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-40 md:hidden'
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 bg-obsidian-900 border-r border-gold-400/10 flex flex-col h-full transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-8 flex items-center justify-between'>
          <Link
            href='/'
            className='font-display text-2xl text-gold-100 tracking-widest uppercase'
          >
            Lux<span className='text-gold-400'>Estate</span>
          </Link>
          <button onClick={onClose} className='md:hidden text-gold-100/70'>
            <X size={20} />
          </button>
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
                    className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all ${isActive ? 'bg-gold-400/10 text-gold-400' : 'text-gold-100/60 hover:text-gold-100'}`}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {isAdmin && (
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
          )}
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
    </>
  );
}
