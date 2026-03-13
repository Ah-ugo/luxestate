/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { listingsApi, formatPrice } from '@/lib/api';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/sections/FooterSection';
import BookingModal from '@/components/modals/BookingModal';
import { MapPin, Bed, Bath, Move, Check } from 'lucide-react';

export default function ListingDetailPage() {
  const { slug } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        const res = await listingsApi.getBySlug(slug as string);
        setListing(res.data);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading)
    return (
      <div className='min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400'>
        Loading Residence...
      </div>
    );

  if (!listing)
    return (
      <div className='min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400'>
        Property not found.
      </div>
    );

  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <BookingModal
        listing={listing}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Hero Image */}
      <div className='relative h-[60vh] w-full'>
        <Image
          src={listing.images[0]?.url || '/placeholder.jpg'}
          alt={listing.title}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent' />
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-gold-400/20 border border-gold-400/30 rounded-full backdrop-blur-md mb-4'>
            <span className='text-xs font-bold text-gold-400 uppercase tracking-widest'>
              {listing.listing_type}
            </span>
          </div>
          <h1 className='font-display text-4xl md:text-6xl text-white mb-2'>
            {listing.title}
          </h1>
          <div className='flex items-center gap-2 text-gold-100/70'>
            <MapPin size={18} className='text-gold-400' />
            {listing.location.address}, {listing.location.city}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12'>
        {/* Left Column: Details */}
        <div className='lg:col-span-2 space-y-12'>
          {/* Key Stats */}
          <div className='grid grid-cols-3 gap-4 p-6 bg-obsidian-900/50 border border-gold-400/10 rounded-2xl'>
            <div className='text-center'>
              <p className='text-xs uppercase tracking-widest text-gold-400/50 mb-1'>
                Bedrooms
              </p>
              <div className='flex items-center justify-center gap-2 text-xl text-gold-100'>
                <Bed size={20} /> {listing.bedrooms}
              </div>
            </div>
            <div className='text-center border-l border-gold-400/10'>
              <p className='text-xs uppercase tracking-widest text-gold-400/50 mb-1'>
                Bathrooms
              </p>
              <div className='flex items-center justify-center gap-2 text-xl text-gold-100'>
                <Bath size={20} /> {listing.bathrooms}
              </div>
            </div>
            <div className='text-center border-l border-gold-400/10'>
              <p className='text-xs uppercase tracking-widest text-gold-400/50 mb-1'>
                Size
              </p>
              <div className='flex items-center justify-center gap-2 text-xl text-gold-100'>
                <Move size={20} /> {listing.size_sqm} m²
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className='text-2xl font-display text-gold-100 mb-4'>
              About this Residence
            </h3>
            <p className='text-gold-100/60 leading-relaxed font-light text-lg'>
              {listing.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className='text-2xl font-display text-gold-100 mb-6'>
              Features & Amenities
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {listing.features?.map((f: string, i: number) => (
                <div
                  key={i}
                  className='flex items-center gap-3 text-sm text-gold-100/70'
                >
                  <div className='w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-400'>
                    <Check size={10} />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className='text-2xl font-display text-gold-100 mb-6'>
              Gallery
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {listing.images?.slice(1).map((img: any, i: number) => (
                <div
                  key={i}
                  className='relative h-64 rounded-xl overflow-hidden border border-gold-400/10 group'
                >
                  <Image
                    src={img.url}
                    alt='Gallery'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking */}
        <div className='relative'>
          <div className='sticky top-28 bg-obsidian-900 border border-gold-400/20 rounded-2xl p-8 shadow-luxury'>
            <p className='text-xs uppercase tracking-widest text-gold-400/50 mb-2'>
              Price
            </p>
            <div className='flex items-baseline gap-2 mb-6'>
              <span className='text-4xl font-display text-gold-100'>
                {formatPrice(listing.price)}
              </span>
              {listing.price.period && (
                <span className='text-sm text-gold-100/50'>
                  {listing.price.period}
                </span>
              )}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className='btn-gold w-full mb-4 py-4 text-base'
            >
              Request Private Tour
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className='btn-ghost w-full py-4 text-base border-gold-400/20 text-gold-100/60 hover:text-gold-400'
            >
              Contact Agent
            </button>

            <div className='mt-8 pt-8 border-t border-gold-400/10'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-400 font-display text-lg'>
                  {listing.agent_name?.charAt(0)}
                </div>
                <div>
                  <p className='text-sm text-gold-100 font-medium'>
                    {listing.agent_name}
                  </p>
                  <p className='text-xs text-gold-400/60'>
                    Senior Property Consultant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
