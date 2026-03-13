/** @format */

/** @format */

'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchSection({
  onSearch,
}: {
  onSearch: (filters: any) => void;
}) {
  const [activeType, setActiveType] = useState('both');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch({
      listing_type: activeType === 'both' ? null : activeType,
      search: query,
    });
  };

  return (
    <section className='py-12 bg-obsidian-950 border-b border-gold-400/10 sticky top-0 z-30 backdrop-blur-xl bg-obsidian-950/80'>
      <div className='max-w-7xl mx-auto px-6 mt-10 lg:px-10'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          {/* Tabs */}
          <div className='flex bg-obsidian-900 p-1 rounded-lg border border-gold-400/20'>
            {['both', 'buy', 'rent'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveType(type);
                  onSearch({
                    listing_type: type === 'both' ? null : type,
                    search: query,
                  });
                }}
                className={`px-6 py-2 rounded-md text-sm uppercase tracking-wider transition-all ${
                  activeType === type
                    ? 'bg-gold-400 text-obsidian-950 font-bold shadow-lg'
                    : 'text-gold-100/60 hover:text-gold-100'
                }`}
              >
                {type === 'both' ? 'All' : type}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className='relative w-full md:max-w-md'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gold-400/50'
              size={18}
            />
            <input
              type='text'
              placeholder='Search city, building, or address...'
              className='w-full bg-obsidian-900 border border-gold-400/20 rounded-lg pl-12 pr-4 py-3 text-gold-100 placeholder-gold-100/30 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <button onClick={handleSearch} className='btn-gold w-full md:w-auto'>
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}
