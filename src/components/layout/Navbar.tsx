'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BookCallModal from '@/components/ui/BookCallModal';

type NavDropdownItem = {
  name: string;
  href: string;
};

type NavLink = {
  name: string;
  href: string;
  dropdown?: NavDropdownItem[];
};

const serviceLinks: NavDropdownItem[] = [
  { name: 'SEO Services', href: '/services/seo-services' },
  { name: 'Social Media Marketing', href: '/services/social-media-marketing' },
  { name: 'Google Ads Services', href: '/services/google-ads-services' },
  { name: 'Content Marketing', href: '/services/content-marketing' },
  { name: 'WhatsApp Marketing', href: '/services/whatsapp-marketing' },
  { name: 'Website Design & Development', href: '/services/website-design-development' },
  { name: 'Digital PR Services', href: '/services/digital-pr-services' },
];

const navLinks = [
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    dropdown: serviceLinks,
  },
  {
    name: 'Work',
    href: '/case-studies',
    dropdown: [
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Triple Play Model', href: '/triple-play-model' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] satisfies NavLink[];

function ScatteredLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    const chars = container.querySelectorAll('.logo-char');
    if (!chars.length) return;

    let cancelled = false;
    import('gsap').then(({ gsap }) => {
      if (cancelled) return;

      chars.forEach((char) => {
        const el = char as HTMLElement;
        gsap.set(el, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 60,
          rotation: (Math.random() - 0.5) * 90,
          scale: Math.random() * 0.3 + 0.3,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({ delay: 0.8 });
      tl.to(chars, {
        opacity: 0.5,
        scale: 0.7,
        duration: 0.5,
        stagger: { each: 0.03, from: 'random' },
        ease: 'power1.out',
      });
      tl.to(chars, {
        x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
        duration: 1,
        stagger: { each: 0.03, from: 'random' },
        ease: 'power3.out',
      }, '-=0.2');
      tl.fromTo(chars, { y: 0 }, {
        y: -2, duration: 0.12,
        stagger: { each: 0.015, from: 'start' },
        ease: 'power2.out',
      }, '-=0.15');
      tl.to(chars, {
        y: 0, duration: 0.25,
        stagger: { each: 0.015, from: 'start' },
        ease: 'bounce.out',
      });
    });

    return () => { cancelled = true; };
  }, []);

  const text1 = 'Kreative';
  const text2 = ' Catalyst';

  return (
    <div ref={containerRef} className="font-heading font-semibold text-lg tracking-tight inline-flex">
      {text1.split('').map((char, i) => (
        <span key={`k-${i}`} className="logo-char inline-block" style={{ willChange: 'transform, opacity' }}>
          {char}
        </span>
      ))}
      {text2.split('').map((char, i) => (
        <span key={`c-${i}`} className="logo-char inline-block text-accent-blue" style={{ willChange: 'transform, opacity' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
  };

  return (
    <>
      {/* Navbar */}
      {!mobileOpen && (
        <nav
          className={`fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-500 py-3 ${
            scrolled
              ? 'glass-strong border-white/[0.08] shadow-lg shadow-black/20'
              : 'bg-dark-900/70 border-white/[0.06] backdrop-blur-xl'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group" data-cursor="pointer">
              <Image
                src="/KC_Logo.jpeg"
                alt="Kreative Catalyst"
                width={40}
                height={40}
                priority
                className="rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
              <ScatteredLogo />
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(link.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-light-300 hover:text-light transition-colors relative group inline-flex items-center gap-1"
                      data-cursor="pointer"
                      aria-expanded={activeDropdown === link.name}
                      aria-haspopup="true"
                    >
                      {link.name}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} aria-hidden="true">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-blue group-hover:w-full transition-all duration-300" />
                    </a>

                    {activeDropdown === link.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 glass-strong rounded-xl py-2 min-w-[240px] border border-dark-700/30 animate-dropdown">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-light-300/70 hover:text-light hover:bg-accent-blue/5 transition-all"
                            data-cursor="pointer"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-light-300 hover:text-light transition-colors relative group"
                    data-cursor="pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-blue group-hover:w-full transition-all duration-300" />
                  </a>
                )
              ))}
              <button
                onClick={() => setCallModalOpen(true)}
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 hover:scale-105"
                data-cursor="pointer"
              >
                Book A Free Call
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => { setMobileOpen(true); setMobileDropdownOpen(null); }}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              data-cursor="pointer"
            >
              <span className="w-6 h-[2px] bg-light block" />
              <span className="w-6 h-[2px] bg-light block" />
              <span className="w-6 h-[2px] bg-light block" />
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Menu — full page overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1000] glass-strong flex flex-col md:hidden overflow-y-auto animate-fade-in">
          <div className="sticky top-0 z-10 flex justify-end px-4 sm:px-6 py-5 bg-dark-900/70 backdrop-blur-sm">
            <button
              onClick={closeMobileMenu}
              className="p-2"
              aria-label="Close navigation menu"
              data-cursor="pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-5 px-4 pb-10 pt-2 min-h-full">
            <Image
              src="/KreativeCatalystCrop_Logo.jpeg"
              alt="Kreative Catalyst"
              width={220}
              height={70}
              className="rounded-lg mb-2"
            />
            {navLinks.map((link) => (
              <div key={link.name} className="w-full max-w-sm text-center">
                {link.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMobileDropdownOpen((open) => (open === link.name ? null : link.name))}
                      className="mx-auto inline-flex items-center justify-center gap-2 text-2xl font-heading font-semibold text-light hover:text-accent-blue transition-colors"
                      aria-expanded={mobileDropdownOpen === link.name}
                    >
                      {link.name}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${mobileDropdownOpen === link.name ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {mobileDropdownOpen === link.name && (
                      <div className="mt-3 space-y-2">
                        <a href={link.href} onClick={closeMobileMenu} className="block text-sm font-medium text-accent-blue hover:text-light transition-colors">
                          All {link.name}
                        </a>
                        {link.dropdown.map((item) => (
                          <a key={item.name} href={item.href} onClick={closeMobileMenu}
                            className="block text-sm text-light-300/55 hover:text-accent-blue transition-colors">
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={link.href} onClick={closeMobileMenu}
                    className="text-2xl font-heading font-semibold text-light hover:text-accent-blue transition-colors">
                    {link.name}
                  </a>
                )}
              </div>
            ))}
            <button
              onClick={() => { closeMobileMenu(); setCallModalOpen(true); }}
              className="mt-4 px-8 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900"
            >
              Book A Free Call
            </button>
          </div>
        </div>
      )}

      {/* Book A Free Call Modal */}
      <BookCallModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
}
