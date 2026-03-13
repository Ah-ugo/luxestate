/** @format */

'use client';

import { Building } from 'lucide-react';

export default function PropertiesPage() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>
          My Properties
        </h1>
        <p className='text-gold-100/60 font-light'>
          Manage your owned and rented residences.
        </p>
      </div>

      <div className='glass-card p-12 text-center flex flex-col items-center'>
        <Building className='w-12 h-12 text-gold-400/30 mb-4' />
        <p className='text-gold-100/50 mb-4'>
          You do not have any properties managed through LuxEstate yet.
        </p>
      </div>
    </div>
  );
}
