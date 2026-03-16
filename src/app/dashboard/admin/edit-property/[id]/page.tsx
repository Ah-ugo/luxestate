/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { listingsApi } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import { Loader2, Save, Upload, Trash2, X } from 'lucide-react';
import Image from 'next/image';

const initialFormState = {
  title: '',
  description: '',
  listing_type: 'buy',
  price: { amount: 0, currency: 'USD' },
  location: { city: '', address: '' },
  bedrooms: 0,
  bathrooms: 0,
  size_sqm: 0,
  images: [],
};

export default function EditPropertyPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialFormState);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      listingsApi
        .get(id as string)
        .then((res) => {
          setForm(res.data);
          setPageLoading(false);
        })
        .catch((err) => {
          setError('Could not load listing data.');
          setPageLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await listingsApi.update(id as string, form);
      router.push('/dashboard/admin/manage-listings');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update listing.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddImages = async () => {
    if (!newFiles || newFiles.length === 0) return;
    setLoading(true);
    const formData = new FormData();
    Array.from(newFiles).forEach((file) => {
      formData.append('files', file);
    });
    try {
      const res = await listingsApi.addImages(id as string, formData);
      setForm(res.data);
      setNewFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to upload new images.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (publicId: string) => {
    if (!publicId) {
      setError('Cannot delete image without a public ID.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const res = await listingsApi.deleteImage(id as string, publicId);
        setForm(res.data);
      } catch (err) {
        setError('Failed to delete image.');
      }
    }
  };

  if (authLoading || pageLoading) {
    return <div className='text-gold-400 p-8'>Loading...</div>;
  }

  if (!isAdmin) {
    return <div className='text-gold-400 p-8'>Access Denied.</div>;
  }

  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-display text-gold-100'>Edit Property</h1>
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

        {/* Image Management */}
        <div className='space-y-4 pt-6 border-t border-gold-400/10'>
          <h3 className='text-lg font-display text-gold-100'>Manage Images</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {form.images &&
              form.images.map(
                (
                  image: { url: string; alt: string; public_id: string },
                  index: number,
                ) => (
                  <div key={index} className='relative group'>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={200}
                      height={200}
                      className='rounded-lg object-cover w-full h-32'
                    />
                    <button
                      type='button'
                      onClick={() => handleDeleteImage(image.public_id)}
                      className='absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ),
              )}
          </div>
          <div className='flex items-end gap-4'>
            <div className='space-y-2 flex-1'>
              <label className='modal-label'>Add New Images</label>
              <input
                type='file'
                multiple
                ref={fileInputRef}
                onChange={(e) => setNewFiles(e.target.files)}
                className='lux-input'
              />
            </div>
            <button
              type='button'
              onClick={handleAddImages}
              disabled={loading || !newFiles}
              className='btn-ghost flex items-center gap-2'
            >
              <Upload size={16} />
              Upload
            </button>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
