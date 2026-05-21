'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import BookCallModal from '@/components/ui/BookCallModal';

const services = [
  { title: 'SEO Services', description: 'Rank higher in Bengaluru\'s competitive tech-driven market with advanced SEO strategies built for growth.' },
  { title: 'Social Media Marketing', description: 'Engage Bengaluru\'s tech-savvy, digitally active audience with impactful social media campaigns.' },
  { title: 'Google Ads', description: 'Capture high-value leads in Bengaluru\'s thriving startup and enterprise ecosystem with targeted PPC.' },
  { title: 'Content Marketing', description: 'Position your brand as an industry leader in Bengaluru with strategic, high-quality content.' },
  { title: 'Website Development', description: 'Build fast, modern websites that meet the expectations of Bengaluru\'s tech-forward audience.' },
  { title: 'WhatsApp Marketing', description: 'Drive direct conversions with targeted WhatsApp campaigns for your Bengaluru customer base.' },
];

const highlights = [
  { title: 'Tech Hub Expertise', description: 'Bengaluru is India\'s tech capital. We understand the unique digital landscape and help tech companies, startups, and enterprises thrive online.' },
  { title: 'Startup-Friendly', description: 'From seed-stage startups to scaling enterprises, we offer flexible digital marketing solutions that grow with your Bengaluru business.' },
  { title: 'Data-Driven Results', description: 'We leverage analytics and performance data to continuously optimize campaigns and deliver measurable ROI for Bengaluru businesses.' },
];

export default function BengaluruPage() {
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
              Bengaluru
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Digital Marketing" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="Agency in Bengaluru" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Kreative Catalyst helps Bengaluru businesses scale their digital presence. From SEO and social media to paid ads and web development, we deliver results that matter.
            </motion.p>
          </div>
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
                Our Services in Bengaluru
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
                  <GlassCard className="p-6 h-full group hover:border-accent-blue/20 transition-all duration-300">
                    <span className="text-accent-blue/40 font-heading font-bold text-sm mb-3 block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-semibold text-lg mb-3">{svc.title}</h3>
                    <p className="text-sm text-light-300/60 leading-relaxed">{svc.description}</p>
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
                Why Choose Us <span className="text-gradient">in Bengaluru?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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

        {/* Contact Info */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-6 sm:p-10 text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Serving <span className="text-gradient">Bengaluru</span>
              </h2>
              <p className="text-light-300/60 mb-6 max-w-xl mx-auto">
                We help businesses across Bengaluru and Karnataka build their digital presence. Get in touch to start your growth journey.
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
              Ready to grow your business <span className="text-gradient">in Bengaluru?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Partner with Kreative Catalyst and accelerate your digital growth in India&apos;s tech capital.
            </p>
            <button
              onClick={() => setCallModalOpen(true)}
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Book a Call
            </button>
          </motion.div>
        </section>

        <Footer />
        <BookCallModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
      </div>
    </>
  );
}
