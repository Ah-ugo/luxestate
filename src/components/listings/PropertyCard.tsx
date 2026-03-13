/** @format */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Move } from 'lucide-react';
import { motion } from 'framer-motion';

interface PropertyProps {
  listing: any;
  view?: 'grid' | 'list';
}

export default function PropertyCard({
  listing,
  view = 'grid',
}: PropertyProps) {
  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
    }).format(price.amount);
  };

  if (view === 'list') {
    return (
      <Link href={`/listings/${listing.slug}`} className='block'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='property-card group bg-obsidian-900 border border-gold-400/10 hover:border-gold-400/30 flex flex-col md:flex-row'
        >
          <div className='relative h-64 md:h-auto md:w-1/3 overflow-hidden flex-shrink-0'>
            <Image
              src={listing.images[0]?.url || '/placeholder.jpg'}
              alt={listing.title}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-110'
            />
          </div>
          <div className='p-6 flex-1 flex flex-col'>
            <div className='flex justify-between items-start'>
              <h3 className='text-xl font-light text-white mb-2 group-hover:text-gold-400 transition-colors'>
                {listing.title}
              </h3>
              <span className='px-3 py-1 bg-obsidian-950/80 backdrop-blur text-[10px] uppercase tracking-widest text-gold-400 rounded-full border border-gold-400/20'>
                {listing.listing_type === 'buy' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
            <div className='flex items-center gap-2 text-gold-100/40 text-xs mb-4'>
              <MapPin size={14} className='text-gold-400' />
              {listing.location.neighborhood}, {listing.location.city}
            </div>
            <p className='text-sm text-gold-100/50 leading-relaxed font-light line-clamp-2 mb-6'>
              {listing.description}
            </p>
            <div className='flex items-end justify-between mt-auto'>
              <div className='flex items-center gap-6 text-gold-100/60 text-sm'>
                <div className='flex items-center gap-2'>
                  <Bed size={16} /> {listing.bedrooms}
                </div>
                <div className='flex items-center gap-2'>
                  <Bath size={16} /> {listing.bathrooms}
                </div>
                <div className='flex items-center gap-2'>
                  <Move size={16} /> {listing.size_sqm} m²
                </div>
              </div>
              <p className='text-gold-100 font-display text-2xl'>
                {formatPrice(listing.price)}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/listings/${listing.slug}`} className='block h-full'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='property-card group bg-obsidian-900 border border-gold-400/10 hover:border-gold-400/30 h-full flex flex-col'
      >
        <div className='relative h-[280px] overflow-hidden flex-shrink-0'>
          <div className='absolute top-4 right-4 z-10 flex gap-2'>
            <span className='px-3 py-1 bg-obsidian-950/80 backdrop-blur text-[10px] uppercase tracking-widest text-gold-400 rounded-full border border-gold-400/20'>
              {listing.listing_type === 'buy' ? 'For Sale' : 'For Rent'}
            </span>
          </div>

          <Image
            src={listing.images[0]?.url || '/placeholder.jpg'}
            alt={listing.title}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80' />

          <div className='absolute bottom-4 left-4 right-4'>
            <p className='text-gold-100 font-display text-xl truncate'>
              {formatPrice(listing.price)}
            </p>
            {listing.price.period && (
              <span className='text-xs text-gold-400/60'>
                {listing.price.period}
              </span>
            )}
          </div>
        </div>

        <div className='p-6 flex-1 flex flex-col'>
          <h3 className='text-lg font-light text-white mb-2 truncate group-hover:text-gold-400 transition-colors'>
            {listing.title}
          </h3>
          <div className='flex items-center gap-2 text-gold-100/40 text-xs mb-6'>
            <MapPin size={14} className='text-gold-400' />
            {listing.location.neighborhood}, {listing.location.city}
          </div>

          <div className='flex items-center justify-between pt-4 border-t border-gold-400/10 text-gold-100/60 text-xs mt-auto'>
            <div className='flex items-center gap-1'>
              <Bed size={14} /> {listing.bedrooms} Beds
            </div>
            <div className='flex items-center gap-1'>
              <Bath size={14} /> {listing.bathrooms} Baths
            </div>
            <div className='flex items-center gap-1'>
              <Move size={14} /> {listing.size_sqm} m²
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
