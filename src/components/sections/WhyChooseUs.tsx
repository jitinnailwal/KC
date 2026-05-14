'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

const features = [
  {
    title: 'Pixel-Perfect Craft',
    description: 'Every detail is considered. We obsess over the micro-interactions that create memorable experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Performance First',
    description: 'Lightning-fast load times and silky-smooth animations. We build for speed without compromising beauty.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Strategic Thinking',
    description: 'Design with purpose. Every creative decision is backed by strategy and focused on measurable results.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Future-Ready Tech',
    description: 'Built on modern architecture. Scalable, maintainable, and ready for what comes next.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  },
  {
    title: 'Seamless Collaboration',
    description: 'Transparent process, regular check-ins, and a partnership approach that keeps you in the loop.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Award-Winning Design',
    description: 'Recognized by industry leaders. Our work speaks for itself with numerous design accolades.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Why Choose Us
          </motion.span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            <AnimatedText text="What sets us" />
            <br />
            <span className="text-gradient">
              <AnimatedText text="apart" delay={0.2} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <GlassCard key={feature.title} delay={i * 0.1} className="group">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-4 group-hover:bg-accent-blue/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-light-300/50 text-sm leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
