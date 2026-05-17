'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';

const services = [
  {
    number: '01',
    title: 'SEO Services',
    slug: 'seo-services',
    description: 'Struggling to be seen online? We optimize your website with keyword research, technical SEO, and content strategies to rank higher.',
    tags: ['Keyword Research', 'Technical SEO', 'On-Page SEO', 'Link Building'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    description: 'Make your brand resonate in the social sphere. We craft engaging content and campaigns that build community and drive engagement.',
    tags: ['Instagram', 'Facebook', 'LinkedIn', 'Content Strategy'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Google Ads / PPC',
    slug: 'google-ads-ppc',
    description: 'Reach your ideal customers instantly. We manage high-ROI Google Search & Shopping campaigns that convert clicks into revenue.',
    tags: ['Search Ads', 'Shopping Ads', 'Display Ads', 'Remarketing'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Content Marketing',
    slug: 'content-marketing',
    description: 'Content that drives traffic and leads. We create blogs, videos, and resources that position your brand as an industry authority.',
    tags: ['Blog Writing', 'Video Content', 'Copywriting', 'Lead Magnets'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'WhatsApp Marketing',
    slug: 'whatsapp-marketing',
    description: 'Stop sending messages that get ignored. We design WhatsApp campaigns with personalized messaging that drives real conversations.',
    tags: ['Broadcast Campaigns', 'Chatbots', 'Automation', 'Customer Engagement'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Website Design & Dev',
    slug: 'website-development',
    description: 'Your website should sell, not just sit there. We build high-converting, fast, and beautiful websites tailored to your business.',
    tags: ['Custom Design', 'E-Commerce', 'Landing Pages', 'CMS'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

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
          '.service-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.services-grid',
              start: 'top 90%',
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

  return (
    <section ref={sectionRef} id="services" className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,169,106,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            What We Do
          </motion.span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            <span className="hidden md:inline"><AnimatedText text="Digital marketing" /></span>
            <span className="md:hidden">Digital marketing</span>
            <br />
            <span className="text-gradient">
              <span className="hidden md:inline"><AnimatedText text="that delivers results" delay={0.2} /></span>
              <span className="md:hidden">that delivers results</span>
            </span>
          </h2>
        </div>

        {/* Service Cards */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => (
            <a
              key={service.number}
              href={`/services#${service.slug}`}
              className="service-card glass rounded-2xl p-5 sm:p-8 group hover:border-accent-blue/20 transition-all duration-500 relative overflow-hidden"
              data-cursor="pointer"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,140,255,0.05) 0%, rgba(200,169,106,0.03) 100%)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-accent-blue/40 group-hover:text-accent-blue transition-colors duration-500">
                    {service.icon}
                  </div>
                  <span className="font-heading text-sm text-dark-700 group-hover:text-accent-blue/50 transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-2xl mb-3 group-hover:text-gradient-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-light-300/60 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs text-light-300/40 border border-dark-700/50 group-hover:border-accent-blue/20 group-hover:text-light-300/60 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-dark-700/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-accent-blue/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA to services page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-16"
        >
          <a
            href="/services#all-services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-accent-blue/30 text-accent-blue font-medium hover:bg-accent-blue/5 transition-all duration-300"
            data-cursor="pointer"
          >
            View All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
