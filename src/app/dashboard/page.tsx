/** @format */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirectPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAdmin) {
        router.replace('/dashboard/admin');
      } else if (user) {
        router.replace('/dashboard/user');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isAdmin, loading, router]);

  return (
    <div className='min-h-screen bg-obsidian-950 flex items-center justify-center'>
      <Loader2 className='w-10 h-10 text-gold-400 animate-spin' />
    </div>
  );
}
