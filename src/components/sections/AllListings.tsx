/** @format */

/** @format */

'use client';

import { useState, useEffect } from 'react';
import { listingsApi } from '@/lib/api';
import PropertyCard from '@/components/listings/PropertyCard';
import PropertyCardSkeleton from '@/components/listings/PropertyCardSkeleton';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AllListings({
  filters,
  view = 'grid',
}: {
  filters: any;
  view?: 'grid' | 'list';
}) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchListings = async (reset = false) => {
    setLoading(true);
    try {
      const p = reset ? 1 : page;
      const res = await listingsApi.getAll({ ...filters, page: p, limit: 9 });
      const newListings = res.data.listings || [];

      setListings((prev) => (reset ? newListings : [...prev, ...newListings]));
      setHasMore(newListings.length === 9); // Assuming limit is 9
      if (!reset) setPage((prev) => prev + 1);
      else setPage(2);
    } catch (error) {
      console.error('Failed to fetch listings', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load & filter change
  useEffect(() => {
    fetchListings(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <section id='listings' className='py-20 bg-obsidian-950 min-h-[600px]'>
      <div className='max-w-7xl mx-auto px-6 lg:px-10'>
        <div className='mb-12'>
          <h2 className='section-title text-3xl md:text-4xl'>
            Latest <span className='text-gold-400 italic'>Additions</span>
          </h2>
        </div>

        {loading && listings.length === 0 && (
          <div
            className={`grid gap-8 ${
              view === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && listings.length === 0 ? (
          <div className='text-center py-20 border border-gold-400/10 rounded-2xl bg-obsidian-900/50'>
            <p className='text-gold-100/50 text-lg'>
              No properties match your search.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 text-gold-400 hover:underline text-sm uppercase tracking-widest'
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              view === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {listings.map((listing: any, i: number) => (
              <PropertyCard
                key={listing._id || i}
                listing={listing}
                view={view}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className='mt-16 text-center'>
            <button
              onClick={() => fetchListings(false)}
              disabled={loading}
              className='btn-ghost min-w-[200px]'
            >
              {loading ? (
                <Loader2 className='animate-spin mx-auto' />
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
