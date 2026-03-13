/** @format */

'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { contactApi } from '@/lib/api';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setSent(false);
    try {
      await contactApi.send({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
      setForm({ subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className='text-gold-400 p-8'>Loading Messages...</div>;
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>Messages</h1>
        <p className='text-gold-100/60 font-light'>
          Send a direct inquiry to our concierge team.
        </p>
      </div>

      <div className='max-w-2xl'>
        {sent ? (
          <div className='glass-card p-12 text-center'>
            <CheckCircle2 className='w-12 h-12 text-green-400 mx-auto mb-4' />
            <h3 className='text-xl text-gold-100'>Message Sent</h3>
            <p className='text-gold-100/60 text-sm mt-2 mb-6'>
              Your inquiry has been received. We will respond shortly.
            </p>
            <button
              onClick={() => setSent(false)}
              className='text-gold-400 text-sm hover:underline'
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='glass-card p-8 space-y-6'>
            <div className='space-y-2'>
              <label className='modal-label'>Subject</label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className='lux-input'
                placeholder='e.g., Question about property #12345'
              />
            </div>
            <div className='space-y-2'>
              <label className='modal-label'>Your Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className='lux-input min-h-[200px] resize-none'
                placeholder='Please provide as much detail as possible...'
              />
            </div>
            <button
              disabled={loading}
              className='btn-gold flex items-center gap-2'
            >
              {loading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <Send size={16} />
              )}
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
