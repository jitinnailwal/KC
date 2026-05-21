'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import BookCallModal from '@/components/ui/BookCallModal';

const coreValues = [
  {
    title: 'Integrity',
    description: 'We conduct our business with honesty and transparency, ensuring that our actions align with our promises and ethical standards.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'We embrace creativity and new ideas, continuously seeking innovative solutions that set us apart from traditional approaches.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We strive for the highest standards in everything we do, delivering exceptional service and results that exceed expectations.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'We value strong partnerships and work closely with our clients to understand their needs and achieve shared goals.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Accountability',
    description: 'We take responsibility for our performance and results, providing clear reporting and honest feedback to ensure transparency.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

const keyStrengths = [
  {
    title: 'Proven Success in SEO',
    description: 'Our track record of achieving impressive search engine rankings demonstrates our expertise in SEO. We use advanced techniques to enhance your website\'s visibility and drive high-quality organic traffic.',
  },
  {
    title: 'Expert SEO Team',
    description: 'Our team comprises seasoned SEO professionals with extensive experience and knowledge. Their expertise ensures that every aspect of your SEO strategy is meticulously handled for maximum effectiveness.',
  },
  {
    title: 'Customized Strategies',
    description: 'We understand that every brand is unique. Our strategies are tailored specifically to your business\'s needs, ensuring relevance and effectiveness in addressing your target audience.',
  },
  {
    title: 'Clear and Honest Reporting',
    description: 'Transparency is a cornerstone of our approach. We provide detailed and straightforward reports that keep you informed about the performance of our strategies and their impact on your business.',
  },
  {
    title: 'Deep Market Insights',
    description: 'Our in-depth understanding of market dynamics allows us to craft strategies that align with current trends and resonate with your target audience, ensuring your brand stays ahead of the curve.',
  },
  {
    title: 'Ethical Marketing Practices',
    description: 'We adhere to the highest standards of ethical conduct in all our campaigns. Our practices are designed to meet industry norms and client expectations, ensuring integrity in every aspect of our work.',
  },
  {
    title: 'Generating Organic Traffic',
    description: 'We focus on driving high-quality, organic traffic to your website. Our strategies are designed to enhance your online presence and foster genuine engagement with your audience.',
  },
  {
    title: 'Dedicated Customer Support',
    description: 'Exceptional support is integral to our service. We are committed to addressing your needs promptly and effectively, ensuring a smooth and successful partnership.',
  },
];

const countries = [
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'UK', flag: '🇬🇧' },
  {
    name: 'India',
    flag: '🇮🇳',
    cities: [
      { city: 'Varanasi', label: 'Digital Marketing Agency in Varanasi' },
      { city: 'Bangalore', label: 'Digital Marketing Agency in Bangalore' },
      { city: 'Delhi', label: 'Digital Marketing Agency in Delhi' },
    ],
  },
  { name: 'USA', flag: '🇺🇸' },
];

function LocationsSection() {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Where We Serve
          </motion.span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Locations <span className="text-gradient">We Serve</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {countries.map((country) => {
            const hasDropdown = 'cities' in country && country.cities;
            const isExpanded = expandedCountry === country.name;

            return (
              <div key={country.name} className="flex flex-col">
                <GlassCard
                  className={`p-6 text-center group transition-all duration-300 ${hasDropdown ? 'cursor-pointer' : ''} ${isExpanded ? 'border-accent-blue/30' : 'hover:border-accent-blue/20'}`}
                  onClick={hasDropdown ? () => setExpandedCountry(isExpanded ? null : country.name) : undefined}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass mb-4 text-accent-blue group-hover:text-accent-gold transition-colors">
                    <span className="text-3xl">{country.flag}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-heading font-bold text-xl">{country.name}</h3>
                    {hasDropdown && (
                      <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="text-light-300/50"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    )}
                  </div>
                </GlassCard>

                {/* Expandable cities dropdown */}
                {hasDropdown && (
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-2">
                          {country.cities!.map((city) => (
                            <div
                              key={city.city}
                              className="glass rounded-xl px-4 py-3 flex items-center gap-3 group/city hover:border-accent-blue/20 transition-all duration-300"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue/60 shrink-0">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              <div>
                                <span className="text-sm font-medium text-light-300">{city.city}</span>
                                <p className="text-xs text-light-300/40">{city.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [callModalOpen, setCallModalOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.strength-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.strengths-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
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
              About Us
            </motion.span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Your strategic partner in" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="digital success" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Are you looking for a digital marketing agency that offers a unique approach and delivers real results? We are not just another agency; we are your strategic partner in achieving outstanding digital success.
            </motion.p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
                >
                  What We Do
                </motion.span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-6">
                  Crafting strategies that <span className="text-gradient">deliver results</span>
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-light-300/70 leading-relaxed"
                >
                  At Kreative Catalyst, we specialize in crafting comprehensive digital marketing strategies that are tailored to meet the distinct needs of your business. Our expertise spans a wide array of services, including advanced SEO, engaging content creation, targeted advertising campaigns, and more. We go beyond traditional methods, using innovative techniques and data-driven insights to develop strategies that not only resonate with your target audience but also generate measurable results. Whether you need to boost your online presence, increase engagement, or drive conversions, we design strategies that align with your specific goals and deliver tangible success.
                </motion.p>
              </div>
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
                >
                  Our Vision
                </motion.span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-6">
                  Leading with <span className="text-gradient">excellence</span>
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-light-300/70 leading-relaxed"
                >
                  Our vision is to establish Kreative Catalyst as a leading digital marketing agency recognized for our commitment to excellence and innovation. We strive to be at the forefront of the industry, providing core-to-core services that set new standards and redefine what it means to achieve digital marketing success. We are dedicated to continuously evolving our practices to stay ahead of market trends and deliver cutting-edge solutions that drive your business forward.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are + How We Work */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6 sm:p-8">
                <span className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block">Who We Are</span>
                <h3 className="font-heading font-bold text-2xl mb-4">A dynamic team of <span className="text-gradient">young entrepreneurs</span></h3>
                <p className="text-light-300/60 leading-relaxed">
                  We are a dynamic team of young entrepreneurs with a passion for pushing the boundaries of digital marketing. Our diverse backgrounds and creative approach enable us to offer fresh perspectives and innovative solutions that challenge the status quo. We are driven by a desire to deliver exceptional results and are committed to finding unique ways to address your marketing challenges. Our entrepreneurial spirit and commitment to excellence ensure that we provide a level of innovative and effective service.
                </p>
              </GlassCard>

              <GlassCard className="p-6 sm:p-8">
                <span className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block">How We Work</span>
                <h3 className="font-heading font-bold text-2xl mb-4">A <span className="text-gradient">results-oriented</span> approach</h3>
                <p className="text-light-300/60 leading-relaxed">
                  At Kreative Catalyst, we believe in a results-oriented approach that prioritizes your success. Unlike traditional agencies that follow a set of standard practices, we tailor our strategies to fit your specific needs and objectives. Our process involves a thorough understanding of your brand, careful analysis of market trends, and the implementation of cutting-edge techniques to maximize impact. We focus on creating strategies that are not only effective but also adaptable, allowing us to make adjustments as needed to ensure optimal performance. Our goal is to deliver measurable results and provide you with a clear understanding of how our efforts contribute to your success.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                What Drives Us
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Our Core <span className="text-gradient">Values</span>
              </h2>
            </div>

            <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {coreValues.map((value) => (
                <div key={value.title} className="value-card">
                  <GlassCard className="p-6 h-full">
                    <div className="text-accent-blue/60 mb-4">{value.icon}</div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-light-300/60 leading-relaxed">{value.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Strengths */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Why Choose Us
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Our Key <span className="text-gradient">Strengths</span>
              </h2>
            </div>

            <div className="strengths-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {keyStrengths.map((strength, i) => (
                <div key={strength.title} className="strength-card">
                  <GlassCard className="p-6 h-full group hover:border-accent-blue/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <span className="text-accent-blue/40 font-heading font-bold text-lg mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-gradient-white transition-colors">{strength.title}</h3>
                        <p className="text-sm text-light-300/60 leading-relaxed">{strength.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations We Serve */}
        <LocationsSection />

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Ready to work with <span className="text-gradient">Kreative Catalyst?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Our goal is to create impactful marketing solutions that align perfectly with your brand&apos;s vision and drive exceptional outcomes.
            </p>
            <button
              onClick={() => setCallModalOpen(true)}
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Book A Free Call
            </button>
          </motion.div>
        </section>

        <Footer />
      </div>

      <BookCallModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
}
