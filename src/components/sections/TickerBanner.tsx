/** @format */

export default function TickerBanner() {
  const items = [
    'New Listing: Hudson Yards Signature Tower',
    'Market Update: ROI in Tribeca up by 12%',
    'Just Sold: Star Island Villa',
    'Featured: The Manhattan Collection',
    'Coming Soon: Beverly Hills Heights II',
  ];

  return (
    <div className='bg-gold-400 text-obsidian-950 py-3 overflow-hidden border-y border-gold-500 relative z-20'>
      <div className='flex gap-12 animate-ticker whitespace-nowrap min-w-full'>
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className='flex items-center gap-4 text-xs font-bold tracking-[2px] uppercase'
          >
            <span className='w-1.5 h-1.5 bg-obsidian-950 rotate-45' />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
