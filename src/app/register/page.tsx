/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authApi.register({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });
      router.push('/login');
    } catch (err: any) {
      setError(
        err.response?.data?.detail || 'Registration failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-obsidian-950 flex items-center justify-center relative overflow-hidden px-6'>
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2071')] bg-cover bg-center opacity-10" />
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
              Membership Application
            </h1>
            <p className='text-gold-100/40 text-sm font-light'>
              Join our exclusive network of investors.
            </p>
          </div>

          <form onSubmit={handleRegister} className='space-y-5'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='modal-label'>First Name</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className='lux-input bg-obsidian-950/50'
                  placeholder='John'
                />
              </div>
              <div>
                <label className='modal-label'>Last Name</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className='lux-input bg-obsidian-950/50'
                  placeholder='Doe'
                />
              </div>
            </div>
            <div>
              <label className='modal-label'>Email Address</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type='email'
                className='lux-input bg-obsidian-950/50'
                placeholder='name@example.com'
              />
            </div>
            <div>
              <label className='modal-label'>Password</label>
              <input
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type='password'
                className='lux-input bg-obsidian-950/50'
                placeholder='Create a password'
              />
            </div>

            {error && (
              <p className='text-red-400 text-sm text-center'>{error}</p>
            )}

            <button disabled={loading} className='btn-gold w-full mt-4'>
              {loading ? <Loader2 className='animate-spin' /> : 'Apply Now'}
            </button>
          </form>

          <p className='text-center mt-8 text-xs text-gold-100/30'>
            Already a member?{' '}
            <Link href='/login' className='text-gold-400 hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
