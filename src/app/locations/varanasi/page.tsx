'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import BookCallModal from '@/components/ui/BookCallModal';

const services = [
  { title: 'SEO Services', description: 'Boost your visibility in Varanasi\'s growing digital market with targeted SEO strategies that drive organic traffic.' },
  { title: 'Social Media Marketing', description: 'Connect with Varanasi\'s vibrant community through engaging social media campaigns across all platforms.' },
  { title: 'Google Ads', description: 'Reach high-intent customers in Varanasi and eastern UP with precisely targeted PPC advertising.' },
  { title: 'Content Marketing', description: 'Content strategies that capture the essence of your brand and resonate with the local audience.' },
  { title: 'Website Development', description: 'Professional, conversion-optimized websites designed to help Varanasi businesses thrive online.' },
  { title: 'WhatsApp Marketing', description: 'Leverage WhatsApp to build direct relationships with your Varanasi customer base.' },
];

const highlights = [
  { title: 'Local Market Knowledge', description: 'We understand Varanasi\'s unique business landscape, from traditional industries to emerging startups, and craft strategies accordingly.' },
  { title: 'Growing Digital Economy', description: 'Varanasi\'s digital market is expanding rapidly. We help businesses capitalize on this growth with forward-thinking digital strategies.' },
  { title: 'Personalized Approach', description: 'Every Varanasi business is unique. We provide customized marketing solutions that align with your specific goals and budget.' },
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
              Kreative Catalyst brings world-class digital marketing to Varanasi. We help local businesses build a strong online presence with SEO, social media, paid ads, and more.
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
                Our Services in Varanasi
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
                Why Choose Us <span className="text-gradient">in Varanasi?</span>
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
              Ready to grow your business <span className="text-gradient">in Varanasi?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Partner with Kreative Catalyst and unlock your digital potential in Varanasi and beyond.
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
