'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        setError('Invalid username or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/KC_Logo.jpeg"
            alt="Kreative Catalyst"
            width={56}
            height={56}
            className="rounded-xl mx-auto mb-4"
          />
          <h1 className="font-heading font-bold text-2xl text-light">Admin Login</h1>
          <p className="text-sm text-light-300/50 mt-1">Sign in to access the dashboard</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 sm:p-8 border border-dark-700/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs text-light-300/60 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/40 transition-colors"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs text-light-300/60 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/40 transition-colors"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-light-300/30 mt-6">
          <a href="/" className="hover:text-light-300/60 transition-colors">← Back to Website</a>
        </p>
      </div>
    </div>
  );
}
