'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

const contactInfo = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 7860629745',
    href: 'tel:+917860629745',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'info@kreativecatalyst.in',
    href: 'mailto:info@kreativecatalyst.in',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Address',
    value: '274, Saket, New Delhi 110070',
    href: 'https://maps.google.com/?q=274+Saket+New+Delhi+110070',
  },
];

const serviceAreas = ['Delhi', 'Varanasi', 'Bangalore'];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap')['gsap']['context']> | null = null;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          '.contact-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-grid',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, sectionRef);
    };

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Get In Touch
          </motion.span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            <span className="hidden md:inline"><AnimatedText text="Let's grow your" /></span>
            <span className="md:hidden">Let&apos;s grow your</span>
            <br />
            <span className="text-gradient">
              <span className="hidden md:inline"><AnimatedText text="business together" delay={0.2} /></span>
              <span className="md:hidden">business together</span>
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info */}
          <div className="pb-6 border-b border-dark-700/20 lg:pb-0 lg:border-b-0">
            <div className="contact-grid space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Address' ? '_blank' : undefined}
                  rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
                  className="contact-card glass rounded-xl p-5 flex items-center gap-4 group hover:border-accent-blue/20 transition-all duration-300 block"
                  data-cursor="pointer"
                >
                  <div className="text-accent-blue/60 group-hover:text-accent-blue transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-light-300/70 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-light-300 group-hover:text-light transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Service Areas */}
            <div className="glass rounded-xl p-5">
              <div className="text-xs text-light-300/70 uppercase tracking-wider mb-3">We Serve</div>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 rounded-full text-sm text-light-300/80 border border-dark-700/50"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <GlassCard className="p-6 sm:p-8">
            <h3 className="font-heading font-semibold text-xl mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/30 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 disabled:opacity-50"
                data-cursor="pointer"
              >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
