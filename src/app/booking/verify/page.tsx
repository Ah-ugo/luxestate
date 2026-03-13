/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { bookingApi } from '@/lib/api';
import { Loader2, CheckCircle2, XCircle, Download, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function VerifyBookingPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!reference) {
      setStatus('error');
      return;
    }

    bookingApi
      .verify(reference)
      .then((res) => {
        setData(res.data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [reference]);

  return (
    <main className='min-h-screen bg-obsidian-950 flex flex-col'>
      <Navbar />
      <div className='flex-1 flex items-center justify-center p-6'>
        <div className='glass-card max-w-lg w-full p-10 text-center relative overflow-hidden'>
          {status === 'loading' && (
            <div className='py-10'>
              <Loader2 className='w-12 h-12 text-gold-400 animate-spin mx-auto mb-4' />
              <h2 className='text-xl text-gold-100 font-display'>
                Verifying Payment...
              </h2>
              <p className='text-gold-100/50 text-sm mt-2'>
                Please wait while we confirm your transaction.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className='py-6'>
              <div className='w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/20'>
                <CheckCircle2 size={40} />
              </div>
              <h1 className='text-3xl font-display text-gold-100 mb-2'>
                Booking Confirmed
              </h1>
              <p className='text-gold-100/60 mb-8'>
                Thank you. Your private tour has been scheduled.
              </p>

              <div className='bg-obsidian-900 border border-gold-400/10 rounded-xl p-4 mb-8 text-left space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gold-400/50'>Reference</span>{' '}
                  <span className='text-gold-100 font-mono'>{reference}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gold-400/50'>Amount Paid</span>{' '}
                  <span className='text-gold-100'>$100.00</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gold-400/50'>Email sent to</span>{' '}
                  <span className='text-gold-100'>{data?.email}</span>
                </div>
              </div>

              <div className='space-y-3'>
                <a
                  href={data?.form_url || '#'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-gold w-full flex items-center justify-center gap-2'
                >
                  <Download size={18} /> Download Tour Pass
                </a>
                <Link
                  href='/dashboard/user'
                  className='btn-ghost w-full flex items-center justify-center gap-2'
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className='py-10'>
              <XCircle className='w-16 h-16 text-red-400 mx-auto mb-4 opacity-80' />
              <h2 className='text-2xl text-gold-100 font-display mb-2'>
                Verification Failed
              </h2>
              <p className='text-gold-100/50 text-sm mb-8'>
                We couldn't verify your payment. Please contact support if you
                believe this is an error.
              </p>
              <Link
                href='/'
                className='btn-ghost w-full flex items-center justify-center gap-2'
              >
                <Home size={16} /> Return Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
