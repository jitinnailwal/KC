'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface WhyChooseItem {
  title: string;
  subtitle: string;
  description: string;
}

export interface SupportItem {
  title: string;
  description: string;
}

export interface CaseStudy {
  title: string;
  challenge: string;
  result: string;
  highlight?: string;
}

export interface ServicePageData {
  badge: string;
  headline: string;
  headlineGradient: string;
  heroDescription: string;
  whatIsTitle: string;
  whatIsContent: string[];
  whyNeededTitle: string;
  whyNeededContent: string[];
  services: ServiceOffering[];
  whyChoose: WhyChooseItem[];
  support: SupportItem[];
  caseStudy: CaseStudy;
  tactics: string[];
  ctaTitle: string;
  ctaDescription: string;
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.why-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.why-grid', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.08) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              {data.badge}
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text={data.headline} />
              <br />
              <span className="text-gradient">
                <AnimatedText text={data.headlineGradient} delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {data.heroDescription}
            </motion.p>
          </div>
        </section>

        {/* What Is + Why Needed */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Understanding
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-6">
                {data.whatIsTitle}
              </h2>
              {data.whatIsContent.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-light-300/70 leading-relaxed mb-4"
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Why It Matters
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-6">
                {data.whyNeededTitle}
              </h2>
              {data.whyNeededContent.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-light-300/70 leading-relaxed mb-4"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                What We Offer
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Our <span className="text-gradient">Services</span>
              </h2>
            </div>

            <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.services.map((svc, i) => (
                <div key={svc.title} className="svc-card">
                  <GlassCard className="p-6 h-full group hover:border-accent-blue/20 transition-all duration-300">
                    <span className="text-accent-blue/40 font-heading font-bold text-sm mb-3 block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-semibold text-lg mb-3">{svc.title}</h3>
                    <p className="text-sm text-light-300/60 leading-relaxed">{svc.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Why Us
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Why Choose <span className="text-gradient">Kreative Catalyst?</span>
              </h2>
            </div>

            <div className="why-grid grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {data.whyChoose.map((item) => (
                <div key={item.title} className="why-card">
                  <GlassCard className="p-6 h-full">
                    <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-accent-gold text-sm font-medium mb-3">{item.subtitle}</p>
                    <p className="text-sm text-light-300/60 leading-relaxed">{item.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">
                We&apos;ve Got Your Back, <span className="text-gradient">Every Step</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {data.support.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-light-300/60 leading-relaxed">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Case Study
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">
                {data.caseStudy.title}
              </h2>
            </div>
            <GlassCard className="p-6 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3 text-accent-gold">The Challenge</h3>
                  <p className="text-light-300/70 leading-relaxed">{data.caseStudy.challenge}</p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3 text-accent-blue">The Result</h3>
                  <p className="text-light-300/70 leading-relaxed">{data.caseStudy.result}</p>
                  {data.caseStudy.highlight && (
                    <p className="mt-4 text-lg font-heading font-bold text-gradient">{data.caseStudy.highlight}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Tactics */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">
                Tactics <span className="text-gradient">We Use</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {data.tactics.map((tactic) => (
                <span
                  key={tactic}
                  className="px-5 py-2.5 rounded-full text-sm text-light-300/80 border border-dark-700/50 hover:border-accent-blue/30 transition-colors"
                >
                  {tactic}
                </span>
              ))}
            </div>
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
              {data.ctaTitle}
            </h2>
            <p className="text-light-300/60 mb-8">{data.ctaDescription}</p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Get Started Today
            </a>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
