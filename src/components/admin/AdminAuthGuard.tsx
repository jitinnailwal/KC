'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => {
        if (res.ok) {
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        setStatus('unauthenticated');
        router.replace('/admin/login');
      });
  }, [router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}
