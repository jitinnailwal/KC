'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimatedText from '@/components/ui/AnimatedText';

export default function CTA() {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  return (
    <section id="contact" className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Animated background gradients — static on mobile for scroll perf */}
      <div className="absolute inset-0">
        {isMobile ? (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(79,140,255,0.08) 0%, transparent 60%)',
            }}
          />
        ) : (
          <motion.div
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 50%, rgba(79,140,255,0.1) 0%, transparent 60%)',
                'radial-gradient(ellipse at 80% 50%, rgba(200,169,106,0.1) 0%, transparent 60%)',
                'radial-gradient(ellipse at 50% 30%, rgba(79,140,255,0.1) 0%, transparent 60%)',
                'radial-gradient(ellipse at 20% 50%, rgba(79,140,255,0.1) 0%, transparent 60%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          />
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-6 block"
        >
          Start a Project
        </motion.span>

        <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
          <AnimatedText text="Ready to create" />
          <br />
          <span className="text-gradient">
            <AnimatedText text="something extraordinary?" delay={0.2} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-lg text-light-300/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Let&apos;s discuss your vision and turn it into reality. Whether it&apos;s a brand
          refresh, a new platform, or a creative campaign — we&apos;re ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="mailto:hello@kreativecatalyst.com">
            <span className="px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-sm sm:text-lg inline-block hover:shadow-2xl hover:shadow-accent-blue/30 transition-shadow">
              hello@kreativecatalyst.com
            </span>
          </MagneticButton>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent"
        />
      </div>
    </section>
  );
}
