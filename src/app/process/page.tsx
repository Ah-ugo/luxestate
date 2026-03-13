/** @format */

import Navbar from '@/components/Navbar';
import ProcessSection from '@/components/sections/ProcessSection';
import FooterSection from '@/components/sections/FooterSection';
import PageHeader from '@/components/PageHeader';

export default function ProcessPage() {
  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <PageHeader
        eyebrow='Simple & Transparent'
        title='How It Works'
        imageUrl='https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974'
      />
      <ProcessSection />
      <FooterSection />
    </main>
  );
}
