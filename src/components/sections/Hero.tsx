'use client';

import { useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';

const GalaxyBackground = lazy(() => import('@/components/ui/GalaxyBackground'));

const subtextPhrases = [
  'Ignoring Digital Marketing is like Opening a Business but not Telling Anyone.',
  'SEO, Social Media, Google Ads — all under one roof.',
  'We help brands dominate search results and social feeds.',
  'Data-driven strategies that deliver measurable ROI.',
];

// Cinematic word-by-word reveal with blur-to-focus, cycling phrases
function CinematicText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const idleReady = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    let cancelled = false;
    let currentRafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const runCycle = async () => {
      let phraseIdx = 0;

      while (!cancelled) {
        const phrase = subtextPhrases[phraseIdx];
        const words = phrase.split(' ');

        // Build word spans
        container.innerHTML = '';
        const wordEls: HTMLSpanElement[] = [];
        words.forEach((word, i) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.className = 'hero-subtext-word inline-block';
          container.appendChild(span);
          wordEls.push(span);
          if (i < words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.className = 'inline-block';
            container.appendChild(space);
          }
        });

        // Set initial state
        wordEls.forEach((el) => {
          gsap.set(el, {
            opacity: 0,
            y: 18,
            ...(isMobile ? {} : { filter: 'blur(6px)' }),
          });
        });

        // Word-by-word reveal
        await new Promise<void>((resolve) => {
          if (cancelled) { resolve(); return; }
          const tl = gsap.timeline({
            onComplete: resolve,
          });

          if (isMobile) {
            // Mobile: simple opacity + y transform (no expensive blur/brightness filters)
            tl.to(wordEls, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power3.out',
            });
          } else {
            tl.to(wordEls, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
            });

            // Soft glow finish — brief brightness bump
            tl.to(wordEls, {
              filter: 'brightness(1.15) blur(0px)',
              duration: 0.4,
              ease: 'power2.out',
            }, '-=0.2');
            tl.to(wordEls, {
              filter: 'brightness(1) blur(0px)',
              duration: 0.6,
              ease: 'power2.inOut',
            });
          }
        });

        if (cancelled) break;

        // Enable idle effects (skip on mobile to save CPU)
        idleReady.current = true;

        if (!isMobile) {
          const idleStart = performance.now();

          // Cache container center (avoid getBoundingClientRect every frame)
          const containerRect = container.getBoundingClientRect();
          const containerCx = containerRect.left + containerRect.width / 2;
          const containerCy = containerRect.top + containerRect.height / 2;

          // Start idle animation loop (desktop only)
          const idleLoop = (now: number) => {
            if (cancelled || !idleReady.current) return;
            currentRafId = requestAnimationFrame(idleLoop);

            const elapsed = now - idleStart;
            const mx = mousePos.current.x;
            const my = mousePos.current.y;

            for (let i = 0; i < wordEls.length; i++) {
              const el = wordEls[i];
              // Subtle floating
              const floatY = Math.sin(elapsed * 0.0015 + i * 0.6) * 1.2;
              const floatX = Math.cos(elapsed * 0.001 + i * 0.5) * 0.4;

              // Mouse parallax
              let px = 0;
              let py = 0;
              if (mx > -9000) {
                const dx = (mx - containerCx) * 0.008;
                const dy = (my - containerCy) * 0.006;
                px = dx * (1 + i * 0.15);
                py = dy * (1 + i * 0.1);
              }

              el.style.transform = `translate3d(${floatX + px}px, ${floatY + py}px, 0)`;
            }
          };
          currentRafId = requestAnimationFrame(idleLoop);
        }

        // Hold for 3.5 seconds
        await new Promise<void>((resolve) => {
          if (cancelled) { resolve(); return; }
          setTimeout(resolve, 3500);
        });

        if (cancelled) break;

        // Stop idle loop
        idleReady.current = false;
        cancelAnimationFrame(currentRafId);

        // Cinematic fade-out
        await new Promise<void>((resolve) => {
          if (cancelled) { resolve(); return; }
          gsap.to(wordEls, {
            opacity: 0,
            y: -12,
            ...(isMobile ? {} : { filter: 'blur(4px)' }),
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.in',
            onComplete: resolve,
          });
        });

        if (cancelled) break;

        // Next phrase
        phraseIdx = (phraseIdx + 1) % subtextPhrases.length;
      }
    };

    runCycle();

    return () => {
      cancelled = true;
      idleReady.current = false;
      cancelAnimationFrame(currentRafId);
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(container.querySelectorAll('.hero-subtext-word'));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-center leading-relaxed"
    />
  );
}

