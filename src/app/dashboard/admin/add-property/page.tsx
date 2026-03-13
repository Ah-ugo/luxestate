/** @format */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { listingsApi } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import { Loader2, Save } from 'lucide-react';

export default function AddPropertyPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    listing_type: 'buy',
    price: { amount: 0, currency: 'USD' },
    location: { city: '', address: '' },
    bedrooms: 0,
    bathrooms: 0,
    size_sqm: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await listingsApi.create(form);
      router.push('/dashboard/admin/manage-listings');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create listing.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !isAdmin) {
    return <div className='text-gold-400 p-8'>Access Denied.</div>;
  }

  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-display text-gold-100'>Add New Property</h1>
      <form
        onSubmit={handleSubmit}
        className='glass-card p-8 space-y-6 max-w-4xl'
      >
        <div className='space-y-2'>
          <label className='modal-label'>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className='lux-input'
          />
        </div>
        <div className='space-y-2'>
          <label className='modal-label'>Description</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className='lux-input min-h-[120px]'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='space-y-2'>
            <label className='modal-label'>Price (USD)</label>
            <input
              required
              type='number'
              value={form.price.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: { ...form.price, amount: Number(e.target.value) },
                })
              }
              className='lux-input'
            />
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>Bedrooms</label>
            <input
              required
              type='number'
              value={form.bedrooms}
              onChange={(e) =>
                setForm({ ...form, bedrooms: Number(e.target.value) })
              }
              className='lux-input'
            />
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>Bathrooms</label>
            <input
              required
              type='number'
              value={form.bathrooms}
              onChange={(e) =>
                setForm({ ...form, bathrooms: Number(e.target.value) })
              }
              className='lux-input'
            />
          </div>
        </div>
        {error && <p className='text-red-400 text-sm'>{error}</p>}
        <div className='pt-6 border-t border-gold-400/10'>
          <button
            disabled={loading}
            className='btn-gold flex items-center gap-2'
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <Save size={16} />
            )}
            Create Property
          </button>
        </div>
      </form>
    </div>
  );
}
