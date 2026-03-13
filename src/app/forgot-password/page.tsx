/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      // We still show success to prevent email enumeration
      setSent(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-obsidian-950 flex items-center justify-center relative overflow-hidden px-6'>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center opacity-10" />
      <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950/50' />

      <div className='relative z-10 w-full max-w-md'>
        <Link
          href='/login'
          className='inline-flex items-center gap-2 text-xs text-gold-400/60 uppercase tracking-widest mb-8 hover:text-gold-400 transition-colors'
        >
          <ArrowLeft size={14} /> Back to Login
        </Link>

        <div className='glass-card p-10 backdrop-blur-2xl'>
          {sent ? (
            <div className='text-center py-10'>
              <div className='w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-400'>
                <CheckCircle2 size={32} />
              </div>
              <h3 className='text-xl text-gold-100 mb-2'>Check Your Email</h3>
              <p className='text-gold-100/60 text-sm'>
                If an account with that email exists, we've sent a password
                reset link to it.
              </p>
            </div>
          ) : (
            <>
              <div className='text-center mb-10'>
                <h1 className='font-display text-3xl text-gold-100 mb-2'>
                  Forgot Password?
                </h1>
                <p className='text-gold-100/40 text-sm font-light'>
                  Enter your email to receive a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label className='modal-label'>Email Address</label>
                  <input
                    required
                    type='email'
                    className='lux-input bg-obsidian-950/50'
                    placeholder='name@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button disabled={loading} className='btn-gold w-full mt-4'>
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
