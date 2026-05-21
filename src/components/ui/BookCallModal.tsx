'use client';

import { useState } from 'react';

export default function BookCallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.query,
          source: 'book-call',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setFormData({ name: '', email: '', query: '' });
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);
    } catch {
      setStatus('idle');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center px-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-dark-900/70 backdrop-blur-sm" />
      <div
        className="relative glass-strong rounded-2xl p-6 sm:p-8 w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-light-300/60 hover:text-light transition-colors"
          aria-label="Close call booking form"
          data-cursor="pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h3 className="font-heading font-bold text-xl mb-1">Book A Free Call</h3>
        <p className="text-sm text-light-300/50 mb-6">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors" />
          <input type="email" placeholder="Email Address" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors" />
          <textarea placeholder="Your Query" rows={3} required value={formData.query}
            onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors resize-none" />
          <button type="submit" disabled={status === 'sending'}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 disabled:opacity-50"
            data-cursor="pointer">
            {status === 'sending' ? 'Submitting...' : status === 'sent' ? 'Submitted!' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
