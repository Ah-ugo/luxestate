/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authApi.login({
        username: form.email,
        password: form.password,
      });
      localStorage.setItem('lux_token', res.data.access_token);

      // Fetch user role to redirect correctly
      const userRes = await authApi.getMe();
      if (userRes.data.is_superuser) {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-obsidian-950 flex items-center justify-center relative overflow-hidden px-6'>
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center opacity-10" />
      <div className='absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950/50' />

      <div className='relative z-10 w-full max-w-md'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-xs text-gold-400/60 uppercase tracking-widest mb-8 hover:text-gold-400 transition-colors'
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className='glass-card p-10 backdrop-blur-2xl'>
          <div className='text-center mb-10'>
            <h1 className='font-display text-3xl text-gold-100 mb-2'>
              Welcome Back
            </h1>
            <p className='text-gold-100/40 text-sm font-light'>
              Enter your credentials to access your portfolio.
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-5'>
            <div>
              <label className='modal-label'>Email Address</label>
              <input
                required
                type='email'
                className='lux-input bg-obsidian-950/50'
                placeholder='name@example.com'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-[10px] tracking-[3px] uppercase text-gold-400/50'>
                  Password
                </label>
                <a
                  href='/forgot-password'
                  className='text-[10px] text-gold-400/60 hover:text-gold-400 transition-colors'
                >
                  Forgot?
                </a>
              </div>
              <input
                required
                type='password'
                className='lux-input bg-obsidian-950/50'
                placeholder='••••••••'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && (
              <p className='text-red-400 text-sm text-center'>{error}</p>
            )}

            <button disabled={loading} className='btn-gold w-full mt-4'>
              {loading ? <Loader2 className='animate-spin' /> : 'Sign In'}
            </button>
          </form>

          <p className='text-center mt-8 text-xs text-gold-100/30'>
            Don't have an account?{' '}
            <Link href='/register' className='text-gold-400 hover:underline'>
              Apply for membership
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