// Split text into lines, each line into words, each word into characters
function splitIntoChars(lines: { text: string; className?: string }[]) {
  return lines.map((line) => ({
    ...line,
    words: line.text.split(' ').map((word) => ({
      word,
      chars: word.split(''),
    })),
  }));
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Refs for interactive effects (no re-renders)
  const mousePos = useRef({ x: -9999, y: -9999 });
  const charPositions = useRef<{ cx: number; cy: number }[]>([]);
  const animReady = useRef(false);
  const rafId = useRef(0);
  const isMobileRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const y = useSpring(yRaw, springConfig);
  const opacity = useSpring(opacityRaw, springConfig);
  const scale = useSpring(scaleRaw, springConfig);

  const headlineLines = useMemo(
    () =>
      splitIntoChars([
        { text: "We Don't Chase Impressions" },
        { text: 'We Create Buying Decisions', className: 'text-gradient' },
      ]),
    []
  );

  useEffect(() => {
    isMobileRef.current = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    animReady.current = false;

    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll('.hero-char');
      if (!chars || chars.length === 0) return;

      const charArray = Array.from(chars) as HTMLElement[];

      // Minimal delay to allow first paint, then animate
      const tl = gsap.timeline({ delay: isMobileRef.current ? 0.3 : 0.15 });

      if (isMobileRef.current) {
        // Mobile: simple fade-in (no scatter, no blur filters)
        charArray.forEach((el) => {
          gsap.set(el, { opacity: 0, y: 20 });
        });

        tl.to(charArray, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: { each: 0.015, from: 'start' },
          ease: 'power3.out',
        });
      } else {
        // Desktop: full scatter + settle + bounce
        charArray.forEach((el) => {
          const randX = (Math.random() - 0.5) * window.innerWidth * 0.9;
          const randY = (Math.random() - 0.5) * window.innerHeight * 0.8;
          const randRotate = (Math.random() - 0.5) * 360;
          const randScale = Math.random() * 0.4 + 0.2;

          gsap.set(el, {
            x: randX,
            y: randY,
            rotation: randRotate,
            scale: randScale,
            opacity: 0,
            filter: 'blur(8px)',
          });
        });

        // Phase 1: Characters fade in at scattered positions
        tl.to(charArray, {
          opacity: 0.4,
          scale: 0.6,
          filter: 'blur(4px)',
          duration: 0.6,
          stagger: { each: 0.02, from: 'random' },
          ease: 'power1.out',
        });

        // Phase 2: Characters drift toward their position
        tl.to(
          charArray,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            stagger: { each: 0.025, from: 'random' },
            ease: 'power4.out',
          },
          '-=0.3'
        );

        // Phase 3: Subtle bounce/settle
        tl.fromTo(
          charArray,
          { y: 0 },
          {
            y: -4,
            duration: 0.15,
            stagger: { each: 0.01, from: 'start' },
            ease: 'power2.out',
          },
          '-=0.2'
        );
        tl.to(charArray, {
          y: 0,
          duration: 0.3,
          stagger: { each: 0.01, from: 'start' },
          ease: 'bounce.out',
        });
      }

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.6'
      );

      // Subtext — smooth fade in
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30, ...(isMobileRef.current ? {} : { filter: 'blur(4px)' }) },
        { opacity: 1, y: 0, ...(isMobileRef.current ? {} : { filter: 'blur(0px)' }), duration: 1.2, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA buttons — smooth fade in
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, ...(isMobileRef.current ? {} : { filter: 'blur(4px)' }) },
        { opacity: 1, y: 0, ...(isMobileRef.current ? {} : { filter: 'blur(0px)' }), duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );

      // After GSAP completes, enable interactive effects
      tl.call(() => {
        charArray.forEach((el) => {
          gsap.set(el, { clearProps: isMobileRef.current ? 'y' : 'x,y,rotation,scale,filter' });
          el.style.opacity = '1';
          if (!isMobileRef.current) {
            el.style.transition = 'transform 0.25s ease-out, filter 0.6s ease-out';
          }
        });

        if (isMobileRef.current) {
          // On mobile, skip the interactive loop entirely
          animReady.current = true;
          return;
        }

        // Cache positions after a frame
        requestAnimationFrame(() => {
          charPositions.current = charArray.map((el) => {
            const rect = el.getBoundingClientRect();
            return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
          });
          animReady.current = true;
        });
      });

      // Interactive animation loop — desktop only
      if (!isMobileRef.current) {
        let shimmerTimer = 0;
        const startTime = performance.now();
        let cachedWrapRect: DOMRect | null = null;
        let lastRectTime = 0;
        let isVisible = true;

        // Pause RAF when hero is not visible (saves CPU when scrolled past)
        const observer = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible && animReady.current) {
              rafId.current = requestAnimationFrame(loop);
            }
          },
          { threshold: 0 }
        );
        if (containerRef.current) observer.observe(containerRef.current);

        const loop = (now: number) => {
          if (!isVisible) return;
          rafId.current = requestAnimationFrame(loop);
          if (!animReady.current) return;

          const positions = charPositions.current;
          if (charArray.length === 0 || positions.length === 0) return;

          const elapsed = now - startTime;
          const mx = mousePos.current.x;
          const my = mousePos.current.y;

          if (now - lastRectTime > 500) {
            cachedWrapRect = headingWrapRef.current?.getBoundingClientRect() ?? null;
            lastRectTime = now;
          }

          const mouseNearHeading = cachedWrapRect &&
            mx > cachedWrapRect.left - 100 && mx < cachedWrapRect.right + 100 &&
            my > cachedWrapRect.top - 80 && my < cachedWrapRect.bottom + 80;

          for (let i = 0; i < charArray.length; i++) {
            const el = charArray[i];
            if (!el) continue;

            const floatY = Math.sin(elapsed * 0.002 + i * 0.4) * 1.5;
            const floatX = Math.cos(elapsed * 0.0015 + i * 0.3) * 0.5;

            let tx = floatX;
            let ty = floatY;
            let rx = 0;
            let ry = 0;

            if (mouseNearHeading && positions[i]) {
              const dx = positions[i].cx - mx;
              const dy = positions[i].cy - my;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = 180;

              if (dist < maxDist && dist > 0) {
                const strength = (1 - dist / maxDist) * 6;
                tx += (dx / dist) * strength;
                ty += (dy / dist) * strength;
                rx = -(dy / dist) * (1 - dist / maxDist) * 2.5;
                ry = (dx / dist) * (1 - dist / maxDist) * 2.5;
              }
            }

            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
          }

          shimmerTimer += 16;
          if (shimmerTimer > 4000 + Math.random() * 2000) {
            shimmerTimer = 0;
            const count = 2 + Math.floor(Math.random() * 2);
            for (let k = 0; k < count; k++) {
              const idx = Math.floor(Math.random() * charArray.length);
              const el = charArray[idx];
              if (el && !el.classList.contains('hero-char-shimmer')) {
                el.classList.add('hero-char-shimmer');
                setTimeout(() => el.classList.remove('hero-char-shimmer'), 600);
              }
            }
          }
        };

        rafId.current = requestAnimationFrame(loop);
      }
    }, containerRef);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobileRef.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Recache on resize
    const handleResize = () => {
      if (!animReady.current) return;
      const chars = containerRef.current?.querySelectorAll('.hero-char');
      if (!chars) return;
      charPositions.current = Array.from(chars).map((el) => {
        const rect = el.getBoundingClientRect();
        return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId.current);
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Galaxy animated background */}
      <Suspense fallback={
        <div className="absolute inset-0 w-full h-full" style={{ background: 'radial-gradient(ellipse at center, rgba(15, 10, 40, 0.8) 0%, #050510 70%)' }} />
      }>
        <GalaxyBackground />
      </Suspense>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-16 md:pt-0"
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass mb-6 sm:mb-8 opacity-0 max-w-[90vw]"
        >
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-medium text-light-300 tracking-wider uppercase truncate">
            Kreative Catalyst — Digital Marketing Agency
          </span>
        </div>

        {/* Headline — each character individually animated */}
        <div ref={headingWrapRef} className="mb-6 hero-heading-wrap hero-heading-glow hero-heading-perspective">
          {headlineLines.map((line, lineIdx) => (
            <div key={lineIdx} className={`overflow-visible mb-1${line.className ? ' hero-gradient-line' : ''}`}>
              <h1
                className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05]"
              >
                {line.words.map((wordObj, wordIdx) => (
                  <span key={wordIdx} className="inline-block whitespace-nowrap">
                    {wordObj.chars.map((char, charIdx) => (
                      <span
                        key={`${lineIdx}-${wordIdx}-${charIdx}`}
                        className={`hero-char inline-block ${line.className || ''}`}
                      >
                        {char}
                      </span>
                    ))}
                    {/* Space between words */}
                    {wordIdx < line.words.length - 1 && (
                      <span className="inline-block">&nbsp;</span>
                    )}
                  </span>
                ))}
              </h1>
            </div>
          ))}
        </div>

        {/* Sub text — Cinematic word-by-word reveal */}
        <div
          ref={subtextRef}
          className="text-base sm:text-lg md:text-xl text-light-300 max-w-2xl mx-auto mb-12 opacity-0 min-h-[3.5em] sm:min-h-[3em] flex items-center justify-center hero-subtext-wrap hero-subtext-sweep"
        >
          <CinematicText />
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        >
          <MagneticButton href="#contact">
            <span className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-base inline-block hover:shadow-xl hover:shadow-accent-blue/20 transition-shadow">
              Book A Free Call
            </span>
          </MagneticButton>
          <MagneticButton href="/services">
            <span className="px-8 py-4 rounded-full border border-light-300/20 text-light font-medium text-base inline-block hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all">
              Our Services
            </span>
          </MagneticButton>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-light-300/50 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-light-300/20 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-accent-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
