/** @format */

'use client';

import { useEffect, useState } from 'react';
import { dashboardApi, formatPrice } from '@/lib/api';
import { TrendingUp, Calendar, CreditCard, Activity } from 'lucide-react';

export default function UserDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    dashboardApi.getUserStats().then((res) => setData(res.data));
  }, []);

  if (!data) return <div className='text-gold-400'>Loading dashboard...</div>;

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='section-title text-3xl'>
          Welcome back, <span className='text-gold-400'>Alexander</span>
        </h1>
        <p className='text-gold-100/60 font-light mt-2'>
          Here is your portfolio overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[
          {
            label: 'Total Invested',
            value: formatPrice({ amount: data.total_invested }),
            icon: TrendingUp,
          },
          {
            label: 'Active Properties',
            value: data.active_properties,
            icon: Activity,
          },
          { label: 'Pending Tours', value: data.pending_tours, icon: Calendar },
          {
            label: 'Next Payment',
            value: data.next_payment_due,
            icon: CreditCard,
          },
        ].map((stat, i) => (
          <div key={i} className='glass-card p-6'>
            <div className='flex justify-between items-start mb-4'>
              <div className='w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-400'>
                <stat.icon size={20} />
              </div>
              <span className='text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full'>
                +2.4%
              </span>
            </div>
            <p className='text-gold-100/50 text-xs uppercase tracking-wider mb-1'>
              {stat.label}
            </p>
            <p className='text-2xl font-display text-gold-100'>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className='glass-card p-8'>
        <h2 className='font-display text-xl text-gold-100 mb-6'>
          Recent Activity
        </h2>
        <div className='space-y-4'>
          {data.recent_activity.map((item: any) => (
            <div
              key={item.id}
              className='flex items-center justify-between p-4 border border-gold-400/10 rounded-lg hover:bg-gold-400/5 transition-colors'
            >
              <div className='flex items-center gap-4'>
                <div
                  className={`w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-400' : 'bg-gold-400'}`}
                />
                <div>
                  <p className='text-gold-100 text-sm font-medium'>
                    {item.title}
                  </p>
                  <p className='text-gold-100/40 text-xs'>{item.date}</p>
                </div>
              </div>
              <div className='text-right'>
                {item.amount && (
                  <p className='text-gold-100 text-sm'>
                    {formatPrice({ amount: item.amount })}
                  </p>
                )}
                <p className='text-[10px] uppercase tracking-wider text-gold-400/70'>
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
