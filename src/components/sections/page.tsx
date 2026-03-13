/** @format */

import Navbar from '@/components/Navbar';
import FooterSection from '@/components/sections/FooterSection';

export default function PrivacyPage() {
  return (
    <main className='min-h-screen bg-obsidian-950'>
      <Navbar />
      <div className='pt-32 pb-20 px-6 max-w-4xl mx-auto'>
        <h1 className='section-title mb-8'>
          Privacy <span className='text-gold-400 italic'>Policy</span>
        </h1>
        <div className='glass-card p-10 space-y-6 text-gold-100/70 font-light leading-relaxed'>
          <p>Last updated: June 2024</p>
          <h3 className='text-xl text-gold-100 font-display'>
            1. Information We Collect
          </h3>
          <p>
            We collect information you provide directly to us when you create an
            account, book a tour, or communicate with us.
          </p>
          <h3 className='text-xl text-gold-100 font-display'>
            2. How We Use Your Information
          </h3>
          <p>
            We use the information we collect to facilitate tour bookings,
            process payments, and send you technical notices and support
            messages.
          </p>
          <h3 className='text-xl text-gold-100 font-display'>
            3. Data Security
          </h3>
          <p>
            We take reasonable measures to help protect information about you
            from loss, theft, misuse and unauthorized access.
          </p>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
