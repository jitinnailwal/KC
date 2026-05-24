'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

interface SeoPageSummary {
  id: string;
  slug: string;
  pageLabel: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
  updatedBy: string;
}

function encodeSlug(slug: string): string {
  if (slug === '/') return 'home';
  return slug.slice(1).replace(/\//g, '__');
}

export default function AdminSeoList() {
  const [pages, setPages] = useState<SeoPageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/seo')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPages(data);
        else setError('Failed to load pages');
      })
      .catch(() => setError('Failed to load pages'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout
      title={<>SEO <span className="text-accent-blue">Manager</span></>}
    >
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-700/40 text-left text-light-300/50 text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Page</th>
                <th className="pb-3 pr-4">Slug</th>
                <th className="pb-3 pr-4">Meta Title</th>
                <th className="pb-3 pr-4">Meta Description</th>
                <th className="pb-3 pr-4">Updated</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-dark-700/20 hover:bg-dark-800/30 transition-colors">
                  <td className="py-3 pr-4 font-medium text-light">{page.pageLabel}</td>
                  <td className="py-3 pr-4 text-light-300/50 font-mono text-xs">{page.slug}</td>
                  <td className="py-3 pr-4 max-w-[200px] truncate">
                    {page.metaTitle ? (
                      <span className="text-light-300/70">{page.metaTitle}</span>
                    ) : (
                      <span className="text-red-400 text-xs font-medium">Missing</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 max-w-[200px] truncate">
                    {page.metaDescription ? (
                      <span className="text-light-300/50">{page.metaDescription}</span>
                    ) : (
                      <span className="text-red-400 text-xs font-medium">Missing</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-light-300/40 text-xs whitespace-nowrap">
                    {page.updatedAt
                      ? new Date(page.updatedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/seo/${encodeSlug(page.slug)}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pages.length === 0 && (
            <div className="text-center py-16 text-light-300/40">
              No SEO pages found. Run the seed script first.
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
