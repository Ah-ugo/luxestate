/** @format */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, Loader2 } from 'lucide-react';
import { contactApi } from '@/lib/api';

interface BookingModalProps {
  listing: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  listing,
  isOpen,
  onClose,
}: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.send({
        ...form,
        subject: `Tour Request: ${listing.title}`,
        listing_id: listing._id || listing.id,
        listing_title: listing.title,
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm'
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className='relative w-full max-w-lg bg-obsidian-900 border border-gold-400/20 rounded-2xl shadow-2xl overflow-hidden'
      >
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gold-100/50 hover:text-gold-400'
        >
          <X size={24} />
        </button>

        <div className='p-8'>
          <h2 className='font-display text-2xl text-gold-100 mb-2'>
            Request a Private Tour
          </h2>
          <p className='text-sm text-gold-100/60 mb-6'>{listing.title}</p>

          {success ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-400'>
                <CheckCircle2 size={32} />
              </div>
              <h3 className='text-xl text-gold-100 mb-2'>Request Received</h3>
              <p className='text-gold-100/60 text-sm'>
                Our concierge team will contact you shortly to confirm your
                appointment.
              </p>
              <button onClick={onClose} className='btn-gold w-full mt-8'>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='modal-label'>Full Name</label>
                  <input
                    required
                    className='lux-input'
                    placeholder='James Smith'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='modal-label'>Phone</label>
                  <input
                    required
                    type='tel'
                    className='lux-input'
                    placeholder='+1 (555) 000-0000'
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='modal-label'>Email Address</label>
                <input
                  required
                  type='email'
                  className='lux-input'
                  placeholder='james@example.com'
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className='space-y-2'>
                <label className='modal-label'>Preferred Date / Message</label>
                <textarea
                  className='lux-input min-h-[100px] resize-none'
                  placeholder="I'm interested in viewing this property next Tuesday afternoon..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <button
                disabled={loading}
                className='btn-gold w-full mt-2 flex items-center justify-center gap-2'
              >
                {loading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <Calendar size={18} />
                )}
                Submit Request
              </button>
              <p className='text-xs text-center text-gold-100/30 mt-4'>
                No payment required. An agent will confirm availability.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
