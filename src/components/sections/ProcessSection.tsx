/** @format */

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Calendar, Send, KeyRound } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Browse & Discover',
    description:
      'Explore our curated portfolio of the finest properties. Filter by location, type, price, and amenities to find your perfect match.',
  },
  {
    number: '02',
    icon: Send,
    title: 'Request a Tour',
    description:
      'Submit a tour request through our simple form. An agent will promptly contact you to schedule and confirm your private viewing.',
  },
  {
    number: '03',
    icon: KeyRound,
    title: 'Keys in Hand',
    description:
      'Our legal team handles all documentation, title verification, and smooth transfer — you just move in.',
  },
];

export default function ProcessSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id='process'
      className='py-28 bg-obsidian-950 relative overflow-hidden'
    >
      <div className='absolute right-0 top-0 w-[600px] h-[600px] bg-gold-400/2 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/4' />

      <div ref={ref} className='relative max-w-7xl mx-auto px-6 lg:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className='text-center mb-20'
        >
          <p className='section-eyebrow mb-4'>Simple & Transparent</p>
          <h2 className='section-title'>
            How It
            <br />
            <em className='italic text-gold-400'>Works</em>
          </h2>
          <div className='gold-line w-24 mx-auto mt-6' />
        </motion.div>

        {/* Steps */}
        <div className='relative'>
          {/* Connecting line */}
          <div className='absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent hidden lg:block' />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className='relative flex flex-col items-center text-center'
              >
                {/* Step circle */}
                <div className='relative w-24 h-24 rounded-full border border-gold-400/20 bg-obsidian-900 flex items-center justify-center mb-6 z-10'>
                  <div className='w-16 h-16 rounded-full bg-gold-400/8 flex items-center justify-center'>
                    <step.icon size={24} className='text-gold-400' />
                  </div>
                  {/* Number badge */}
                  <div className='absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-400 flex items-center justify-center'>
                    <span className='text-[10px] font-bold text-obsidian-950 font-mono'>
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className='font-display text-xl font-light text-gold-100 mb-3'>
                  {step.title}
                </h3>
                <p className='text-sm text-gold-100/45 leading-relaxed font-light max-w-xs'>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className='text-center mt-16'
        >
          <a href='#listings' className='btn-gold'>
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
}
