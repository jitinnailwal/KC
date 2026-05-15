'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';

const triplePlayPillars = [
  {
    title: 'SEO',
    subtitle: 'Organic Foundation',
    description:
      'Build a strong organic foundation with keyword-optimized content, technical SEO, and authority building. SEO drives long-term, sustainable traffic that compounds over time.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Meta Ads',
    subtitle: 'Social Discovery',
    description:
      'Leverage Facebook and Instagram ads for brand awareness and demand generation. Meta Ads reach users in discovery mode, creating interest before they even search.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    title: 'Google Ads',
    subtitle: 'Intent Capture',
    description:
      'Capture high-intent searches with Google Search and Shopping campaigns. When users are actively looking for your product, Google Ads ensures you\'re right there.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

export default function TriplePlayModelPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        {/* Triple Play Model */}
        <section id="triple-play" className="pt-32 pb-16 md:pt-40 md:pb-32 px-4 sm:px-6 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Our Approach
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
                The <span className="text-gradient">Triple Play Model</span>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-light-300/60 text-lg max-w-2xl mx-auto"
              >
                A unified system that combines three powerful channels into one cohesive strategy.
                Instead of running isolated campaigns, we create synergies that multiply your results.
              </motion.p>
            </div>

            {/* Three Pillars */}
            <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {triplePlayPillars.map((pillar) => (
                <div key={pillar.title} className="pillar-card">
                  <GlassCard className="p-6 sm:p-8 text-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-4 text-accent-blue">
                      {pillar.icon}
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-1">{pillar.title}</h3>
                    <p className="text-accent-gold text-sm font-medium mb-4">{pillar.subtitle}</p>
                    <p className="text-light-300/60 text-sm leading-relaxed">{pillar.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>

            {/* Synergy Explanation */}
            <GlassCard className="p-6 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-heading font-bold text-2xl mb-4">
                    Why it works <span className="text-gradient">together</span>
                  </h3>
                  <div className="space-y-4 text-light-300/60 leading-relaxed">
                    <p>
                      Most agencies treat SEO, Meta Ads, and Google Ads as separate silos. We don&apos;t.
                      The Triple Play Model creates a flywheel effect where each channel reinforces the others.
                    </p>
                    <p>
                      Meta Ads generate awareness and demand. Google Ads capture that high-intent search traffic.
                      SEO builds the long-term organic foundation that reduces your ad dependency over time.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Lower Customer Acquisition Cost', desc: 'Multi-channel attribution reduces wasteful spending' },
                    { title: 'Compound Growth', desc: 'SEO builds equity while ads deliver immediate results' },
                    { title: 'Full Funnel Coverage', desc: 'Awareness \u2192 Consideration \u2192 Conversion \u2192 Retention' },
                    { title: 'Data Synergies', desc: 'Insights from each channel improve the others' },
                  ].map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-light-300">{benefit.title}</div>
                        <div className="text-xs text-light-300/40">{benefit.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Want results like these for <span className="text-gradient">your business?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Let&apos;s talk about how the Triple Play Model can work for your brand.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Book A Free Call
            </a>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
