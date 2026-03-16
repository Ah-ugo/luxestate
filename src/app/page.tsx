/** @format */

'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import TickerBanner from '@/components/sections/TickerBanner';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedListings from '@/components/sections/FeaturedListings';
import SearchSection from '@/components/sections/SearchSection';
import AllListings from '@/components/sections/AllListings';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import { listingsApi } from '@/lib/api';

export default function HomePage() {
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    listingsApi
      .getStats()
      .then((r) => setStats(r.data))
      .catch(() => {});
    // Auto-seed if needed (dev mode)
    // if (process.env.NODE_ENV === 'development') {
    //   listingsApi.seed().catch(() => {});
    // }
  }, []);

  return (
    <main className='min-h-screen'>
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <StatsSection stats={stats} />
      <FeaturedListings />
      <SearchSection onSearch={setFilters} />
      <AllListings filters={filters} />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <NewsletterSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
