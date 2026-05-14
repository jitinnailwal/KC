'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'SEO Services',
    slug: 'seo-services',
    tagline: 'Struggling to be seen online?',
    description:
      'We help your business rank higher on Google through proven SEO strategies. From keyword research and on-page optimization to technical SEO and link building, we ensure your website attracts organic traffic that converts.',
    offerings: ['Keyword Research & Strategy', 'On-Page SEO Optimization', 'Technical SEO Audits', 'Link Building & Authority', 'Local SEO', 'SEO Content Strategy'],
    why: 'Our data-driven approach to SEO has helped clients achieve first-page rankings and significant organic traffic growth. We focus on sustainable, white-hat techniques that deliver long-term results.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    tagline: 'Make your brand resonate in the social sphere.',
    description:
      'We create and manage impactful social media campaigns across Instagram, Facebook, LinkedIn, and more. Our strategies are designed to build brand awareness, grow your community, and drive real engagement.',
    offerings: ['Social Media Strategy', 'Content Creation & Design', 'Community Management', 'Influencer Partnerships', 'Social Media Advertising', 'Analytics & Reporting'],
    why: 'We understand the nuances of each platform and create tailored content that speaks to your audience. Our campaigns don\'t just get likes — they drive business results.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    title: 'Google Ads / PPC',
    slug: 'google-ads-services',
    tagline: 'Reach your ideal customers instantly.',
    description:
      'Our Google Ads specialists create high-performing campaigns that maximize your return on ad spend. From search and shopping to display and remarketing, we manage every aspect of your paid advertising.',
    offerings: ['Google Search Campaigns', 'Google Shopping Ads', 'Display & Banner Ads', 'YouTube Video Ads', 'Remarketing Campaigns', 'Conversion Rate Optimization'],
    why: 'With clients achieving up to 14X ROAS, our PPC management delivers measurable results. We continuously optimize bids, keywords, and creatives to reduce cost per acquisition.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Content Marketing',
    slug: 'content-marketing',
    tagline: 'Content that drives traffic and leads.',
    description:
      'We create compelling content that positions your brand as an industry authority. From blog posts and articles to video scripts and lead magnets, every piece is optimized for both engagement and SEO.',
    offerings: ['Blog Writing & Management', 'Video Content Strategy', 'Copywriting & Brand Voice', 'Email Marketing Content', 'Lead Magnets & eBooks', 'Content Calendar Planning'],
    why: 'Our content strategies are built on data and audience insights. We create content that ranks, resonates, and converts — turning readers into customers.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    title: 'WhatsApp Marketing',
    slug: 'whatsapp-marketing',
    tagline: 'Stop sending messages that get ignored.',
    description:
      'Leverage WhatsApp\'s massive user base with targeted messaging campaigns. We design personalized broadcast campaigns, automated chatbots, and engagement flows that drive real conversations and conversions.',
    offerings: ['Broadcast Campaigns', 'Chatbot Development', 'Automated Workflows', 'Customer Engagement Flows', 'Catalog Integration', 'Performance Analytics'],
    why: 'WhatsApp has a 98% open rate — far higher than email. Our campaigns leverage this with personalized messaging that feels natural, not spammy, driving higher engagement and sales.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    title: 'Website Design & Development',
    slug: 'website-design-development',
    tagline: 'Your website should sell, not just sit there.',
    description:
      'We build beautiful, high-converting websites that are fast, mobile-responsive, and optimized for search engines. Whether you need a landing page, e-commerce store, or a full corporate website, we deliver.',
    offerings: ['Custom Website Design', 'E-Commerce Development', 'Landing Page Design', 'WordPress / CMS Sites', 'Website Redesign', 'Performance Optimization'],
    why: 'Our websites aren\'t just visually stunning — they\'re built to convert. We combine modern design with technical excellence to create sites that rank, load fast, and turn visitors into customers.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Digital PR Services',
    slug: 'digital-pr-services',
    tagline: 'Build Trust Beyond Ads',
    description:
      'Strong brands don\'t just run campaigns. They get noticed, mentioned, and talked about. We help businesses improve online visibility through Digital PR strategies focused on media coverage, brand authority, online reputation, and high-quality digital presence.',
    offerings: ['Media Outreach & Publications', 'Founder PR & Personal Branding', 'Press Release Distribution', 'SEO PR & Backlink Building', 'Online Reputation Management', 'Brand Visibility Campaigns'],
    why: 'We focus on building credibility that supports long-term growth. From media mentions to authority-building strategies, our Digital PR approach helps businesses improve trust, search visibility, and online reputation across digital platforms.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-detail-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-detail-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={sectionRef}>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,140,255,0.08) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              Our Services
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Everything your brand" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="needs to grow online" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto"
            >
              From SEO to social media, Google Ads to website development — we offer comprehensive digital marketing solutions tailored to your business goals.
            </motion.p>
          </div>
        </section>

        {/* Services Detail */}
        <section id="all-services" className="py-8 md:py-16 px-4 sm:px-6 scroll-mt-24">
          <div className="services-detail-grid max-w-6xl mx-auto space-y-8 md:space-y-12">
            {services.map((service) => (
              <Link key={service.title} href={`/services/${service.slug}`} id={service.slug} className="service-detail-card scroll-mt-24 block group" data-cursor="pointer">
                <GlassCard className="p-6 sm:p-10 group-hover:border-accent-blue/20 transition-all duration-300">
                  <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
                    {/* Left */}
                    <div>
                      <div className="text-accent-blue/60 mb-4">{service.icon}</div>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2 group-hover:text-accent-blue transition-colors">{service.title}</h2>
                      <p className="text-accent-gold text-sm font-medium mb-4">{service.tagline}</p>
                      <p className="text-light-300/70 leading-relaxed">{service.description}</p>
                    </div>

                    {/* Right */}
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-4 text-light-300">Key Offerings</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {service.offerings.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-light-300/60">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue shrink-0">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="glass rounded-xl p-4">
                        <h4 className="font-heading font-semibold text-sm text-accent-blue mb-2">Why Kreative Catalyst?</h4>
                        <p className="text-sm text-light-300/50 leading-relaxed">{service.why}</p>
                      </div>
                    </div>
                  </div>

                  {/* View Details arrow */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-accent-blue/60 group-hover:text-accent-blue transition-colors">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </Link>
            ))}
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
              Ready to <span className="text-gradient">grow your business?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Book a free consultation call and let&apos;s discuss how we can help you achieve your digital marketing goals.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Book A Free Call
            </a>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
