'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import BookCallModal from '@/components/ui/BookCallModal';
import FaqItem from '@/components/ui/FaqItem';

const services = [
  {
    title: 'SEO Services in USA',
    description: 'Search remains one of the most consistent ways to attract people already looking for a solution. A local service company wants phone calls. A B2B company wants qualified inquiries. An eCommerce brand wants sales. The strategy behind each one looks different. Our SEO work covers everything from technical improvements and content planning to local search visibility and authority building. The goal is simple: help your business get found by people already searching for what you offer.',
    href: '/services/seo-services',
    linkLabel: 'Learn more about our SEO Services',
  },
  {
    title: 'Performance Marketing',
    description: 'There are situations where waiting months isn\'t practical. When businesses need leads faster, paid advertising often becomes part of the conversation. We manage Google Ads and Meta Ads campaigns with a close eye on lead quality, conversion rates, and actual business outcomes. More clicks don\'t matter if they don\'t turn into opportunities.',
  },
  {
    title: 'AI Search Optimization',
    description: 'The way people search is changing. Instead of scrolling through ten blue links, many users now ask questions directly inside ChatGPT, Gemini, Google AI Overviews, and other AI-powered tools. Businesses are starting to ask: "Will people find us when they ask AI platforms about our industry?" We help businesses improve the signals, content structure, and authority that influence how brands are surfaced across modern search experiences.',
  },
  {
    title: 'Website Development',
    description: 'A website shouldn\'t feel like an online brochure. It should answer questions, build trust, remove friction, and make it easy for visitors to take the next step. Whether we\'re improving an existing website or building something new, the focus stays the same: create a site that supports business growth rather than simply looking good.',
    href: '/services/website-design-development',
    linkLabel: 'Explore our Website Development Services',
  },
  {
    title: 'Digital PR',
    description: 'Visibility isn\'t only about rankings. The businesses that earn attention often have strong credibility behind them. Digital PR helps strengthen that credibility through industry mentions, brand exposure, and authoritative references that support both search visibility and trust.',
    href: '/services/digital-pr-services',
    linkLabel: 'Learn more about our Digital PR Services',
  },
];

const industries = [
  'SaaS & Technology',
  'Healthcare',
  'eCommerce',
  'Professional Services',
  'Real Estate',
  'Manufacturing',
  'Home Services',
  'B2B Businesses',
];

const faqs = [
  {
    question: 'Do you work with businesses across the United States?',
    answer: 'Yes. We work with businesses in different states and industries, supporting both local and national growth strategies.',
  },
  {
    question: 'Do you only offer SEO?',
    answer: 'No. SEO is often one piece of a larger growth strategy. Depending on the business, that may also include paid advertising, website improvements, AI search optimization, or Digital PR.',
  },
  {
    question: 'Can you help with local SEO?',
    answer: 'Yes. Local SEO remains one of the most effective channels for businesses that rely on customers within a specific city, region, or service area.',
  },
  {
    question: 'Why are businesses talking about AI Search Optimization?',
    answer: 'Because customer behavior is changing. More people are using AI-powered tools to research products, services, and companies before making decisions. Businesses want to ensure they\'re visible in those conversations.',
  },
];

export default function UsaPage() {
  const [callModalOpen, setCallModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div>
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
              USA
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Digital Marketing" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="Agency in USA" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Not every business needs more traffic. Sometimes the real problem is that the wrong people are finding your website. Sometimes traffic is coming in, but inquiries aren&apos;t. In other cases, the website looks fine, rankings look decent, but growth has stalled.
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-4 md:py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4 text-light-300/70 leading-relaxed"
          >
            <p>We&apos;ve seen all three.</p>
            <p>
              At Kreative Catalyst, we work with businesses that want marketing tied to actual business goals, not just reports filled with impressions, clicks, and percentages.
            </p>
            <p>
              Some clients come to us because they aren&apos;t ranking for important searches. Others are spending money on ads without seeing enough return. Some have built a strong business offline and are finally ready to take their online presence seriously.
            </p>
            <p>The challenge is rarely the same, which is why the solution shouldn&apos;t be either.</p>
          </motion.div>
        </section>

        {/* Services */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Our Services in USA
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                What We <span className="text-gradient">Help With</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 h-full group hover:border-accent-blue/20 transition-all duration-300 flex flex-col">
                    <span className="text-accent-blue/40 font-heading font-bold text-sm mb-3 block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-semibold text-lg mb-3">{svc.title}</h3>
                    <p className="text-sm text-light-300/60 leading-relaxed flex-1">{svc.description}</p>
                    {svc.href && (
                      <Link
                        href={svc.href}
                        className="text-accent-blue text-sm font-medium hover:underline mt-4 inline-block"
                        data-cursor="pointer"
                      >
                        {svc.linkLabel} →
                      </Link>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
                Who We <span className="text-gradient">Work With</span>
              </h2>
              <p className="text-light-300/60 max-w-2xl mx-auto leading-relaxed">
                Over the years, we&apos;ve worked with businesses at different stages of growth. Some are early-stage startups trying to gain traction. Others are established companies looking for a stronger online presence.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, i) => (
                <motion.span
                  key={industry}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-5 py-2.5 rounded-full text-sm text-light-300/80 border border-dark-700/50 glass"
                >
                  {industry}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-light-300/60 max-w-2xl mx-auto mt-8 leading-relaxed"
            >
              The industries vary, but the objective is usually the same: attract better opportunities and create a more predictable flow of business.
            </motion.p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-6 sm:p-10 text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Why Businesses Choose <span className="text-gradient">Kreative Catalyst</span>
              </h2>
              <div className="space-y-3 text-light-300/60 leading-relaxed max-w-2xl mx-auto">
                <p>Most companies aren&apos;t looking for another marketing vendor. They want someone who understands the numbers behind the business.</p>
                <p>They want honest conversations, realistic expectations, and strategies built around growth instead of vanity metrics.</p>
                <p>That&apos;s the approach we&apos;ve always preferred.</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
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
              What&apos;s the <span className="text-gradient">Next Step?</span>
            </h2>
            <p className="text-light-300/60 mb-3">
              If you&apos;re considering SEO, paid advertising, website improvements, or AI search visibility, the first step is understanding where the biggest opportunity exists.
            </p>
            <p className="text-light-300/60 mb-8">
              We&apos;ll review your current position, identify gaps, and discuss practical ways to improve visibility, leads, and revenue.
            </p>
            <button
              onClick={() => setCallModalOpen(true)}
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Book a Free Consultation
            </button>
          </motion.div>
        </section>

        <Footer />
        <BookCallModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
      </div>
    </>
  );
}
