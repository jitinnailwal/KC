'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/ui/AnimatedText';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  description: string;
  results: { metric: string; label: string }[];
  services: string[];
  slug: string;
  published: boolean;
}

const fallbackCaseStudies: CaseStudy[] = [
  {
    id: '1',
    client: 'UT Sarees',
    industry: 'E-Commerce / Fashion',
    headline: 'From Zero to ₹50 Lacs Revenue',
    description:
      'We partnered with UT Sarees to build and scale their online presence from scratch. Through strategic Google Search and Shopping campaigns, we delivered exceptional results that transformed their business.',
    results: [
      { metric: '₹50 Lacs', label: 'Revenue Generated' },
      { metric: '10X', label: 'Return on Ad Spend' },
      { metric: 'Top 3', label: 'Google Rankings' },
    ],
    services: ['Google Ads', 'Shopping Campaigns', 'SEO'],
    slug: 'ut-sarees',
    published: true,
  },
  {
    id: '2',
    client: 'The Usee Shop',
    industry: 'E-Commerce / Banarasi Silk',
    headline: 'First-Page Ranking for Competitive Keywords',
    description:
      'The Usee Shop came to us struggling with visibility in a highly competitive niche. Our comprehensive SEO strategy achieved first-page ranking for "banarasi silk tissue saree" and drove significant organic sales growth.',
    results: [
      { metric: '#1 Page', label: 'Google Ranking' },
      { metric: '300%+', label: 'Organic Traffic Growth' },
      { metric: 'Significant', label: 'Sales Increase' },
    ],
    services: ['SEO', 'Content Strategy', 'On-Page Optimization'],
    slug: 'the-usee-shop',
    published: true,
  },
  {
    id: '3',
    client: 'E-Commerce Client',
    industry: 'E-Commerce',
    headline: '₹30 Lakh in Sales with 14X ROAS',
    description:
      'Through precise website-ad alignment and continuous optimization, we helped this e-commerce brand achieve remarkable returns.',
    results: [
      { metric: '₹30 Lakh', label: 'Total Sales' },
      { metric: '14X', label: 'Return on Ad Spend' },
      { metric: '60%', label: 'Lower CPA' },
    ],
    services: ['Google Ads', 'Landing Pages', 'Conversion Optimization'],
    slug: 'e-commerce-client',
    published: true,
  },
];

const cardColors = [
  { color: 'from-blue-500/20 to-purple-500/20', accent: '#4F8CFF' },
  { color: 'from-amber-500/20 to-rose-500/20', accent: '#C8A96A' },
  { color: 'from-emerald-500/20 to-teal-500/20', accent: '#34D399' },
  { color: 'from-violet-500/20 to-pink-500/20', accent: '#A78BFA' },
];

export default function FeaturedWork() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(fallbackCaseStudies);

  useEffect(() => {
    const doFetch = () => {
      fetch('/api/case-studies')
        .then((res) => res.json())
        .then((data: CaseStudy[]) => {
          const published = data.filter((cs) => cs.published);
          if (published.length > 0) setCaseStudies(published);
        })
        .catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(doFetch);
      return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
    } else {
      const timer = setTimeout(doFetch, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // GSAP ScrollTrigger horizontal scroll with pin
  useEffect(() => {
    const cards = cardsRef.current;
    const wrapper = wrapperRef.current;
    if (!cards || !wrapper) return;
    if (window.innerWidth < 768) return;

    let ctx: ReturnType<typeof import('gsap')['gsap']['context']> | null = null;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Wait for DOM to render cards
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if (cancelled) return;

      const totalScroll = cards.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      ctx = gsap.context(() => {
        gsap.to(cards, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
            onUpdate: () => {
              // Card reveal based on viewport position
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
      }, wrapper);
    };

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [caseStudies]);

  return (
    <section id="work" className="relative bg-[#0a0a0a]">
      {/* Desktop: GSAP ScrollTrigger pinned horizontal scroll */}
      <div
        ref={wrapperRef}
        className="hidden md:block h-screen overflow-hidden bg-[#0a0a0a]"
      >
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
          {caseStudies.map((study, i) => (
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
          {caseStudies.map((study, i) => (
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
