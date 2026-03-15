/** @format */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { listingsApi, formatPrice } from '@/lib/api';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/sections/FooterSection';
import BookingModal from '@/components/modals/BookingModal';
import {
  MapPin,
  Bed,
  Bath,
  Move,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
} from 'lucide-react';

export default function ListingDetailPage() {
  const { slug } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [heroRef, heroApi] = useEmblaCarousel({ loop: true });
  const [fullscreenRef, fullscreenApi] = useEmblaCarousel({ loop: true });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

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

  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => setSelectedIndex(heroApi.selectedScrollSnap());
    heroApi.on('select', onSelect);
    return () => {
      heroApi.off('select', onSelect);
    };
  }, [heroApi]);

  useEffect(() => {
    if (!fullscreenApi) return;
    const onSelect = () => {
      setSelectedIndex(fullscreenApi.selectedScrollSnap());
      if (thumbsApi) thumbsApi.scrollTo(fullscreenApi.selectedScrollSnap());
    };
    fullscreenApi.on('select', onSelect);
    return () => {
      fullscreenApi.off('select', onSelect);
    };
  }, [fullscreenApi, thumbsApi]);

  useEffect(() => {
    if (fullscreenOpen && fullscreenApi && heroApi) {
      fullscreenApi.scrollTo(heroApi.selectedScrollSnap(), true);
    }
  }, [fullscreenOpen, fullscreenApi, heroApi]);

  const scrollPrev = () => {
    if (heroApi) heroApi.scrollPrev();
    if (fullscreenApi) fullscreenApi.scrollPrev();
  };

  const scrollNext = () => {
    if (heroApi) heroApi.scrollNext();
    if (fullscreenApi) fullscreenApi.scrollNext();
  };

  const scrollTo = (index: number) => {
    if (heroApi) heroApi.scrollTo(index);
    if (fullscreenApi) fullscreenApi.scrollTo(index);
  };

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

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {fullscreenOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] bg-black flex flex-col'
          >
            <button
              onClick={() => setFullscreenOpen(false)}
              className='absolute top-6 right-6 z-50 text-white hover:text-gold-400 p-2'
            >
              <X size={32} />
            </button>

            <div className='flex-1 overflow-hidden' ref={fullscreenRef}>
              <div className='flex h-full'>
                {listing.images?.map((img: any, index: number) => (
                  <div
                    key={index}
                    className='flex-[0_0_100%] min-w-0 relative h-full'
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || listing.title}
                      fill
                      className='object-contain'
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className='h-24 bg-black/90 w-full z-50 py-4 px-4'>
              <div
                className='overflow-hidden h-full max-w-5xl mx-auto'
                ref={thumbsRef}
              >
                <div className='flex gap-3 h-full'>
                  {listing.images?.map((img: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`relative min-w-[80px] w-20 h-full rounded-md overflow-hidden transition-all border-2 ${
                        selectedIndex === index
                          ? 'border-gold-400 opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt='thumb'
                        fill
                        className='object-cover'
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={scrollPrev}
              className='absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-gold-400 bg-black/20 hover:bg-black/40 rounded-full transition-colors'
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={scrollNext}
              className='absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-gold-400 bg-black/20 hover:bg-black/40 rounded-full transition-colors'
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Carousel */}
      <div className='relative h-[60vh] w-full overflow-hidden group'>
        <div ref={heroRef} className='h-full'>
          <div className='flex h-full'>
            {listing.images?.map((img: any, index: number) => (
              <div
                key={index}
                className='flex-[0_0_100%] min-w-0 relative h-full'
              >
                <Image
                  src={img.url}
                  alt={img.alt || listing.title}
                  fill
                  className='object-cover'
                  priority={index === 0}
                />
                <div className='absolute inset-0 bg-obsidian-950/30' />
                <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent' />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Controls */}
        <button
          onClick={() => setFullscreenOpen(true)}
          className='absolute top-24 right-6 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:text-gold-400 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 z-10'
        >
          <Expand size={20} />
        </button>

        <button
          onClick={scrollPrev}
          className='absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gold-400 bg-black/10 hover:bg-black/30 rounded-full transition-colors opacity-0 group-hover:opacity-100 z-10'
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={scrollNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gold-400 bg-black/10 hover:bg-black/30 rounded-full transition-colors opacity-0 group-hover:opacity-100 z-10'
        >
          <ChevronRight size={32} />
        </button>

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

          {/* Full Image Gallery */}
          <div>
            <h3 className='text-2xl font-display text-gold-100 mb-6'>
              Full Gallery
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {listing.images?.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    scrollTo(i);
                    setFullscreenOpen(true);
                  }}
                  className='relative aspect-video rounded-xl overflow-hidden border border-gold-400/10 group'
                >
                  <Image
                    src={img.url}
                    alt={img.alt || 'Gallery image'}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                </button>
              ))}
            </div>
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
