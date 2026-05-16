'use client';

import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (lenisInstance) return lenisInstance;

  // Disable smooth scroll on mobile/touch devices for better performance
  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
  if (isMobile) return null;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Connect Lenis to GSAP ScrollTrigger for seamless integration
  import('gsap').then(({ gsap }) => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      if (!lenisInstance) return;

      // Lenis scroll events update ScrollTrigger
      lenisInstance.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker to drive Lenis (syncs with GSAP animations)
      gsap.ticker.add((time) => {
        lenisInstance?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });
  });

  return lenisInstance;
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
