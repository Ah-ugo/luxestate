/** @format */

'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AllListings from '@/components/sections/AllListings';
import SearchSection from '@/components/sections/SearchSection';
import FooterSection from '@/components/sections/FooterSection';

export default function ListingsPage() {
  const [filters, setFilters] = useState({});
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <div className='pt-32 pb-10 px-6 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between md:items-end gap-4'>
          <div>
            <p className='section-eyebrow mb-4'>Our Portfolio</p>
            <h1 className='section-title'>
              Exclusive <span className='text-gold-400 italic'>Collection</span>
            </h1>
          </div>
          <div className='flex items-center gap-2 p-1 bg-obsidian-900 border border-gold-400/10 rounded-lg'>
            {[
              { icon: LayoutGrid, value: 'grid' },
              { icon: List, value: 'list' },
            ].map(({ icon: Icon, value }) => (
              <button
                key={value}
                onClick={() => setView(value as any)}
                className={`p-2 rounded-md transition-colors ${view === value ? 'bg-gold-400/10 text-gold-400' : 'text-gold-100/40 hover:text-gold-100'}`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <SearchSection onSearch={setFilters} />
      <AllListings filters={filters} view={view} />
      <FooterSection />
    </main>
  );
}
