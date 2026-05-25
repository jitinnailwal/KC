'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });

// Lazy load below-the-fold sections with SSR disabled to prevent hydration mismatches
// from framer-motion, GSAP, and browser-only APIs (matchMedia, IntersectionObserver)
const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const Services = dynamic(() => import('@/components/sections/Services'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false });
const FeaturedWork = dynamic(() => import('@/components/sections/FeaturedWork'), { ssr: false });
const Blog = dynamic(() => import('@/components/sections/Blog'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const ShatteredGlassPopup = dynamic(() => import('@/components/ui/ShatteredGlassPopup'), { ssr: false });

export default function Home() {
  useEffect(() => {
    // Defer heavy GSAP + smooth scroll setup to avoid blocking main thread
    let cleanedUp = false;
    let timer: ReturnType<typeof setTimeout>;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { initSmoothScroll } = await import('@/lib/smooth-scroll');

      if (cleanedUp) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
      initSmoothScroll();

      // Refresh after all sections have initialized their ScrollTriggers
      timer = setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
      }, 2500);
    };

    init();

    return () => {
      cleanedUp = true;
      clearTimeout(timer);
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
      import('@/lib/smooth-scroll').then(({ destroySmoothScroll }) => {
        destroySmoothScroll();
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <FeaturedWork />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ShatteredGlassPopup />
    </>
  );
}
