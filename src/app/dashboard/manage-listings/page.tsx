/** @format */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { listingsApi, formatPrice } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

export default function ManageListingsPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await listingsApi.getAll({ limit: 100 }); // Fetch all for admin
      setListings(res.data.listings);
    } catch (error) {
      console.error('Failed to fetch listings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard/user');
    }
    if (isAdmin) {
      fetchListings();
    }
  }, [isAdmin, authLoading, router]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsApi.delete(id);
        fetchListings(); // Refresh list
      } catch (error) {
        console.error('Failed to delete listing', error);
        alert('Could not delete listing.');
      }
    }
  };

  if (authLoading || loading) {
    return <div className='text-gold-400 p-8'>Loading Listings...</div>;
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-display text-gold-100'>
          Manage Properties
        </h1>
        <Link
          href='/dashboard/admin/add-property'
          className='btn-gold text-xs px-4 py-2 flex items-center gap-2'
        >
          <Plus size={16} /> Add New
        </Link>
      </div>

      <div className='glass-card overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead className='text-xs text-gold-400/60 uppercase bg-gold-400/5'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Type
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Location
              </th>
              <th scope='col' className='px-6 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr
                key={item._id}
                className='border-b border-gold-400/10 hover:bg-gold-400/5'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gold-100 whitespace-nowrap'
                >
                  {item.title}
                </th>
                <td className='px-6 py-4 text-gold-100/70 capitalize'>
                  {item.listing_type}
                </td>
                <td className='px-6 py-4 text-gold-100/70'>
                  {formatPrice(item.price)}
                </td>
                <td className='px-6 py-4 text-gold-100/70'>
                  {item.location.city}
                </td>
                <td className='px-6 py-4 flex gap-4'>
                  <Link
                    href={`/dashboard/admin/edit-property/${item._id}`}
                    className='text-blue-400 hover:text-blue-300'
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='text-red-400 hover:text-red-300'
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
