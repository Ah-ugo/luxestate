/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { chatApi } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function AdminMessagesPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!isAdmin) {
      router.push('/dashboard/user');
      return;
    }

    // If we reach here, user is an admin
    chatApi
      .getConversations()
      .then((res) => setConversations(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isAdmin, authLoading, router]);

  if (authLoading || loading) {
    return <div className='text-gold-400 p-8'>Loading Conversations...</div>;
  }

  return (
    <div className='space-y-8'>
      <h1 className='text-3xl font-display text-gold-100'>
        User Conversations
      </h1>
      <div className='glass-card p-8'>
        {conversations.length === 0 ? (
          <p className='text-gold-100/50'>No user conversations found.</p>
        ) : (
          <div className='space-y-2'>
            {conversations.map((email) => (
              <Link
                key={email}
                href={`/dashboard/admin/messages/${email}`}
                className='block p-4 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 border border-gold-400/10'
              >
                <div className='flex items-center gap-3'>
                  <User className='text-gold-400' />
                  <span className='text-gold-100'>{email}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
