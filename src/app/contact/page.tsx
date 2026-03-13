/** @format */

import Navbar from '@/components/Navbar';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

export default function ContactPage() {
  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <div className='pt-24' />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
