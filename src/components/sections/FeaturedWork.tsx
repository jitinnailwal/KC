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
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(fallbackCaseStudies);

  useEffect(() => {
    const doFetch = () => {
      fetch('/api/case-studies')
        .then((res) => res.json())
        .then((data: CaseStudy[]) => {
          const published = data.filter((cs) => cs.published);
          if (published.length > 0) {
            setCaseStudies(published);
          }
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

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    let mm: ReturnType<typeof import('gsap')['gsap']['matchMedia']> | null = null;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const totalScrollWidth = cards.scrollWidth - window.innerWidth;

        gsap.to(cards, {
          x: -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const cardElements = cards.querySelectorAll('.project-card');
        cardElements.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.4, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'left 90%',
                end: 'left 50%',
                scrub: 0.5,
              },
            }
          );
        });
      });
    };

    init();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [caseStudies]);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] z-[2]">
      {/* Header */}
      <div className="pt-5 pb-4 px-4 sm:px-6">
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
              <Link
                href="/case-studies"
                className="text-accent-blue text-sm font-medium hover:underline transition-all"
              >
                View All Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal scroll */}
      <div ref={cardsRef} className="hidden md:flex gap-8 px-6 py-6 w-max items-start">
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

      {/* Mobile: Vertical cards */}
      <div className="md:hidden px-4 py-6 space-y-4">
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
    </section>
  );
}

function ProjectCard({ study, index }: { study: CaseStudy; index: number }) {
  const colorScheme = cardColors[index % cardColors.length];

  return (
    <div className="relative rounded-2xl overflow-hidden glass h-[45vh] md:h-[55vh] flex flex-col justify-end group">
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorScheme.color} opacity-30 group-hover:opacity-50 transition-opacity duration-700`}
      />

      {/* Decorative elements */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: colorScheme.accent }}
        />
        <span className="text-xs text-light-300/40">{study.industry}</span>
      </div>

      {/* Large number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[100px] sm:text-[150px] md:text-[200px] font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-8">
        <span className="text-xs text-light-300/40 tracking-widest uppercase mb-2 block">
          {study.industry}
        </span>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 group-hover:text-gradient-white transition-colors">
          {study.client}
        </h3>
        <p className="text-lg font-medium mb-2" style={{ color: colorScheme.accent }}>
          {study.headline}
        </p>
        <p className="text-light-300/50 text-sm leading-relaxed max-w-md line-clamp-2">
          {study.description}
        </p>

        {/* Results preview */}
        <div className="flex gap-4 mt-3">
          {study.results.slice(0, 2).map((result) => (
            <div key={result.label} className="text-sm">
              <span className="font-bold text-white">{result.metric}</span>
              <span className="text-light-300/40 ml-1">{result.label}</span>
            </div>
          ))}
        </div>

        {/* View button */}
        <div
          className="mt-4 sm:mt-6 flex items-center gap-2 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:group-hover:translate-y-0"
          style={{ color: colorScheme.accent }}
        >
          <span>View Case Study</span>
          <svg
            width="16"
            height="16"
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
  );
}
