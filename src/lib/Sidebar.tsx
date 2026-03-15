/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import {
  LayoutDashboard,
  PieChart,
  Building,
  List,
  Mail,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
  // { name: 'Investments', href: '/dashboard/investment', icon: PieChart },
  { name: 'Messages', href: '/dashboard/messages', icon: Mail },
  { name: 'My Properties', href: '/dashboard/properties', icon: Building },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const ADMIN_ITEMS = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: Shield },
  {
    name: 'Manage Listings',
    href: '/dashboard/admin/manage-listings',
    icon: List,
  },
  {
    name: 'Messages',
    href: '/dashboard/admin/messages',
    icon: Mail,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth();

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`w-64 bg-obsidian-900 border-r border-gold-400/10 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
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

          {isAdmin && (
            <div>
              <p className='px-4 text-[10px] uppercase tracking-[2px] text-gold-400/50 mb-4'>
                Management
              </p>
              <nav className='space-y-1'>
                {ADMIN_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all ${isActive ? 'bg-gold-400/10 text-gold-400' : 'text-gold-100/60 hover:text-gold-100 hover:bg-white/5'}`}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        <div className='p-4 border-t border-gold-400/10'>
          <button
            onClick={logout}
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
