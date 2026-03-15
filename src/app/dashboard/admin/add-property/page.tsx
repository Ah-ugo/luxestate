/** @format */

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { listingsApi } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import { Loader2, Save, Upload } from 'lucide-react';

export default function AddPropertyPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    listing_type: 'buy',
    status: 'available',
    price: { amount: 0, currency: 'USD' },
    location: { city: '', address: '', state: '', neighborhood: '' },
    bedrooms: 0,
    bathrooms: 0,
    size_sqm: 0,
    is_featured: false,
    tags: '',
    features: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    // Append form fields
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('listing_type', form.listing_type);
    formData.append('status', form.status);
    formData.append('price_amount', String(form.price.amount));
    formData.append('bedrooms', String(form.bedrooms));
    formData.append('bathrooms', String(form.bathrooms));
    formData.append('size_sqm', String(form.size_sqm));
    formData.append('location_address', form.location.address);
    formData.append('location_city', form.location.city);
    formData.append('location_state', form.location.state);
    formData.append('location_neighborhood', form.location.neighborhood);
    formData.append('is_featured', String(form.is_featured));
    form.tags
      .split(',')
      .forEach((tag) => tag.trim() && formData.append('tags', tag.trim()));
    form.features
      .split(',')
      .forEach(
        (feature) =>
          feature.trim() && formData.append('features', feature.trim()),
      );
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    }
    try {
      await listingsApi.create(formData);
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='modal-label'>Listing Type</label>
            <select
              value={form.listing_type}
              onChange={(e) =>
                setForm({ ...form, listing_type: e.target.value })
              }
              className='lux-input'
            >
              <option value='buy'>For Sale</option>
              <option value='rent'>For Rent</option>
            </select>
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className='lux-input'
            >
              <option value='available'>Available</option>
              <option value='sold'>Sold</option>
              <option value='pending'>Pending</option>
            </select>
          </div>
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
          <div className='space-y-2'>
            <label className='modal-label'>Size (sqm)</label>
            <input
              required
              type='number'
              value={form.size_sqm}
              onChange={(e) =>
                setForm({ ...form, size_sqm: Number(e.target.value) })
              }
              className='lux-input'
            />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='modal-label'>Address</label>
            <input
              required
              value={form.location.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: { ...form.location, address: e.target.value },
                })
              }
              className='lux-input'
            />
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>City</label>
            <input
              required
              value={form.location.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: { ...form.location, city: e.target.value },
                })
              }
              className='lux-input'
            />
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>State</label>
            <input
              required
              value={form.location.state}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: { ...form.location, state: e.target.value },
                })
              }
              className='lux-input'
            />
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>Neighborhood</label>
            <input
              required
              value={form.location.neighborhood}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: { ...form.location, neighborhood: e.target.value },
                })
              }
              className='lux-input'
            />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='modal-label'>Features (comma-separated)</label>
            <input
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className='lux-input'
            />
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>Tags (comma-separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className='lux-input'
            />
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <input
            type='checkbox'
            checked={form.is_featured}
            onChange={(e) =>
              setForm({ ...form, is_featured: e.target.checked })
            }
            className='h-4 w-4 rounded border-gray-300 text-gold-600 focus:ring-gold-500'
          />
          <label className='modal-label'>Featured Property</label>
        </div>
        <div className='space-y-2'>
          <label className='modal-label'>Property Images</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className='lux-input flex items-center justify-center border-dashed h-32 cursor-pointer hover:bg-obsidian-800'
          >
            <input
              type='file'
              multiple
              ref={fileInputRef}
              className='hidden'
              onChange={(e) => setFiles(e.target.files)}
            />
            {files && files.length > 0 ? (
              <p>{files.length} image(s) selected</p>
            ) : (
              <div className='text-center text-gold-100/50'>
                <Upload className='mx-auto mb-2' />
                <p>Click to upload images</p>
              </div>
            )}
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
