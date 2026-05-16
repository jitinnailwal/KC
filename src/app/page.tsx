'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

// Lazy load below-the-fold sections with next/dynamic for better code splitting
const About = dynamic(() => import('@/components/sections/About'));
const Services = dynamic(() => import('@/components/sections/Services'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const FeaturedWork = dynamic(() => import('@/components/sections/FeaturedWork'));
const Blog = dynamic(() => import('@/components/sections/Blog'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const Footer = dynamic(() => import('@/components/layout/Footer'));
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

      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);
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
      <main>
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
