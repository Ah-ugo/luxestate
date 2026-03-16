/** @format */

/** @format */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactApi } from '@/lib/api';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.send(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id='contact'
      className='py-28 bg-obsidian-950 relative overflow-hidden'
    >
      {/* Background accents */}
      <div className='absolute inset-0 opacity-10'>
        <Image
          src='https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070'
          alt='Contact background'
          fill
          className='object-cover'
        />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950' />
      <div className='max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
        {/* Text Side */}
        <div>
          <p className='section-eyebrow mb-4'>Get in Touch</p>
          <h2 className='section-title mb-6'>
            Let's Discuss Your <br />
            <em className='text-gold-400 italic'>Investment</em>
          </h2>
          <p className='text-gold-100/60 font-light text-lg leading-relaxed mb-10'>
            Whether you're looking to buy, sell, or rent, our team of luxury
            real estate experts is ready to assist you. Visit our headquarters
            or send us a message.
          </p>

          <div className='space-y-6'>
            {[
              {
                label: 'Headquarters',
                value: '152 West 57th St, New York, NY 10019',
              },
              { label: 'Phone', value: '+1 (212) 555-0199' },
              { label: 'Email', value: 'concierge@luxestate.online' },
            ].map((item) => (
              <div
                key={item.label}
                className='border-l-2 border-gold-400/20 pl-6'
              >
                <p className='text-xs uppercase tracking-widest text-gold-400/50 mb-1'>
                  {item.label}
                </p>
                <p className='text-gold-100 text-lg font-display'>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Side */}
        <div className='bg-obsidian-900 border border-gold-400/10 rounded-2xl p-8 md:p-10 shadow-luxury relative'>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='text-center py-20'
            >
              <div className='w-20 h-20 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-400'>
                <CheckCircle2 size={40} />
              </div>
              <h3 className='text-2xl font-display text-gold-100 mb-2'>
                Message Sent
              </h3>
              <p className='text-gold-100/60'>
                We will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className='mt-8 text-gold-400 text-sm hover:underline'
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='space-y-2'>
                  <label className='modal-label'>Name</label>
                  <input
                    required
                    className='lux-input'
                    placeholder='John Doe'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='modal-label'>Email</label>
                  <input
                    required
                    type='email'
                    className='lux-input'
                    placeholder='john@example.com'
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='modal-label'>
                  Phone Number{' '}
                  <span className='text-gold-100/40'>(Optional)</span>
                </label>
                <input
                  type='tel'
                  className='lux-input'
                  placeholder='+1 (555) 123-4567'
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className='space-y-2'>
                <label className='modal-label'>Subject</label>
                <select
                  className='lux-input'
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                >
                  <option value=''>Select a topic</option>
                  <option value='Buying'>Buying a Property</option>
                  <option value='Renting'>Renting a Property</option>
                  <option value='Selling'>Listing a Property</option>
                  <option value='Other'>Other Inquiry</option>
                </select>
              </div>
              <div className='space-y-2'>
                <label className='modal-label'>Message</label>
                <textarea
                  required
                  className='lux-input min-h-[150px] resize-none'
                  placeholder='How can we help you?'
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <button disabled={loading} className='w-full btn-gold py-4 mt-4'>
                {loading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <span className='flex items-center gap-2'>
                    Send Message <Send size={16} />
                  </span>
                )}
              </button>
            </form>
          )}

          {/* Decor */}
          <div className='absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-gold-400/30 rounded-tr-2xl' />
          <div className='absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-gold-400/30 rounded-bl-2xl' />
        </div>
      </div>
    </section>
  );
}
