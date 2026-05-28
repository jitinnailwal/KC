'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { uploadImage } from '@/lib/client-upload';
import { getErrorMessage } from '@/lib/fetch-json';

interface SeoData {
  slug: string;
  pageLabel: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  structuredData: string;
  focusKeyword: string;
  updatedAt: string;
  updatedBy: string;
}

const BASE_URL = 'https://kreativecatalyst.in';

function charColor(len: number, warn: number, danger: number): string {
  if (len <= warn) return 'text-emerald-400';
  if (len <= danger) return 'text-orange-400';
  return 'text-red-400';
}

export default function AdminSeoEditor() {
  const params = useParams();
  const router = useRouter();
  const encodedSlug = params.encodedSlug as string;

  const [data, setData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [fatalError, setFatalError] = useState('');
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    fetch(`/api/seo/${encodedSlug}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then((d) => setData(d))
      .catch(() => setFatalError('Page not found'))
      .finally(() => setLoading(false));
  }, [encodedSlug]);

  const update = useCallback(
    (field: keyof SeoData, value: string | boolean) => {
      setData((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    []
  );

  const validateJson = useCallback((val: string) => {
    if (!val.trim()) {
      setJsonError('');
      return;
    }
    try {
      JSON.parse(val);
      setJsonError('');
    } catch {
      setJsonError('Invalid JSON');
    }
  }, []);

  const handleSave = async () => {
    if (!data || jsonError) return;
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const res = await fetch(`/api/seo/${encodedSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, updatedBy: 'admin' }),
      });
      if (!res.ok) throw new Error('Failed');
      const updated = await res.json();
      setData(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    try {
      const uploaded = await uploadImage(file, 'seo');
      update('ogImage', uploaded.url);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploadingImage(false);
      input.value = '';
    }
  };

  if (loading) {
    return (
      <AdminLayout title="SEO Editor">
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (fatalError || !data) {
    return (
      <AdminLayout title="SEO Editor">
        <div className="text-center py-20 text-red-400">{fatalError || 'Page not found'}</div>
      </AdminLayout>
    );
  }

  const displayTitle = data.metaTitle || data.pageLabel || 'Untitled';
  const displayDesc = data.metaDescription || 'No description set';
  const displayUrl = data.canonicalUrl || `${BASE_URL}${data.slug === '/' ? '' : data.slug}`;
  const ogDisplayTitle = data.ogTitle || data.metaTitle || data.pageLabel;
  const ogDisplayDesc = data.ogDescription || data.metaDescription || '';

  return (
    <AdminLayout
      title={<>SEO — <span className="text-accent-blue">{data.pageLabel}</span></>}
      actionButton={
        <button
          onClick={() => router.push('/admin/seo')}
          className="text-xs text-light-300/50 hover:text-light transition-colors"
        >
          &larr; All Pages
        </button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Google SERP Preview */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-light-300/40 mb-3 font-medium">Google Preview</h3>
          <div className="glass rounded-xl p-5 space-y-1">
            <div className="text-[#8ab4f8] text-lg leading-snug truncate">{displayTitle}</div>
            <div className="text-[#bdc1c6] text-xs truncate">{displayUrl}</div>
            <div className="text-[#9aa0a6] text-sm leading-relaxed line-clamp-2">{displayDesc}</div>
          </div>
        </div>

        {/* OG / Twitter Card Preview */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-light-300/40 mb-3 font-medium">Social Card Preview</h3>
          <div className="glass rounded-xl overflow-hidden max-w-md">
            {data.ogImage && (
              <div className="h-40 bg-dark-800 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.ogImage} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 space-y-1">
              <div className="text-xs text-light-300/40 uppercase">{new URL(displayUrl).hostname}</div>
              <div className="text-sm font-medium text-light truncate">{ogDisplayTitle}</div>
              <div className="text-xs text-light-300/50 line-clamp-2">{ogDisplayDesc}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Slug */}
          <div>
            <label className="block text-xs text-light-300/50 uppercase tracking-wider mb-2">Page Slug</label>
            <input
              type="text"
              value={data.slug}
              readOnly
              className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/30 text-sm text-light-300/50 font-mono cursor-not-allowed"
            />
            <p className="text-xs text-light-300/30 mt-1">The slug is derived from the page URL and cannot be edited here.</p>
          </div>

          {/* Focus Keyword */}
          <div>
            <label className="block text-xs text-light-300/50 uppercase tracking-wider mb-2">Focus Keyword</label>
            <input
              type="text"
              value={data.focusKeyword}
              onChange={(e) => update('focusKeyword', e.target.value)}
              placeholder="e.g. digital marketing agency"
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
            />
          </div>

          {/* Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-light-300/50 uppercase tracking-wider">Meta Title</label>
              <span className={`text-xs ${charColor(data.metaTitle.length, 60, 70)}`}>
                {data.metaTitle.length}/70
              </span>
            </div>
            <input
              type="text"
              value={data.metaTitle}
              onChange={(e) => update('metaTitle', e.target.value)}
              placeholder="Page Title | Kreative Catalyst"
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-light-300/50 uppercase tracking-wider">Meta Description</label>
              <span className={`text-xs ${charColor(data.metaDescription.length, 155, 165)}`}>
                {data.metaDescription.length}/165
              </span>
            </div>
            <textarea
              value={data.metaDescription}
              onChange={(e) => update('metaDescription', e.target.value)}
              rows={3}
              placeholder="A concise description of this page for search engines..."
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors resize-none"
            />
          </div>

          {/* Canonical URL */}
          <div>
            <label className="block text-xs text-light-300/50 uppercase tracking-wider mb-2">Canonical URL</label>
            <input
              type="url"
              value={data.canonicalUrl}
              onChange={(e) => update('canonicalUrl', e.target.value)}
              placeholder={`${BASE_URL}${data.slug === '/' ? '' : data.slug}`}
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
            />
          </div>

          {/* Social / Open Graph */}
          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-heading font-semibold text-light-300/80">Social / Open Graph</h3>
            <div>
              <label className="block text-xs text-light-300/40 mb-1.5">OG Title</label>
              <input
                type="text"
                value={data.ogTitle}
                onChange={(e) => update('ogTitle', e.target.value)}
                placeholder="Defaults to meta title"
                className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-light-300/40 mb-1.5">OG Description</label>
              <textarea
                value={data.ogDescription}
                onChange={(e) => update('ogDescription', e.target.value)}
                rows={2}
                placeholder="Defaults to meta description"
                className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-light-300/40 mb-1.5">OG Image URL</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={data.ogImage}
                  onChange={(e) => update('ogImage', e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
                />
                <label className="px-4 py-2.5 rounded-lg text-sm font-medium border border-dark-700/50 text-light-300/60 hover:text-light hover:border-dark-700 transition-colors cursor-pointer text-center whitespace-nowrap">
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOgImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-heading font-semibold text-light-300/80">Twitter Card</h3>
            <div>
              <label className="block text-xs text-light-300/40 mb-1.5">Card Type</label>
              <select
                value={data.twitterCard}
                onChange={(e) => update('twitterCard', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light focus:outline-none focus:border-accent-blue/30 transition-colors"
              >
                <option value="summary_large_image">Summary Large Image</option>
                <option value="summary">Summary</option>
              </select>
            </div>
          </div>

          {/* Robots */}
          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-heading font-semibold text-light-300/80">Robots</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.robotsIndex}
                onChange={(e) => update('robotsIndex', e.target.checked)}
                className="w-4 h-4 rounded border-dark-700/50 accent-accent-blue"
              />
              <span className="text-sm text-light-300/70">Allow search engines to index this page</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.robotsFollow}
                onChange={(e) => update('robotsFollow', e.target.checked)}
                className="w-4 h-4 rounded border-dark-700/50 accent-accent-blue"
              />
              <span className="text-sm text-light-300/70">Allow search engines to follow links on this page</span>
            </label>
          </div>

          {/* Structured Data */}
          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-heading font-semibold text-light-300/80">Structured Data (JSON-LD)</h3>
            <textarea
              value={data.structuredData}
              onChange={(e) => update('structuredData', e.target.value)}
              onBlur={(e) => validateJson(e.target.value)}
              rows={6}
              placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
              className={`w-full px-4 py-2.5 rounded-lg bg-dark-900 border text-sm text-light placeholder:text-light-300/30 focus:outline-none transition-colors resize-none font-mono ${
                jsonError ? 'border-red-500/50' : 'border-dark-700/50 focus:border-accent-blue/30'
              }`}
            />
            {jsonError && <p className="text-xs text-red-400">{jsonError}</p>}
          </div>

          {/* Save */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving || !!jsonError}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {saving && (
                <div className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {saved && <span className="text-sm text-emerald-400">Saved successfully!</span>}
          </div>

          {/* Updated info */}
          {data.updatedBy && data.updatedAt && (
            <p className="text-xs text-light-300/30">
              Last updated by {data.updatedBy} on{' '}
              {new Date(data.updatedAt).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
