'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/client-upload';
import { fetchJson, getErrorMessage } from '@/lib/fetch-json';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminEmptyState from '@/components/admin/AdminEmptyState';

interface Review {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  published: boolean;
  date: string;
  image?: string;
}

const emptyForm = {
  quote: '',
  name: '',
  role: '',
  rating: 5,
  published: true,
  image: '',
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews', { cache: 'no-store' });
      const data = await fetchJson<Review[]>(res);
      setReviews(data);
      setError(null);
    } catch (err) {
      setReviews([]);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const uploaded = await uploadImage(file, 'review');
      setForm((prev) => ({ ...prev, image: uploaded.url }));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
      input.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.quote.trim() || !form.name.trim()) return;

    setSaving(true);

    try {
      if (editing) {
        await fetchJson<Review>(
          await fetch(`/api/reviews/${editing}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })
        );
      } else {
        await fetchJson<Review>(
          await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })
        );
      }

      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
      await fetchReviews();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (review: Review) => {
    setForm({
      quote: review.quote,
      name: review.name,
      role: review.role,
      rating: review.rating,
      published: review.published,
      image: review.image || '',
    });
    setEditing(review.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchJson<{ success: boolean }>(
        await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
      );
      setDeleteConfirm(null);
      await fetchReviews();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const togglePublish = async (review: Review) => {
    try {
      await fetchJson<Review>(
        await fetch(`/api/reviews/${review.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ published: !review.published }),
        })
      );
      await fetchReviews();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <AdminLayout
      title={<>Client <span className="text-accent-gold">Reviews</span></>}
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
          {showForm ? 'Cancel' : '+ New Review'}
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
              {editing ? 'Edit Review' : 'Add New Client Review'}
            </h2>

            <div className="space-y-5">
              {/* Name & Role row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    Role / Company
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm"
                    placeholder="e.g. CEO, Acme Inc."
                  />
                </div>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Review Quote *
                </label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-gold/50 focus:outline-none transition-colors text-sm resize-y"
                  placeholder="What did the client say about your work..."
                  required
                />
              </div>

              {/* Client Image */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Client Photo
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
                  {form.image && (
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-dark-700/40">
                        <Image
                          src={form.image}
                          alt={`Photo preview of ${form.name || 'client'}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: '' })}
                        className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={star <= form.rating ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={
                          star <= form.rating
                            ? 'text-accent-gold'
                            : 'text-dark-700'
                        }
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
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
                  {form.published ? 'Published' : 'Hidden'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-accent-gold text-dark-900 hover:bg-accent-gold/90 transition-colors disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : editing
                    ? 'Update Review'
                    : 'Add Review'}
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

        {/* Reviews list */}
        {loading ? (
          <div className="text-center py-20 text-light-300/40">Loading...</div>
        ) : reviews.length === 0 ? (
          <AdminEmptyState
            title="No client reviews yet."
            actionLabel="Add your first review"
            onAction={() => setShowForm(true)}
            accentClass="text-accent-gold"
          />
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-light-300/40 mb-4">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 sm:p-5 rounded-xl border border-dark-700/30 bg-dark-800/30 hover:border-dark-700/50 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          review.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {review.published ? 'Published' : 'Hidden'}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <svg
                            key={j}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-accent-gold"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-light-300/30">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-light/80 mb-2 line-clamp-2">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <p className="text-xs text-light-300/50">
                      — {review.name}{review.role ? `, ${review.role}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      onClick={() => togglePublish(review)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-light-300/50 hover:text-light hover:border-dark-700 transition-colors"
                    >
                      {review.published ? 'Hide' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-accent-gold/70 hover:text-accent-gold hover:border-accent-gold/30 transition-colors"
                    >
                      Edit
                    </button>
                    {deleteConfirm === review.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(review.id)}
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
                        onClick={() => setDeleteConfirm(review.id)}
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
