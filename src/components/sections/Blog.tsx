'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
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

const categoryColors: Record<string, string> = {
  Branding: '#4F8CFF',
  Design: '#C8A96A',
  Development: '#34D399',
  Motion: '#A78BFA',
  Strategy: '#FB7185',
  General: '#818CF8',
};

const categoryGradients: Record<string, string> = {
  Branding: 'from-blue-500/20 to-cyan-500/20',
  Design: 'from-amber-500/20 to-orange-500/20',
  Development: 'from-emerald-500/20 to-teal-500/20',
  Motion: 'from-violet-500/20 to-pink-500/20',
  Strategy: 'from-rose-500/20 to-red-500/20',
  General: 'from-indigo-500/20 to-blue-500/20',
};

// Fallback blog posts so initial render is meaningful (no loading skeleton)
const fallbackPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Digital Marketing in 2026',
    slug: 'future-of-digital-marketing-2026',
    excerpt: 'Explore the trends shaping digital marketing this year — from AI-driven personalization to immersive brand experiences.',
    content: '',
    category: 'Strategy',
    author: 'Kreative Catalyst',
    date: '2026-04-20',
    readTime: '5 min read',
    published: true,
  },
  {
    id: '2',
    title: 'Why SEO Still Matters for Small Businesses',
    slug: 'why-seo-still-matters',
    excerpt: 'Search engine optimization remains one of the highest-ROI channels for small businesses. Here\'s why you shouldn\'t ignore it.',
    content: '',
    category: 'Strategy',
    author: 'Kreative Catalyst',
    date: '2026-04-10',
    readTime: '4 min read',
    published: true,
  },
  {
    id: '3',
    title: 'Building a Brand Identity That Lasts',
    slug: 'building-brand-identity',
    excerpt: 'A strong brand identity goes beyond a logo. Learn the key elements that make a brand memorable and trustworthy.',
    content: '',
    category: 'Branding',
    author: 'Kreative Catalyst',
    date: '2026-03-28',
    readTime: '6 min read',
    published: true,
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading] = useState(false);

  // Defer API fetch until section is near viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let fetched = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetched) {
          fetched = true;
          observer.disconnect();
          fetch('/api/blog')
            .then((res) => fetchJson<BlogPost[]>(res))
            .then((data: BlogPost[]) => {
              const published = data.filter((p) => p.published).slice(0, 6);
              if (published.length > 0) {
                setPosts(published);
              }
            })
            .catch(() => {
              // Keep fallback data
            });
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(79,140,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              Our Blog
            </motion.span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              <span className="hidden md:inline"><AnimatedText text="Insights &" /></span>
              <span className="md:hidden">Insights &</span>
              <br />
              <span className="text-gradient">
                <span className="hidden md:inline"><AnimatedText text="perspectives" delay={0.2} /></span>
                <span className="md:hidden">perspectives</span>
              </span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-light-300/60 max-w-md text-sm"
          >
            Thoughts on design, development, and the creative process.
            Fresh insights published regularly.
          </motion.p>
        </div>

        {/* Blog grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass rounded-2xl h-[320px] animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-light-300/40 text-sm">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const accent = categoryColors[post.category] || '#4F8CFF';
              const gradient =
                categoryGradients[post.category] ||
                'from-indigo-500/20 to-blue-500/20';

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group cursor-pointer block h-full"
                    data-cursor="pointer"
                  >
                    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent-blue/15 transition-all duration-500 relative">
                      {/* Cover image or gradient header bar */}
                      {post.coverImage ? (
                        <div className="relative w-full h-40 overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                        </div>
                      ) : (
                        <div
                          className={`h-1 bg-gradient-to-r ${gradient}`}
                        />
                      )}

                      {/* Hover gradient overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
                        }}
                      />

                      <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-1 relative z-10">
                        {/* Category & Read time */}
                        <div className="flex items-center justify-between mb-4">
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
                          <span className="text-xs text-light-300/40">
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading font-semibold text-xl md:text-2xl mb-3 leading-tight group-hover:text-light transition-colors duration-300">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-light-300/50 text-sm leading-relaxed mb-6 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-dark-700/30">
                          <span className="text-xs text-light-300/40">
                            {post.date}
                          </span>
                          <div
                            className="flex items-center gap-2 text-sm font-medium opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1"
                            style={{ color: accent }}
                          >
                            <span>Read More</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
