'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchJson } from '@/lib/fetch-json';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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

export default function CaseStudyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudy() {
      try {
        const res = await fetch('/api/case-studies');
        const data = await fetchJson<CaseStudy[]>(res);
        const found = data.find((cs) => cs.slug === slug && cs.published);
        setStudy(found || null);
      } catch {
        setStudy(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-light-300/40">Loading...</div>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Case study not found</h1>
          <Link href="/case-studies" className="text-accent-blue hover:underline text-sm">
            &larr; Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dark text-light">
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,169,106,0.06) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto relative z-10">
            <Link
              href="/case-studies"
              className="text-light-300/60 hover:text-light transition-colors text-sm flex items-center gap-2 mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-accent-gold text-xs font-medium tracking-wider uppercase">{study.industry}</span>
              <span className="text-xs text-light-300/30">{study.date}</span>
            </div>

            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
              {study.client}
            </h1>
            <p className="text-xl md:text-2xl text-accent-blue font-medium mb-6">{study.headline}</p>
            <p className="text-light-300/60 text-lg leading-relaxed max-w-3xl">{study.description}</p>
          </div>
        </section>

        {/* Cover Image */}
        {study.coverImage && (
          <section className="px-4 sm:px-6 pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-dark-700/30">
                <Image
                  src={study.coverImage}
                  alt={study.client}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {study.results.map((result) => (
                <div key={result.label} className="text-center glass rounded-xl px-2 py-3 sm:p-6">
                  <div className="text-base sm:text-3xl md:text-4xl font-heading font-bold text-gradient mb-1 sm:mb-2 break-words leading-tight">
                    {result.metric}
                  </div>
                  <div className="text-[10px] sm:text-sm text-light-300/50 leading-tight">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {study.services.map((svc) => (
                <span key={svc} className="px-4 py-2 rounded-full text-sm text-light-300/70 border border-dark-700/50">
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        {study.content && (
          <section className="px-4 sm:px-6 pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="h-px bg-dark-700/30 mb-12" />
              <div className="prose-custom">
                {study.content.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-light-300/70 text-lg leading-relaxed mb-6"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-4xl mx-auto pt-8 border-t border-dark-700/30">
            <Link
              href="/case-studies"
              className="text-accent-blue hover:underline text-sm flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all case studies
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
