'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import BookCallModal from '@/components/ui/BookCallModal';

// Page content pending — sections (services, industries, FAQ) will be added
// once the UAE copy is finalised. Keep the hero + CTA so the route is live.
export default function UaePage() {
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
              United Arab Emirates
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Digital Marketing" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="Agency in UAE" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Kreative Catalyst brings results-driven digital marketing to businesses across the UAE. SEO, paid advertising, content, and web development — all tied to real business outcomes.
            </motion.p>
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
              Ready to grow your business <span className="text-gradient">in the UAE?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Partner with Kreative Catalyst and unlock your digital potential in the UAE and beyond.
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
