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
    title: 'SEO Services UK',
    description: 'Most business owners already know SEO matters. The difficult part is understanding why a website isn\'t performing as well as it should. Sometimes the issue is technical. Sometimes competitors have built stronger authority over time. In other cases, businesses simply aren\'t targeting the searches their customers are using. Our SEO work focuses on identifying those gaps and helping businesses improve their visibility in a way that makes commercial sense — the strategy should reflect the business, not a generic SEO checklist.',
    href: '/services/seo-services',
    linkLabel: 'Learn more about our SEO Services',
  },
  {
    title: 'Local SEO Services UK',
    description: 'For many businesses, national visibility isn\'t the priority. A solicitor in Manchester, a dental clinic in Birmingham, or a contractor in Leeds doesn\'t need visitors from the other side of the country. They need to be visible to people searching nearby. From Google Business Profile optimisation to local content and citation management, the focus is on helping businesses appear where local customers are already searching.',
  },
  {
    title: 'Performance Marketing Agency UK',
    description: 'There are situations where waiting six months for SEO results isn\'t practical. Sometimes a business needs enquiries sooner. We\'ve spoken to many business owners who were receiving clicks but very few enquiries — in most cases the issue wasn\'t traffic, it was targeting, messaging, landing pages, or tracking. That\'s why we focus on lead quality, conversion rates, and return on investment rather than vanity metrics.',
  },
  {
    title: 'AI Search Optimisation',
    description: 'Search behaviour is starting to look different than it did a few years ago. People still use Google, but they\'re also asking questions inside ChatGPT, reading AI-generated summaries, and finding recommendations through platforms that didn\'t exist a few years ago. AI Search Optimisation focuses on helping businesses build the authority, content structure, and online presence needed to stay relevant as search continues to evolve.',
  },
  {
    title: 'Content Marketing Agency UK',
    description: 'A surprising number of businesses still treat content as an afterthought. The reality is that good content often answers questions before a sales conversation ever happens. Whether someone is researching a service, comparing suppliers, or trying to understand their options, useful content helps build confidence and trust. That\'s why content remains a key part of both SEO and broader digital marketing strategies.',
    href: '/services/content-marketing',
    linkLabel: 'Learn more about our Content Marketing Services',
  },
  {
    title: 'Website Development Company UK',
    description: 'A website doesn\'t need to win design awards. It needs to help people take action. We\'ve seen businesses invest heavily in marketing only to send visitors to websites that are difficult to navigate, slow to load, or unclear about what they actually offer. Our approach to website development focuses on usability, clarity, mobile performance, and creating a better experience for the people using it.',
    href: '/services/website-design-development',
    linkLabel: 'Explore our Website Development Services',
  },
  {
    title: 'Email Marketing',
    description: 'While new channels receive most of the attention, email continues to deliver results for many businesses. It\'s one of the few channels where you have direct access to people who have already shown interest in what you offer. Used properly, email can help nurture leads, maintain customer relationships, and generate repeat business without relying entirely on advertising spend.',
  },
];

const industries = [
  'Professional Services',
  'Healthcare',
  'Construction',
  'Property & Real Estate',
  'SaaS & Technology',
  'eCommerce',
  'Manufacturing',
  'Hospitality',
];

const faqs = [
  {
    question: 'Do you work with businesses across the UK?',
    answer: 'Yes. We work with businesses throughout England, Scotland, Wales, and Northern Ireland.',
  },
  {
    question: 'Do you only provide SEO services?',
    answer: 'No. We support businesses through SEO, local SEO, performance marketing, website development, content marketing, email marketing, and AI Search Optimisation.',
  },
  {
    question: 'Can local businesses benefit from digital marketing?',
    answer: 'Absolutely. Local SEO, paid advertising, and content marketing can all help businesses increase visibility and generate enquiries within their target area.',
  },
  {
    question: 'Why are businesses paying attention to AI Search Optimisation?',
    answer: 'Because customer behaviour is changing. More people are using AI-powered platforms to research products, services, and businesses before making decisions.',
  },
];

export default function UkPage() {
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
              United Kingdom
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Digital Marketing" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="Agency UK" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Many businesses don&apos;t start looking for a marketing agency because everything is going well. Usually, something has changed. Website enquiries have slowed down. Competitors are appearing higher in search results. Advertising costs are rising. Or perhaps referrals alone aren&apos;t bringing in enough opportunities.
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
            <p>We&apos;ve seen all of those situations.</p>
            <p>
              A construction company looking for more project enquiries has different challenges than an eCommerce brand trying to increase online sales. A healthcare practice competes differently than a software company. The details change, but the objective is often the same: attract more of the right customers.
            </p>
            <p>
              At Kreative Catalyst, we work with businesses across the UK that want marketing tied to business outcomes, not just reports full of clicks and impressions.
            </p>
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
                Our Services in the UK
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                What We <span className="text-gradient">Offer</span>
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

        {/* Industries */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
                Industries We <span className="text-gradient">Work With</span>
              </h2>
              <p className="text-light-300/60 max-w-2xl mx-auto leading-relaxed">
                Our clients come from a range of sectors. Every industry is different — what works for one business won&apos;t necessarily work for another, which is why we avoid cookie-cutter marketing plans.
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
                <p>Most businesses aren&apos;t searching for another agency. They&apos;re looking for people who understand the commercial side of marketing.</p>
                <p>The conversation is rarely about rankings alone. It&apos;s about enquiries. It&apos;s about sales. It&apos;s about whether marketing is contributing to growth.</p>
                <p>That&apos;s the lens we prefer to work through.</p>
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
              If you&apos;re considering SEO, performance marketing, a new website, or simply want a clearer understanding of what&apos;s limiting growth, let&apos;s start with a conversation.
            </p>
            <p className="text-light-300/60 mb-8">
              We&apos;ll look at where things stand today, discuss the opportunities available, and identify practical next steps that make sense for your business.
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
