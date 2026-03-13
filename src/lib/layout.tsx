/** @format */

import Sidebar from '@/components/dashboard/Sidebar';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-obsidian-950 flex'>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className='flex-1 md:ml-64 p-8'>{children}</main>
    </div>
  );
}
