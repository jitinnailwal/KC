'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';
import { fetchJson } from '@/lib/fetch-json';
import Image from 'next/image';

interface Review {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  published: boolean;
  date: string;
  image?: string;
}

// Fallback testimonials in case API is unavailable
const fallbackTestimonials: Review[] = [
  {
    id: '1',
    quote: 'Kreative Catalyst transformed our brand from forgettable to iconic. Their attention to detail and strategic thinking is unmatched.',
    name: 'Sarah Chen',
    role: 'CEO, Lumière Finance',
    rating: 5,
    published: true,
    date: '2026-04-15',
  },
  {
    id: '2',
    quote: 'Working with KC was like having a creative partner who truly understands the intersection of design and business impact.',
    name: 'Marcus Rivera',
    role: 'Founder, Noir Fashion',
    rating: 5,
    published: true,
    date: '2026-04-10',
  },
  {
    id: '3',
    quote: "They don't just build websites — they craft experiences. Our conversion rate tripled after the redesign.",
    name: 'Emily Zhang',
    role: 'CMO, Zenith Health',
    rating: 5,
    published: true,
    date: '2026-03-28',
  },
  {
    id: '4',
    quote: 'The level of creativity and technical excellence is rare. Kreative Catalyst delivered beyond our wildest expectations.',
    name: 'David Park',
    role: 'CTO, NovaTech',
    rating: 5,
    published: true,
    date: '2026-03-15',
  },
  {
    id: '5',
    quote: 'From brand strategy to final launch, every step was handled with precision. A truly world-class creative studio.',
    name: 'Aisha Patel',
    role: 'VP Marketing, Solaris',
    rating: 5,
    published: true,
    date: '2026-02-20',
  },
  {
    id: '6',
    quote: 'Our entire digital presence was elevated. The ROI on their work paid for itself within the first quarter.',
    name: 'James Walker',
    role: 'Director, Apex Ventures',
    rating: 5,
    published: true,
    date: '2026-02-05',
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Review[]>(fallbackTestimonials);

  // Defer API fetch until section is near viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let fetched = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetched) {
          fetched = true;
          observer.disconnect();
          fetch('/api/reviews')
            .then((res) => fetchJson<Review[]>(res))
            .then((data: Review[]) => {
              const published = data.filter((r) => r.published);
              if (published.length > 0) {
                setTestimonials(published);
              }
            })
            .catch(() => {
              // Use fallback data
            });
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    // Only enable horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const totalScrollWidth = cards.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(cards, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each card as it enters viewport
      const cardElements = cards.querySelectorAll('.testimonial-card');
      cardElements.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'left 90%',
              end: 'left 50%',
              scrub: 0.5,
            },
          }
        );
      });

      // Animate the progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScrollWidth}`,
            scrub: 1,
          },
        });
      }
    });

    return () => mm.revert();
  }, [testimonials]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-dark-900">
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(79,140,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(200,169,106,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <div className="pt-16 md:pt-20 pb-4 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-3 block"
              >
                Client Reviews
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                <AnimatedText text="What our clients" />
                <br />
                <span className="text-gradient">
                  <AnimatedText text="say about us" delay={0.2} />
                </span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-light-300/50 max-w-sm text-sm"
            >
              Real feedback from brands we&apos;ve partnered with.
            </motion.p>
          </div>

          {/* Progress bar - desktop only */}
          <div className="hidden md:block h-[1px] bg-dark-700/40 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-accent-blue to-accent-gold origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal scrolling cards */}
      <div
        ref={cardsRef}
        className="hidden md:flex gap-6 lg:gap-8 px-6 py-8 w-max"
        style={{ willChange: 'transform' }}
      >
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.id}
            className="testimonial-card w-[500px] lg:w-[600px] shrink-0"
          >
            <TestimonialCard testimonial={testimonial} index={i} />
          </div>
        ))}
        {/* End spacer */}
        <div className="w-[10vw] shrink-0" />
      </div>

      {/* Mobile: Vertical scrolling cards */}
      <div className="md:hidden px-4 py-6 space-y-4">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <TestimonialCard testimonial={testimonial} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Review; index: number }) {
  return (
    <div className="glass rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 h-full flex flex-col justify-between hover:border-accent-blue/15 transition-all duration-500 group relative overflow-hidden">
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(79,140,255,0.04) 0%, rgba(200,169,106,0.02) 100%)',
        }}
      />

      <div className="relative z-10">
        {/* Quote icon & rating */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-accent-blue/20 md:w-[40px] md:h-[40px]"
          >
            <path
              d="M10 11H6C6 7.686 8.686 5 12 5V3C7.582 3 4 6.582 4 11V19H10V11ZM20 11H16C16 7.686 18.686 5 22 5V3C17.582 3 14 6.582 14 11V19H20V11Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, j) => (
              <svg
                key={j}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-accent-gold md:w-[14px] md:h-[14px]"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Quote */}
        <p className="text-base sm:text-lg md:text-xl font-heading font-normal leading-relaxed text-light/90 mb-6 md:mb-8">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3 md:gap-4 pt-4 md:pt-5 border-t border-dark-700/30">
        {testimonial.image ? (
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden shrink-0 relative">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-accent-blue to-accent-gold flex items-center justify-center font-heading font-bold text-xs md:text-sm text-dark-900 shrink-0">
            {getInitials(testimonial.name)}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-heading font-semibold text-light text-sm truncate">
            {testimonial.name}
          </div>
          <div className="text-xs text-light-300/50 truncate">
            {testimonial.role}
          </div>
        </div>
        <div className="ml-auto text-3xl md:text-4xl font-heading font-bold text-dark-700/20 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
