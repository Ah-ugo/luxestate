/** @format */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Jonathan Sterling',
    role: 'CEO, Meridian Capital',
    location: 'New York',
    rating: 5,
    text: 'LuxEstate transformed my property search from a stressful ordeal into a genuinely pleasurable experience. Their knowledge of the Manhattan market is unparalleled. I purchased two apartments through them and both have exceeded my investment expectations.',
    property: '2 units, Tribeca Residences',
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Director, Tech Ventures',
    location: 'San Francisco',
    rating: 5,
    text: 'The transparency and professionalism at LuxEstate is what sets them apart. I was concerned about due diligence. Their legal team provided thorough title verification and the entire Beverly Hills transaction was completed without a single complication.',
    property: 'Beverly Hills Garden Suite',
    avatar: 'SJ',
  },
  {
    id: 3,
    name: 'Michael Ross',
    role: 'Managing Partner, Ross & Associates',
    location: 'Miami',
    rating: 5,
    text: "I've used five real estate firms in Miami over the years. LuxEstate is in a different league entirely. The digital platform, transparent communication, and the follow-through from their agents made buying my Brickell apartment seamless. A truly first-class experience.",
    property: 'Brickell Signature Tower',
    avatar: 'MR',
  },
  {
    id: 4,
    name: 'Emily Thorne',
    role: 'Founder, Verde Capital',
    location: 'Austin',
    rating: 5,
    text: 'When my company needed to house three senior executives in Austin, LuxEstate delivered options within 48 hours that matched our exact specifications. The tour booking process was effortless and the properties were exactly as advertised. Exceptional service.',
    property: 'Harbour View Apartments, 3 units',
    avatar: 'ET',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section
      id='testimonials'
      className='py-28 bg-obsidian-900 relative overflow-hidden'
    >
      <div className='absolute inset-0 bg-gradient-to-b from-obsidian-950/30 to-obsidian-950/30' />
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-400/3 rounded-full blur-[100px]' />

      <div ref={ref} className='relative max-w-5xl mx-auto px-6 lg:px-10'>
        {/* Testimonial card */}
        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className='glass-card p-10 md:p-14 text-center'
            >
              {/* Quote icon */}
              <Quote size={40} className='text-gold-400/20 mx-auto mb-8' />

              {/* Stars */}
              <div className='flex justify-center gap-1 mb-6'>
                {Array(t.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className='text-gold-400 fill-gold-400'
                    />
                  ))}
              </div>

              {/* Quote text */}
              <blockquote className='font-display text-xl md:text-2xl font-light text-gold-100/90 leading-relaxed italic mb-10 max-w-3xl mx-auto'>
                "{t.text}"
              </blockquote>

              {/* Property */}
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-gold-400/8 border border-gold-400/15 rounded-full mb-8'>
                <span className='text-xs tracking-wider text-gold-400/70'>
                  {t.property}
                </span>
              </div>

              {/* Author */}
              <div className='flex items-center justify-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center'>
                  <span className='text-sm font-bold text-gold-400'>
                    {t.avatar}
                  </span>
                </div>
                <div className='text-left'>
                  <div className='text-base font-medium text-gold-100'>
                    {t.name}
                  </div>
                  <div className='text-xs text-gold-100/40'>
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className='flex items-center justify-between mt-8'>
            <button
              onClick={prev}
              className='w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400/60 hover:border-gold-400 hover:text-gold-400 transition-all'
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className='flex gap-2'>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2 bg-gold-400'
                      : 'w-2 h-2 bg-gold-400/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className='w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400/60 hover:border-gold-400 hover:text-gold-400 transition-all'
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
