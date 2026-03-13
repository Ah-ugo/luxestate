/** @format */

import Navbar from '@/components/Navbar';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FooterSection from '@/components/sections/FooterSection';
import PageHeader from '@/components/PageHeader';

export default function TestimonialsPage() {
  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <PageHeader
        eyebrow='Client Stories'
        title='What Our Clients Say'
        imageUrl='https://images.unsplash.com/photo-1582561833409-998209349384?q=80&w=1974'
      />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
