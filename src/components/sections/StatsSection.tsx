/** @format */

'use client';

export default function StatsSection({ stats }: { stats: any }) {
  const statItems = [
    { label: 'Active Listings', value: stats?.total_listings || 120 },
    { label: 'Total Value (USD)', value: stats?.total_value || '$250M+' },
    { label: 'Premium Locations', value: '12' },
    { label: 'Happy Investors', value: stats?.happy_clients || '450+' },
  ];

  return (
    <section className='py-20 border-b border-gold-400/10'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
        {statItems.map((item, i) => (
          <div key={i} className='group'>
            <div className='font-display text-4xl md:text-5xl text-gold-100 mb-2 group-hover:text-gold-400 transition-colors'>
              {item.value}
            </div>
            <div className='text-xs uppercase tracking-widest text-gold-400/50'>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
