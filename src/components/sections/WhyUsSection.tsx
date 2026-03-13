/** @format */

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, TrendingUp, Key, Award, Users, Clock } from 'lucide-react';
import Image from 'next/image';

const WHY_US = [
  {
    icon: Shield,
    title: 'Verified Properties',
    description:
      'Every listing undergoes rigorous due diligence. Title deeds, permits, and encumbrance checks — all verified before listing.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Intelligence',
    description:
      'Access to exclusive market data, yield analyses, and capital appreciation projections from our research desk.',
  },
  {
    icon: Key,
    title: 'White-Glove Service',
    description:
      'From first viewing to key handover, your dedicated agent manages every detail of your acquisition journey.',
  },
  {
    icon: Award,
    title: 'Award-Winning Firm',
    description:
      'Recognised as the Most Trusted Property Consultancy for three consecutive years by Real Trends.',
  },
  {
    icon: Users,
    title: 'Vast Network',
    description:
      'Access to off-market deals through our 500+ developer and vendor relationships across the US.',
  },
  {
    icon: Clock,
    title: 'Fast Transactions',
    description:
      'Average transaction completion in 21 days through our in-house legal and documentation team.',
  },
];

export default function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className='py-28 bg-obsidian-900 relative overflow-hidden'
      id='why-us'
    >
      {/* Background pattern */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #C9A84C 0, #C9A84C 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A84C 0, #C9A84C 1px, transparent 1px, transparent 60px)`,
        }}
      />
      <div className='absolute inset-0 bg-gradient-to-b from-obsidian-950/50 via-transparent to-obsidian-950/50' />

      <div
        ref={ref}
        className='relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className='relative aspect-[4/5] max-w-md mx-auto lg:max-w-none'>
            <div className='absolute -top-4 -left-4 w-full h-full border-2 border-gold-400/20 rounded-2xl' />
            <Image
              src='https://luciewhite.com/wp-content/uploads/2022/08/Lucie-1639x2048.jpeg'
              alt='Luxury Interior'
              fill
              className='object-cover rounded-2xl shadow-luxury'
            />
          </div>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {WHY_US.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
              className='group glass-card p-8 hover:border-gold-400/25 transition-all duration-500 hover:-translate-y-1'
            >
              <div className='w-14 h-14 rounded-xl bg-gold-400/8 border border-gold-400/15 flex items-center justify-center mb-6 group-hover:bg-gold-400/15 transition-colors'>
                <item.icon size={22} className='text-gold-400' />
              </div>
              <h3 className='font-display text-xl font-light text-gold-100 mb-3'>
                {item.title}
              </h3>
              <p className='text-sm text-gold-100/50 leading-relaxed font-light'>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
