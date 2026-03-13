/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dashboardApi, listingsApi } from '@/lib/api';
import { Mail, Building, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/useAuth';

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [listingStats, setListingStats] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard/user');
    }

    if (isAdmin) {
      Promise.all([
        dashboardApi.getAdminStats(),
        listingsApi.getStats(),
        dashboardApi.getAdminMessages(),
      ])
        .then(([statsRes, listingStatsRes, messagesRes]) => {
          setStats(statsRes.data);
          setListingStats(listingStatsRes.data);
          setMessages(messagesRes.data);
        })
        .catch((err) => console.error('Failed to fetch admin data', err))
        .finally(() => setLoading(false));
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading || loading || !isAdmin) {
    return <div className='text-gold-400 p-8'>Loading Admin Console...</div>;
  }

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

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='glass-card p-6 border-l-2 border-l-gold-400'>
          <div className='flex justify-between items-start mb-2'>
            <p className='text-xs text-gold-400/60 uppercase tracking-widest'>
              Total Inquiries
            </p>
            <Mail size={16} className='text-gold-400' />
          </div>
          <p className='text-2xl font-display text-gold-100'>
            {stats.total_messages || 0}
          </p>
        </div>
        <div className='glass-card p-6 border-l-2 border-l-gold-400'>
          <div className='flex justify-between items-start mb-2'>
            <p className='text-xs text-gold-400/60 uppercase tracking-widest'>
              Total Properties
            </p>
            <Building size={16} className='text-gold-400' />
          </div>
          <p className='text-2xl font-display text-gold-100'>
            {listingStats.total_listings || 0}
          </p>
        </div>
      </div>

      <div className='glass-card p-8'>
        <h3 className='text-lg font-display text-gold-100 mb-6'>
          Recent Inquiries
        </h3>
        <div className='space-y-4'>
          {messages.length === 0 ? (
            <p className='text-gold-100/40'>No messages found.</p>
          ) : (
            messages.slice(0, 5).map((msg, i) => (
              <div
                key={i}
                className='p-4 bg-obsidian-950/50 rounded border border-gold-400/10 flex justify-between items-center'
              >
                <div>
                  <p className='text-gold-100 font-medium'>{msg.subject}</p>
                  <p className='text-sm text-gold-100/60'>
                    {msg.name} ({msg.email})
                  </p>
                  <p className='text-xs text-gold-100/40 mt-1'>{msg.message}</p>
                </div>
                <div className='text-gold-400'>
                  <MessageSquare size={16} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
