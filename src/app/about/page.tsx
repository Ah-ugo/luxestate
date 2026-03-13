/** @format */

import Navbar from '@/components/Navbar';
import WhyUsSection from '@/components/sections/WhyUsSection';
import FooterSection from '@/components/sections/FooterSection';
import StatsSection from '@/components/sections/StatsSection';
import PageHeader from '@/components/PageHeader';

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <PageHeader
        eyebrow='The LuxEstate Difference'
        title='Why Discerning Clients Choose Us'
        imageUrl='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070'
      />
      <WhyUsSection />
      <StatsSection stats={{}} />
      <FooterSection />
    </main>
  );
}
