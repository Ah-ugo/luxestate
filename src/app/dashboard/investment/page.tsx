/** @format */

'use client';

import { useEffect, useState } from 'react';
import { dashboardApi, formatPrice } from '@/lib/api';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAuth } from '@/lib/useAuth';

export default function InvestmentPage() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      dashboardApi
        .getInvestments()
        .then((res) => setInvestments(res.data))
        .finally(() => setLoading(false));
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (loading || authLoading) {
    return <div className='text-gold-400 p-8'>Loading Investments...</div>;
  }

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp className='text-green-400' />;
    if (trend === 'down') return <TrendingDown className='text-red-400' />;
    return <Minus className='text-gold-100/50' />;
  };

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>
          Investment Portfolio
        </h1>
        <p className='text-gold-100/60 font-light'>
          Monitor your real estate assets and returns.
        </p>
      </div>

      <div className='glass-card overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead className='text-xs text-gold-400/60 uppercase bg-gold-400/5'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Property
              </th>
              <th scope='col' className='px-6 py-3'>
                Shares
              </th>
              <th scope='col' className='px-6 py-3'>
                Current Value
              </th>
              <th scope='col' className='px-6 py-3'>
                Annual ROI
              </th>
              <th scope='col' className='px-6 py-3'>
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {investments.map((item) => (
              <tr
                key={item.id}
                className='border-b border-gold-400/10 hover:bg-gold-400/5'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gold-100 whitespace-nowrap'
                >
                  {item.property}
                </th>
                <td className='px-6 py-4 text-gold-100/70'>{item.shares}</td>
                <td className='px-6 py-4 text-gold-100/70'>
                  {formatPrice({ amount: item.value })}
                </td>
                <td className='px-6 py-4 text-gold-100/70'>{item.roi}%</td>
                <td className='px-6 py-4'>
                  <TrendIcon trend={item.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
