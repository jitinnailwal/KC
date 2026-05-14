'use client';

import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

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

  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

export function destroySmoothScroll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
