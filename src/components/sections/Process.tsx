'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/ui/AnimatedText';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, audience, and goals. Research and strategy form the foundation of everything we build.',
    details: ['Brand Audit', 'Market Research', 'Goal Setting', 'Roadmap'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes evolve into stunning visual concepts. We iterate until every element serves both form and function.',
    details: ['Wireframing', 'Visual Design', 'Prototyping', 'User Testing'],
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Clean, performant code brings designs to life. We build with modern tools and best practices.',
    details: ['Frontend Dev', 'Backend API', 'CMS Integration', 'QA Testing'],
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Launch day and beyond. We ensure smooth deployment and provide ongoing support for continuous growth.',
    details: ['Deployment', 'Analytics', 'Optimization', 'Support'],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate the connecting line drawing
      gsap.fromTo(
        '.process-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Animate each step card
      gsap.fromTo(
        '.process-step',
        { opacity: 0, x: (i: number) => (i % 2 === 0 ? -60 : 60), y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate step number indicators
      gsap.fromTo(
        '.step-indicator',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.25,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-16 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Our Process
          </motion.span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            <AnimatedText text="From concept" />
            <br />
            <span className="text-gradient">
              <AnimatedText text="to launch" delay={0.2} />
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="process-timeline relative">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            <div className="process-line w-full h-full bg-gradient-to-b from-accent-blue/40 via-accent-gold/40 to-accent-blue/20 origin-top" />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`process-step relative flex flex-col md:flex-row items-start gap-8 mb-20 last:mb-0 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Step number indicator */}
              <div className="step-indicator hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full glass items-center justify-center z-10">
                <span className="font-heading font-bold text-accent-blue">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                <div className="glass rounded-2xl p-5 sm:p-8 group hover:border-accent-blue/10 transition-all duration-500">
                  <span className="md:hidden font-heading text-sm text-accent-blue/50 mb-2 block">{step.number}</span>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3">{step.title}</h3>
                  <p className="text-light-300/50 leading-relaxed mb-6">{step.description}</p>
                  <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {step.details.map((detail) => (
                      <span key={detail} className="px-3 py-1 rounded-full text-xs text-light-300/40 border border-dark-700/50">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
