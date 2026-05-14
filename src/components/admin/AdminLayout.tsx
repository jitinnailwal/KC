'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import AdminAuthGuard from './AdminAuthGuard';

const navItems = [
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Reviews', href: '/admin/reviews' },
  { label: 'Case Studies', href: '/admin/case-studies' },
];

interface AdminLayoutProps {
  title: ReactNode;
  accentClass?: string;
  actionButton?: ReactNode;
  children: ReactNode;
}

export default function AdminLayout({ title, actionButton, children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <AdminAuthGuard>
    <div className="min-h-screen bg-dark text-light">
      <header className="border-b border-dark-700/40 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
            <Link
              href="/"
              className="text-light-300/60 hover:text-light transition-colors text-sm whitespace-nowrap"
            >
              &larr; Site
            </Link>
            <div className="w-px h-5 bg-dark-700/40" />
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-light font-medium'
                      : 'text-light-300/60 hover:text-light'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="w-px h-5 bg-dark-700/40" />
            <h1 className="font-heading font-bold text-lg sm:text-xl whitespace-nowrap">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            {actionButton}
            <button
              onClick={handleLogout}
              className="text-xs text-light-300/40 hover:text-red-400 transition-colors whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </div>
    </div>
    </AdminAuthGuard>
  );
}
