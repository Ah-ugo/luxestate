/** @format */

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ password: '', confirmPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authApi.resetPassword({ token, password: form.password });
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          'An error occurred. The link may be invalid or expired.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-obsidian-950 flex items-center justify-center relative overflow-hidden px-6'>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center opacity-10" />
      <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950/50' />

      <div className='relative z-10 w-full max-w-md'>
        <div className='glass-card p-10 backdrop-blur-2xl'>
          {success ? (
            <div className='text-center py-10'>
              <div className='w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-400'>
                <CheckCircle2 size={32} />
              </div>
              <h3 className='text-xl text-gold-100 mb-2'>Password Reset</h3>
              <p className='text-gold-100/60 text-sm mb-6'>
                Your password has been successfully updated.
              </p>
              <Link href='/login' className='btn-gold w-full'>
                Return to Login
              </Link>
            </div>
          ) : (
            <>
              <div className='text-center mb-10'>
                <h1 className='font-display text-3xl text-gold-100 mb-2'>
                  Set New Password
                </h1>
                <p className='text-gold-100/40 text-sm font-light'>
                  Create a new secure password for your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label className='modal-label'>New Password</label>
                  <input
                    required
                    type='password'
                    className='lux-input bg-obsidian-950/50'
                    placeholder='••••••••'
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className='modal-label'>Confirm New Password</label>
                  <input
                    required
                    type='password'
                    className='lux-input bg-obsidian-950/50'
                    placeholder='••••••••'
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                </div>

                {error && (
                  <p className='text-center text-sm text-red-400'>{error}</p>
                )}

                <button disabled={loading} className='btn-gold w-full mt-4'>
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    'Reset Password'
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
