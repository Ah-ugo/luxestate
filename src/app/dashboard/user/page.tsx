/** @format */

'use client';

import { useEffect, useState } from 'react';
import { dashboardApi } from '@/lib/api';
import { Building, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/useAuth';

export default function UserDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      dashboardApi
        .getMyRequests()
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading || authLoading)
    return <div className='text-gold-400 p-8'>Loading dashboard...</div>;

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>
          My Tour Requests
        </h1>
        <p className='text-gold-100/60 font-light'>
          Track the status of your property viewings and inquiries.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className='glass-card p-12 text-center'>
          <p className='text-gold-100/50 mb-4'>
            You haven't requested any tours yet.
          </p>
          <a href='/#listings' className='btn-gold inline-block'>
            Browse Properties
          </a>
        </div>
      ) : (
        <div className='grid gap-4'>
          {requests.map((req: any, i: number) => (
            <div
              key={i}
              className='glass-card p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between'
            >
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-gold-400 text-sm uppercase tracking-widest'>
                  <Building size={14} />
                  <span>{req.listing_title || 'General Inquiry'}</span>
                </div>
                <h3 className='text-xl text-gold-100'>{req.subject}</h3>
                <div className='flex items-center gap-4 text-sm text-gold-100/50'>
                  <span className='flex items-center gap-1'>
                    <MessageSquare size={14} /> {req.message.substring(0, 50)}
                    ...
                  </span>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2'>
                <span className='px-3 py-1 rounded-full bg-gold-400/10 text-gold-400 text-xs border border-gold-400/20'>
                  Received
                </span>
                <span className='text-xs text-gold-100/30'>
                  We will contact you at {req.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
