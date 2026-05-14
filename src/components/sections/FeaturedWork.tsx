'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/ui/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Lumière Finance',
    category: 'Fintech Platform',
    description: 'A revolutionary banking dashboard with real-time analytics and AI-driven insights.',
    color: 'from-blue-500/20 to-purple-500/20',
    accent: '#4F8CFF',
    year: '2024',
  },
  {
    title: 'Noir Fashion',
    category: 'E-Commerce',
    description: 'Luxury fashion brand with immersive shopping experience and AR try-on features.',
    color: 'from-amber-500/20 to-rose-500/20',
    accent: '#C8A96A',
    year: '2024',
  },
  {
    title: 'Zenith Health',
    category: 'Health Tech',
    description: 'Patient-centric health platform with telemedicine and wellness tracking.',
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#34D399',
    year: '2023',
  },
  {
    title: 'Atlas Studio',
    category: 'Creative Agency',
    description: 'Award-winning portfolio site with 3D interactions and cinematic storytelling.',
    color: 'from-violet-500/20 to-pink-500/20',
    accent: '#A78BFA',
    year: '2023',
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const totalScrollWidth = cards.scrollWidth - window.innerWidth;

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

      // Animate project cards
      const cardElements = cards.querySelectorAll('.project-card');
      cardElements.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4, y: 40 },
          {
            opacity: 1,
            y: 0,
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
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden">
      {/* Header */}
      <div className="pt-16 md:pt-20 pb-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-3 block"
              >
                Featured Work
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                <AnimatedText text="Projects that" />
                <br />
                <span className="text-gradient">
                  <AnimatedText text="speak volumes" delay={0.2} />
                </span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-light-300/60 max-w-md text-sm"
            >
              A selection of our most impactful work across industries.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal scroll projects */}
      <div ref={cardsRef} className="hidden md:flex gap-8 px-6 py-6 w-max items-start">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="project-card min-w-[500px] lg:min-w-[600px] group"
            data-cursor="pointer"
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
        {/* End spacer */}
        <div className="w-[10vw] shrink-0" />
      </div>

      {/* Mobile: Vertical cards */}
      <div className="md:hidden px-4 py-6 space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div className="relative rounded-2xl overflow-hidden glass h-[45vh] md:h-[55vh] flex flex-col justify-end group">
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-opacity duration-700`}
      />

      {/* Decorative elements */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: project.accent }}
        />
        <span className="text-xs text-light-300/40">{project.year}</span>
      </div>

      {/* Large project number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[100px] sm:text-[150px] md:text-[200px] font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-8">
        <span className="text-xs text-light-300/40 tracking-widest uppercase mb-2 block">
          {project.category}
        </span>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 group-hover:text-gradient-white transition-colors">
          {project.title}
        </h3>
        <p className="text-light-300/50 text-sm leading-relaxed max-w-md">
          {project.description}
        </p>

        {/* View project button */}
        <div
          className="mt-4 sm:mt-6 flex items-center gap-2 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:group-hover:translate-y-0"
          style={{ color: project.accent }}
        >
          <span>View Project</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
