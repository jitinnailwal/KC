'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { fetchJson, getErrorMessage } from '@/lib/fetch-json';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminEmptyState from '@/components/admin/AdminEmptyState';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  description: string;
  results: { metric: string; label: string }[];
  services: string[];
  coverImage: string;
  slug: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  content: string;
  date: string;
}

const emptyForm = {
  client: '',
  industry: '',
  headline: '',
  description: '',
  content: '',
  services: '',
  results: [{ metric: '', label: '' }],
  coverImage: '',
  seoTitle: '',
  seoDescription: '',
  published: true,
};

export default function AdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCaseStudies = useCallback(async () => {
    try {
      const res = await fetch('/api/case-studies');
      const data = await fetchJson<CaseStudy[]>(res);
      setCaseStudies(data);
      setError(null);
    } catch (err) {
      setCaseStudies([]);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await fetchJson<{ url?: string }>(res);
      const uploadedUrl = data.url;
      if (uploadedUrl) {
        setForm((prev) => ({ ...prev, coverImage: uploadedUrl }));
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client.trim() || !form.headline.trim()) return;

    setSaving(true);

    const payload = {
      client: form.client,
      industry: form.industry,
      headline: form.headline,
      description: form.description,
      content: form.content,
      services: form.services
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      results: form.results.filter((r) => r.metric.trim() || r.label.trim()),
      coverImage: form.coverImage,
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      published: form.published,
    };

    try {
      if (editing) {
        await fetchJson<CaseStudy>(
          await fetch(`/api/case-studies/${editing}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        );
      } else {
        await fetchJson<CaseStudy>(
          await fetch('/api/case-studies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        );
      }

      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
      await fetchCaseStudies();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cs: CaseStudy) => {
    setForm({
      client: cs.client,
      industry: cs.industry,
      headline: cs.headline,
      description: cs.description,
      content: cs.content,
      services: cs.services.join(', '),
      results: cs.results.length > 0 ? cs.results : [{ metric: '', label: '' }],
      coverImage: cs.coverImage || '',
      seoTitle: cs.seoTitle,
      seoDescription: cs.seoDescription,
      published: cs.published,
    });
    setEditing(cs.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchJson<{ success: boolean }>(
        await fetch(`/api/case-studies/${id}`, { method: 'DELETE' })
      );
      setDeleteConfirm(null);
      await fetchCaseStudies();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const togglePublish = async (cs: CaseStudy) => {
    try {
      await fetchJson<CaseStudy>(
        await fetch(`/api/case-studies/${cs.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ published: !cs.published }),
        })
      );
      await fetchCaseStudies();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const addResultRow = () => {
    setForm({ ...form, results: [...form.results, { metric: '', label: '' }] });
  };

  const removeResultRow = (index: number) => {
    setForm({ ...form, results: form.results.filter((_, i) => i !== index) });
  };

  const updateResult = (index: number, field: 'metric' | 'label', value: string) => {
    const updated = [...form.results];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, results: updated });
  };

  return (
    <AdminLayout
      title={<>Case <span className="text-accent-gold">Studies</span></>}
      actionButton={
        <button
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setShowForm(true);
            }
          }}
          className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 hover:shadow-lg hover:shadow-accent-blue/20 transition-all whitespace-nowrap"
        >
          {showForm ? 'Cancel' : '+ New Study'}
        </button>
      }
    >
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 p-4 sm:p-6 rounded-2xl border border-dark-700/30 bg-dark-800/50"
          >
            <h2 className="font-heading font-semibold text-lg mb-6">
              {editing ? 'Edit Case Study' : 'Create New Case Study'}
            </h2>

            <div className="space-y-5">
              {/* Client & Industry row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                    placeholder="e.g. UT Sarees"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                    placeholder="e.g. E-Commerce / Fashion"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Headline *
                </label>
                <input
                  type="text"
                  value={form.headline}
                  onChange={(e) => setForm({ ...form, headline: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                  placeholder="e.g. From Zero to 50 Lacs Revenue"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Short Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm resize-none"
                  placeholder="Brief overview shown on the listing card..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Full Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm resize-y font-mono leading-relaxed"
                  placeholder="Write the full case study content here... Use double newlines for paragraphs."
                />
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.services}
                  onChange={(e) => setForm({ ...form, services: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                  placeholder="e.g. Google Ads, SEO, Landing Pages"
                />
              </div>

              {/* Results */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Results
                </label>
                <div className="space-y-3">
                  {form.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={result.metric}
                        onChange={(e) => updateResult(i, 'metric', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                        placeholder="Metric (e.g. 10X)"
                      />
                      <input
                        type="text"
                        value={result.label}
                        onChange={(e) => updateResult(i, 'label', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                        placeholder="Label (e.g. Return on Ad Spend)"
                      />
                      {form.results.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeResultRow(i)}
                          className="px-3 py-3 rounded-lg text-sm border border-dark-700/40 text-red-400/50 hover:text-red-400 hover:border-red-500/30 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addResultRow}
                    className="text-sm text-accent-gold/70 hover:text-accent-gold transition-colors"
                  >
                    + Add Result
                  </button>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Cover Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2.5 rounded-lg text-sm font-medium border border-dark-700/40 text-light-300/60 hover:text-light hover:border-dark-700 transition-colors cursor-pointer">
                    {uploading ? 'Uploading...' : 'Choose Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {form.coverImage && (
                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-12 rounded-md overflow-hidden border border-dark-700/40">
                        <Image
                          src={form.coverImage}
                          alt={`Cover image preview for ${form.client || 'case study'}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '' })}
                        className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                    placeholder="Custom SEO title..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    SEO Description
                  </label>
                  <input
                    type="text"
                    value={form.seoDescription}
                    onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                    placeholder="Custom SEO description..."
                  />
                </div>
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, published: !form.published })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    form.published ? 'bg-accent-gold' : 'bg-dark-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      form.published ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
                <span className="text-sm text-light-300/60">
                  {form.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 flex-wrap">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-accent-gold text-dark-900 hover:bg-accent-gold/90 transition-colors disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : editing
                    ? 'Update Case Study'
                    : 'Publish Case Study'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium border border-dark-700/40 text-light-300/60 hover:text-light hover:border-dark-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Case Studies list */}
        {loading ? (
          <div className="text-center py-20 text-light-300/40">Loading...</div>
        ) : caseStudies.length === 0 ? (
          <AdminEmptyState
            title="No case studies yet."
            actionLabel="Add your first case study"
            onAction={() => setShowForm(true)}
            accentClass="text-accent-gold"
          />
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-light-300/40 mb-4">
              {caseStudies.length} case stud{caseStudies.length !== 1 ? 'ies' : 'y'}
            </div>
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="p-4 sm:p-5 rounded-xl border border-dark-700/30 bg-dark-800/30 hover:border-dark-700/50 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {cs.coverImage && (
                      <div className="relative w-16 h-10 rounded-md overflow-hidden border border-dark-700/40 shrink-0">
                        <Image
                          src={cs.coverImage}
                          alt={`Cover image for ${cs.client}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            cs.published
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {cs.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-light-300/30">
                          {cs.industry}
                        </span>
                        <span className="text-xs text-light-300/30">
                          {cs.date}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-base mb-1 truncate">
                        {cs.client}
                      </h3>
                      <p className="text-sm text-light-300/40 truncate">
                        {cs.headline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      onClick={() => togglePublish(cs)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-light-300/50 hover:text-light hover:border-dark-700 transition-colors"
                    >
                      {cs.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleEdit(cs)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-accent-gold/70 hover:text-accent-gold hover:border-accent-gold/30 transition-colors"
                    >
                      Edit
                    </button>
                    {deleteConfirm === cs.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(cs.id)}
                          className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-light-300/50 hover:text-light transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(cs.id)}
                        className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-red-400/50 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </AdminLayout>
  );
}
