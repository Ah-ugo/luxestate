/** @format */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listingsApi } from '@/lib/api';
import PropertyCard from '@/components/listings/PropertyCard';
import PropertyCardSkeleton from '@/components/listings/PropertyCardSkeleton';

export default function FeaturedListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await listingsApi.getFeatured();
      setListings(res.data.listings || []);
    };
    load();
  }, []);

  return (
    <section className='py-28 bg-obsidian-950 relative'>
      <div className='max-w-7xl mx-auto px-6 lg:px-10'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-6'>
          <div>
            <span className='section-eyebrow'>Curated Selection</span>
            <h2 className='section-title mt-4'>
              Featured <em className='text-gold-400 italic'>Residences</em>
            </h2>
          </div>
          <Link href='#listings' className='btn-ghost text-xs px-6 py-3'>
            View All Properties
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {listings.length > 0
            ? listings.map((l: any) => (
                <PropertyCard key={l.slug} listing={l} />
              ))
            : [1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  );
}
