'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '100+', label: 'Campaigns Delivered' },
  { number: '10X', label: 'Average ROAS' },
  { number: '50+', label: 'Happy Clients' },
  { number: '3+', label: 'Cities Served' },
];

const values = ['Integrity', 'Innovation', 'Excellence', 'Collaboration', 'Accountability'];

export default function About() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

    // On mobile, use CSS animation for ticker to avoid scrollWidth forced reflow
    if (isMobile && tickerRef.current) {
      const ticker = tickerRef.current;
      // Measure once, then use CSS animation
      const tickerWidth = ticker.scrollWidth / 2;
      ticker.style.setProperty('--ticker-width', `-${tickerWidth}px`);
      ticker.classList.add('ticker-css-animate');
    }

    const ctx = gsap.context(() => {
      // Infinite horizontal ticker — GSAP on desktop only
      if (!isMobile && tickerRef.current) {
        const ticker = tickerRef.current;
        const tickerWidth = ticker.scrollWidth / 2;

        const tickerAnim = gsap.to(ticker, {
          x: -tickerWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
        });

        // Pause ticker when section is off-screen to save GPU
        ScrollTrigger.create({
          trigger: ticker,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => tickerAnim.play(),
          onLeave: () => tickerAnim.pause(),
          onEnterBack: () => tickerAnim.play(),
          onLeaveBack: () => tickerAnim.pause(),
        });
      }

      // Staggered stat cards entrance
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full -translate-y-1/2 -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(79,140,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 md:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              About Us
            </motion.span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
              <AnimatedText text="Your strategic" />
              <br />
              <AnimatedText text="digital marketing" delay={0.2} />
              <br />
              <span className="text-gradient">
                <AnimatedText text="partner" delay={0.4} />
              </span>
            </h2>
          </div>

          <div className="lg:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-light-300 text-lg leading-relaxed mb-6"
            >
              Kreative Catalyst is a dynamic team of young entrepreneurs passionate
              about helping businesses thrive in the digital landscape. We combine
              data-driven strategies with creative excellence to deliver measurable
              results for our clients.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-light-300/60 leading-relaxed"
            >
              Our vision is to be a leading digital marketing agency recognized for
              excellence and innovation. From SEO to social media, Google Ads to
              content marketing — we build unified strategies that drive real revenue
              for businesses across India.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-20">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-card">
              <GlassCard delay={i * 0.1} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-light-300/60">{stat.label}</div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Values infinite ticker */}
        <div className="overflow-hidden py-4">
          <div ref={tickerRef} className="flex gap-8 w-max" style={{ willChange: 'transform' }}>
            {[...values, ...values, ...values, ...values].map((value, i) => (
              <div key={i} className="flex items-center gap-8 shrink-0">
                <span className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold text-dark-700/50 whitespace-nowrap">
                  {value}
                </span>
                <span className="w-3 h-3 rounded-full bg-accent-blue/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
