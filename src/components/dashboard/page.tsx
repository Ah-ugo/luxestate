/** @format */

'use client';

import { useEffect, useState } from 'react';
import { dashboardApi, formatPrice } from '@/lib/api';
import { Users, DollarSign, Building, CalendarCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    dashboardApi.getAdminStats().then((res) => setStats(res.data));
  }, []);

  if (!stats)
    return <div className='text-gold-400'>Loading admin panel...</div>;

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='section-title text-3xl text-gold-100'>
          Admin <span className='text-gold-400'>Console</span>
        </h1>
        <div className='flex gap-3'>
          <button className='btn-ghost text-xs px-4 py-2'>
            Manage Listings
          </button>
          <button className='btn-gold text-xs px-4 py-2'>Add Property</button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {[
          {
            label: 'Total Revenue',
            value: formatPrice({ amount: stats.total_revenue }),
            icon: DollarSign,
          },
          { label: 'Total Users', value: stats.total_users, icon: Users },
          {
            label: 'Active Listings',
            value: stats.active_listings,
            icon: Building,
          },
          {
            label: 'Pending Bookings',
            value: stats.pending_bookings,
            icon: CalendarCheck,
          },
        ].map((item, i) => (
          <div key={i} className='glass-card p-6 border-l-2 border-l-gold-400'>
            <div className='flex justify-between items-start mb-2'>
              <p className='text-xs text-gold-400/60 uppercase tracking-widest'>
                {item.label}
              </p>
              <item.icon size={16} className='text-gold-400' />
            </div>
            <p className='text-2xl font-display text-gold-100'>{item.value}</p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='glass-card p-8 h-96'>
          <h3 className='text-lg font-display text-gold-100 mb-6'>
            Revenue Overview
          </h3>
          <div className='h-full flex items-center justify-center text-gold-100/30 text-sm'>
            [Revenue Chart Placeholder]
          </div>
        </div>

        <div className='glass-card p-8 h-96'>
          <h3 className='text-lg font-display text-gold-100 mb-6'>
            Recent Bookings
          </h3>
          <div className='space-y-4'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='h-12 bg-gold-400/5 rounded w-full' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
