'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

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

export default function CaseStudiesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('/api/case-studies')
      .then((res) => res.json())
      .then((data: CaseStudy[]) => {
        if (!active) return;
        setCaseStudies(data.filter((cs) => cs.published));
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.case-study-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.case-studies-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [caseStudies]);

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,169,106,0.06) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              Our Work
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Results that speak" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="for themselves" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto mb-4"
            >
              Real campaigns. Real numbers. See how we&apos;ve helped businesses achieve
              extraordinary growth through strategic digital marketing.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-light-300/60 text-base max-w-2xl mx-auto"
            >
              Every case study below represents a real business that trusted Kreative Catalyst
              to transform their digital presence. From e-commerce brands scaling revenue to
              local businesses dominating search results, these stories showcase the measurable
              impact of data-driven marketing strategies executed with precision and purpose.
            </motion.p>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="py-8 md:py-16 px-4 sm:px-6 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-16"
            >
              <span className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block">
                Case Studies
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Client <span className="text-gradient">Success Stories</span>
              </h2>
            </motion.div>

            {loading ? (
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="glass skeleton-shimmer rounded-2xl p-6 sm:p-10 overflow-hidden"
                  >
                    <div className="skeleton-block h-3 w-32 mb-5" />
                    <div className="skeleton-block h-8 w-1/2 mb-3" />
                    <div className="skeleton-block h-5 w-2/3 mb-5" />
                    <div className="skeleton-block h-3 w-full mb-2" />
                    <div className="skeleton-block h-3 w-11/12 mb-8" />
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-4 mb-6">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="skeleton-block h-16 rounded-xl" />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="skeleton-block h-6 w-24 rounded-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-16 text-light-300/40">
                No case studies published yet. Check back soon.
              </div>
            ) : (
            <div className="case-studies-grid space-y-8">
              {caseStudies.map((study) => (
                <Link key={study.id} href={`/case-studies/${study.slug}`} className="block case-study-card">
                  <GlassCard className="p-6 sm:p-10 hover:border-accent-blue/20 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-accent-gold text-xs font-medium tracking-wider uppercase">{study.industry}</span>
                    </div>

                    <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2">{study.client}</h3>
                    <p className="text-lg text-accent-blue font-medium mb-4">{study.headline}</p>
                    <p className="text-light-300/60 leading-relaxed mb-8 max-w-3xl">{study.description}</p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-4 mb-6">
                      {study.results.map((result) => (
                        <div key={result.label} className="text-center glass rounded-xl px-1.5 py-3 sm:p-4">
                          <div className="text-xs sm:text-2xl md:text-3xl font-heading font-bold text-gradient mb-1 leading-tight">
                            {result.metric}
                          </div>
                          <div className="text-[11px] sm:text-xs text-light-300/50 leading-tight">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Services used */}
                    <div className="flex flex-wrap gap-2">
                      {study.services.map((svc) => (
                        <span key={svc} className="px-3 py-1 rounded-full text-xs text-light-300/50 border border-dark-700/50">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
