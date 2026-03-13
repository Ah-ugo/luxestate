/** @format */

import Image from 'next/image';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  imageUrl: string;
}

export default function PageHeader({
  eyebrow,
  title,
  imageUrl,
}: PageHeaderProps) {
  return (
    <div className='relative h-[40vh] min-h-[300px] flex items-center justify-center text-center px-6'>
      <div className='absolute inset-0'>
        <Image src={imageUrl} alt={title} fill className='object-cover' />
        <div className='absolute inset-0 bg-obsidian-950/60' />
      </div>
      <div className='relative z-10'>
        <p className='section-eyebrow mb-4'>{eyebrow}</p>
        <h1 className='section-title'>
          {title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className='text-gold-400 italic'>{title.split(' ').pop()}</span>
        </h1>
      </div>
    </div>
  );
}
