'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedText from '@/components/ui/AnimatedText';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  description: string;
  results: { metric: string; label: string }[];
  services: string[];
  coverImage?: string;
  slug: string;
  published: boolean;
}

const cardColors = [
  { color: 'from-blue-500/20 to-purple-500/20', accent: '#4F8CFF' },
  { color: 'from-amber-500/20 to-rose-500/20', accent: '#C8A96A' },
  { color: 'from-emerald-500/20 to-teal-500/20', accent: '#34D399' },
  { color: 'from-violet-500/20 to-pink-500/20', accent: '#A78BFA' },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 5 case studies immediately on mount
  useEffect(() => {
    let active = true;

    fetch('/api/case-studies')
      .then((res) => res.json())
      .then((data: CaseStudy[]) => {
        if (!active) return;
        setCaseStudies(data.filter((cs) => cs.published).slice(0, 5));
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // GSAP ScrollTrigger horizontal scroll with pin
  useEffect(() => {
    const cards = cardsRef.current;
    const section = sectionRef.current;
    if (!cards || !section) return;
    if (window.innerWidth < 768) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Single rAF for layout
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;

      const totalScroll = cards.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      // Reset cards to start position
      gsap.set(cards, { x: 0 });

      ctx = gsap.context(() => {
        gsap.to(cards, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.5,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
            pinSpacing: true,
            refreshPriority: 0,
            onRefresh: () => {
              gsap.set(cards, { x: 0 });
            },
            onUpdate: () => {
              const cardEls = cards.querySelectorAll('.project-card');
              cardEls.forEach((card) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const viewCenter = window.innerWidth * 0.6;
                const dist = Math.abs(cardCenter - viewCenter) / window.innerWidth;
                const opacity = Math.max(0.4, 1 - dist);
                const translateY = Math.max(0, dist * 40);
                (card as HTMLElement).style.opacity = String(opacity);
                (card as HTMLElement).style.transform = `translateY(${translateY}px)`;
              });
            },
          },
        });
      }, section);
    };

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [caseStudies]);

  // No published case studies yet — hide the section entirely
  if (!loading && caseStudies.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="work" className="relative bg-[#0a0a0a]" style={{ zIndex: 1 }}>
      {/* Desktop: pinned horizontal scroll */}
      <div className="hidden md:block h-screen overflow-hidden bg-[#0a0a0a]">
        {/* Header */}
        <div className="pt-16 md:pt-20 pb-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-3 block"
                >
                  Case Studies
                </motion.span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  <AnimatedText text="Results that" />
                  <br />
                  <span className="text-gradient">
                    <AnimatedText text="speak volumes" delay={0.2} />
                  </span>
                </h2>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-light-300/60 max-w-md text-sm"
                >
                  Real campaigns. Real numbers. See how we&apos;ve helped businesses grow.
                </motion.p>
                <Link href="/case-studies" className="text-accent-blue text-sm font-medium hover:underline transition-all">
                  View All Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal cards */}
        <div ref={cardsRef} className="flex gap-8 px-6 py-6 w-max items-start" style={{ willChange: 'transform' }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[500px] lg:min-w-[600px]">
                  <ProjectSkeleton />
                </div>
              ))
            : caseStudies.map((study, i) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="project-card min-w-[500px] lg:min-w-[600px] group block"
                  data-cursor="pointer"
                >
                  <ProjectCard study={study} index={i} />
                </Link>
              ))}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>

      {/* Mobile: Vertical cards */}
      <div className="md:hidden relative overflow-hidden px-4 py-6">
        <div className="mb-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-3 block"
          >
            Case Studies
          </motion.span>
          <h2 className="font-heading font-bold text-3xl tracking-tight">
            Results that
            <br />
            <span className="text-gradient">
              speak volumes
            </span>
          </h2>
        </div>
        <div className="space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            : caseStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/case-studies/${study.slug}`} className="block">
                    <ProjectCard study={study} index={i} />
                  </Link>
                </motion.div>
              ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent-blue/30 text-accent-blue text-sm font-medium hover:bg-accent-blue/5 transition-all duration-300"
          >
            View All Case Studies
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ study, index }: { study: CaseStudy; index: number }) {
  const colorScheme = cardColors[index % cardColors.length];

  return (
    <div className="relative rounded-2xl overflow-hidden glass h-[45vh] max-h-[400px] md:h-[55vh] md:max-h-none flex flex-col justify-end group">
      {study.coverImage && (
        <Image
          src={study.coverImage}
          alt={study.client}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      {study.coverImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      )}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.color} opacity-30 group-hover:opacity-50 transition-opacity duration-700`} />

      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: colorScheme.accent }} />
        <span className="text-xs text-light-300/40">{study.industry}</span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[80px] sm:text-[150px] md:text-[200px] font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10 p-5 sm:p-8">
        <span className="text-xs text-light-300/40 tracking-widest uppercase mb-2 block">{study.industry}</span>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 group-hover:text-gradient-white transition-colors">
          {study.client}
        </h3>
        <p className="text-lg font-medium mb-2" style={{ color: colorScheme.accent }}>{study.headline}</p>
        <p className="text-light-300/50 text-sm leading-relaxed max-w-md line-clamp-2">{study.description}</p>

        <div className="flex gap-4 mt-3">
          {study.results.slice(0, 2).map((result) => (
            <div key={result.label} className="text-sm">
              <span className="font-bold text-white">{result.metric}</span>
              <span className="text-light-300/40 ml-1">{result.label}</span>
            </div>
          ))}
        </div>

        <div
          className="mt-4 sm:mt-6 flex items-center gap-2 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:group-hover:translate-y-0"
          style={{ color: colorScheme.accent }}
        >
          <span>View Case Study</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden glass skeleton-shimmer h-[45vh] max-h-[400px] md:h-[55vh] md:max-h-none flex flex-col justify-end">
      {/* Industry tag (top-right) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2">
        <div className="skeleton-block h-2 w-2 rounded-full" />
        <div className="skeleton-block h-3 w-28" />
      </div>

      <div className="relative z-10 p-5 sm:p-8">
        <div className="skeleton-block h-3 w-24 mb-3" />
        {/* Client name */}
        <div className="skeleton-block h-9 w-3/5 mb-3" />
        {/* Headline */}
        <div className="skeleton-block h-5 w-2/3 mb-3" />
        {/* Description */}
        <div className="skeleton-block h-3 w-full mb-2" />
        <div className="skeleton-block h-3 w-4/5 mb-4" />

        {/* Results row */}
        <div className="flex gap-4">
          <div className="skeleton-block h-4 w-32" />
          <div className="skeleton-block h-4 w-28" />
        </div>
      </div>
    </div>
  );
}
