'use client';

import { useEffect, useState, useCallback } from 'react';
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

type FilterType = 'all' | 'static' | 'blog' | 'case-study';

function encodeSlug(slug: string): string {
  if (slug === '/') return 'home';
  return slug.slice(1).replace(/\//g, '__');
}

const FILTER_LABELS: Record<FilterType, string> = {
  all: 'All',
  static: 'Static Pages',
  blog: 'Blogs',
  'case-study': 'Case Studies',
};

export default function AdminSeoList() {
  const [pages, setPages] = useState<SeoPageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      if (Array.isArray(data)) setPages(data);
      else setError('Failed to load pages');
    } catch {
      setError('Failed to load pages');
    }
  }, []);

  useEffect(() => {
    // Auto-sync content on load, then fetch pages
    const init = async () => {
      try {
        await fetch('/api/seo/sync', { method: 'POST' });
      } catch { /* ignore sync errors */ }
      await fetchPages();
      setLoading(false);
    };
    init();
  }, [fetchPages]);

  const syncPages = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const res = await fetch('/api/seo/sync', { method: 'POST' });
      const data = await res.json();
      if (data.created > 0) {
        setSyncMessage(`Synced ${data.created} new page${data.created > 1 ? 's' : ''}`);
        await fetchPages();
      } else {
        setSyncMessage('All pages already synced');
      }
      setTimeout(() => setSyncMessage(''), 3000);
    } catch {
      setSyncMessage('Sync failed');
    }
    setSyncing(false);
  };

  const filteredPages = pages.filter((p) => {
    if (filter === 'blog') return p.slug.startsWith('/blog/');
    if (filter === 'case-study') return p.slug.startsWith('/case-studies/');
    if (filter === 'static') return !p.slug.startsWith('/blog/') && !p.slug.startsWith('/case-studies/');
    return true;
  });

  const getCounts = () => ({
    all: pages.length,
    static: pages.filter((p) => !p.slug.startsWith('/blog/') && !p.slug.startsWith('/case-studies/')).length,
    blog: pages.filter((p) => p.slug.startsWith('/blog/')).length,
    'case-study': pages.filter((p) => p.slug.startsWith('/case-studies/')).length,
  });

  const counts = getCounts();

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
        <div>
          {/* Filter tabs and sync button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(FILTER_LABELS) as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === f
                      ? 'bg-accent-blue/20 text-accent-blue'
                      : 'bg-dark-800/50 text-light-300/50 hover:text-light-300/70'
                  }`}
                >
                  {FILTER_LABELS[f]}
                  <span className="ml-1.5 text-light-300/30">{counts[f]}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {syncMessage && (
                <span className="text-xs text-emerald-400">{syncMessage}</span>
              )}
              <button
                onClick={syncPages}
                disabled={syncing}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {syncing && (
                  <div className="w-3 h-3 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
                )}
                {syncing ? 'Syncing...' : 'Sync Content'}
              </button>
            </div>
          </div>

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
                {filteredPages.map((page) => (
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
            {filteredPages.length === 0 && (
              <div className="text-center py-16 text-light-300/40">
                {filter === 'all'
                  ? 'No SEO pages found. Click "Sync Content" to populate.'
                  : `No ${FILTER_LABELS[filter].toLowerCase()} found.`}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
