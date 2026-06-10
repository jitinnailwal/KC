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
    title: 'SEO Services',
    description: 'Improve your Google rankings and attract customers actively searching for your products and services. Our SEO strategies focus on visibility, organic traffic, and long-term growth.',
    href: '/services/seo-services',
    linkLabel: 'Learn more about our SEO Services',
  },
  {
    title: 'Google Ads',
    description: 'Reach high-intent customers with targeted Google Ads campaigns designed to generate quality leads and maximize return on investment.',
  },
  {
    title: 'Social Media Marketing',
    description: 'Build brand awareness and engage your audience through strategic social media campaigns across platforms like Instagram, Facebook, and LinkedIn.',
  },
  {
    title: 'Website Development',
    description: 'We create responsive, user-friendly websites designed to deliver a seamless experience and convert visitors into customers.',
    href: '/services/website-design-development',
    linkLabel: 'Explore our Website Development Services',
  },
  {
    title: 'Content Marketing',
    description: 'From website content to blogs and landing pages, we help businesses communicate effectively while improving search visibility.',
  },
  {
    title: 'WhatsApp Marketing',
    description: 'Connect directly with customers through personalized WhatsApp campaigns that support engagement and lead generation.',
  },
];

const highlights = [
  {
    title: 'Local Market Understanding',
    description: 'We understand the unique business environment of Varanasi and create strategies aligned with local customer behavior.',
  },
  {
    title: 'Customized Strategies',
    description: 'Every business has different goals. Our solutions are tailored to your industry, audience, and growth objectives.',
  },
  {
    title: 'Results-Focused Approach',
    description: 'We focus on generating meaningful outcomes, including increased traffic, better rankings, and more qualified leads.',
  },
  {
    title: 'Complete Digital Marketing Support',
    description: 'From SEO and paid advertising to content creation and website development, we provide everything under one roof.',
  },
];

const industries = [
  'Banarasi Saree & Textile Businesses',
  'Healthcare & Clinics',
  'Educational Institutions',
  'Hotels & Tourism Companies',
  'Real Estate Businesses',
  'Retail Stores & eCommerce Brands',
  'Professional Service Providers',
];

const faqs = [
  {
    question: 'Do you provide SEO services in Varanasi?',
    answer: 'Yes, we offer SEO solutions focused on improving search rankings, organic traffic, and lead generation.',
  },
  {
    question: 'Can you manage Google Ads campaigns?',
    answer: 'Yes, we create and manage Google Ads campaigns designed to generate quality leads and measurable results.',
  },
  {
    question: 'Which industries do you work with?',
    answer: 'We work with businesses across retail, healthcare, education, hospitality, manufacturing, real estate, and professional services.',
  },
  {
    question: 'Do you offer website development services?',
    answer: 'Yes, we design and develop modern, responsive websites optimized for performance and conversions.',
  },
];

export default function VaranasiPage() {
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
              Varanasi
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Digital Marketing" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="Agency in Varanasi" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Kreative Catalyst helps businesses in Varanasi grow online through SEO, Google Ads, Social Media Marketing, Website Development, Content Marketing, and WhatsApp Marketing. We work with startups, local businesses, manufacturers, healthcare providers, educational institutions, and growing brands looking to increase visibility, generate leads, and improve their online presence.
            </motion.p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-4 md:py-8 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-light-300/70 leading-relaxed text-center"
          >
            <p>
              As more customers search online before making a purchase, businesses need a strong digital strategy to stay competitive. Our team creates customized marketing solutions designed to attract the right audience and drive measurable growth.
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
                Our Digital Marketing Services in Varanasi
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

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Why Businesses Choose <span className="text-gradient">Kreative Catalyst</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <GlassCard className="p-6 h-full">
                    <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-light-300/60 leading-relaxed">{item.description}</p>
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
                Industries We <span className="text-gradient">Serve</span>
              </h2>
              <p className="text-light-300/60 max-w-2xl mx-auto leading-relaxed">
                We work with businesses across multiple sectors, including:
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

        {/* Growth section */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-6 sm:p-10 text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Helping Varanasi Businesses <span className="text-gradient">Grow Online</span>
              </h2>
              <p className="text-light-300/60 mb-4 max-w-2xl mx-auto leading-relaxed">
                Digital marketing helps businesses connect with customers where they spend most of their time online. Whether your goal is to improve search rankings, generate inquiries, increase website traffic, or strengthen your brand presence, our team develops strategies focused on sustainable growth.
              </p>
              <p className="text-light-300/60 max-w-2xl mx-auto leading-relaxed">
                Learn more about our{' '}
                <Link href="/services/seo-services" className="text-accent-blue hover:underline" data-cursor="pointer">
                  SEO Services
                </Link>{' '}
                and{' '}
                <Link href="/services/website-design-development" className="text-accent-blue hover:underline" data-cursor="pointer">
                  Website Development Services
                </Link>{' '}
                to see how we help businesses build a stronger digital presence.
              </p>
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

        {/* Contact Info */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-6 sm:p-10 text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Serving <span className="text-gradient">Varanasi</span>
              </h2>
              <p className="text-light-300/60 mb-6 max-w-xl mx-auto">
                We serve businesses across Varanasi and eastern Uttar Pradesh. Reach out to discuss how we can help your business grow.
              </p>
              <div className="flex items-center justify-center gap-2 text-light-300/70 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href="tel:+917860629745" className="hover:text-light transition-colors">+91 7860629745</a>
              </div>
              <div className="flex items-center justify-center gap-2 text-light-300/70">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@kreativecatalyst.in" className="hover:text-light transition-colors">info@kreativecatalyst.in</a>
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
              Ready to Grow Your Business <span className="text-gradient">in Varanasi?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Partner with Kreative Catalyst to improve your online visibility, attract more customers, and grow your business through strategic digital marketing solutions.
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
