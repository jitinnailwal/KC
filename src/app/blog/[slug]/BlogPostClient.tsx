'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchJson } from '@/lib/fetch-json';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  published: boolean;
  coverImage?: string;
}

export default function BlogPostClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch('/api/blog');
        const blogs = await fetchJson<BlogPost[]>(res);
        const found = blogs.find((b) => b.slug === slug && b.published);
        setPost(found || null);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-light-300/40">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-accent-blue hover:underline text-sm">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    Branding: '#4F8CFF',
    Design: '#C8A96A',
    Development: '#34D399',
    Motion: '#A78BFA',
    Strategy: '#FB7185',
    General: '#818CF8',
  };

  const accent = categoryColors[post.category] || '#4F8CFF';

  return (
    <div className="min-h-screen bg-dark text-light">
      {/* Navigation */}
      <nav className="border-b border-dark-700/30 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-light-300/60 hover:text-light transition-colors text-sm flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <span className="text-xs text-light-300/30">{post.readTime}</span>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{
              color: accent,
              borderColor: `${accent}30`,
              background: `${accent}08`,
            }}
          >
            {post.category}
          </span>
          <span className="text-sm text-light-300/40">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-light-300/60 leading-relaxed mb-12 max-w-3xl">
          {post.excerpt}
        </p>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-dark-700/30 mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-dark-700/30 mb-12" />

        {/* Author */}
        <div className="flex items-center gap-3 mb-12">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-dark-900 font-heading font-bold text-xs"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)` }}
          >
            {post.author
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div>
            <div className="text-sm font-medium">{post.author}</div>
            <div className="text-xs text-light-300/40">
              {post.date} &middot; {post.readTime}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose-custom">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="text-light-300/70 text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-dark-700/30">
          <Link
            href="/blog"
            className="text-accent-blue hover:underline text-sm flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
