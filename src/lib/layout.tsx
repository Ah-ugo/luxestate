/** @format */

import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-obsidian-950 flex'>
      <Sidebar />
      <main className='flex-1 md:ml-64 p-8'>{children}</main>
    </div>
  );
}
