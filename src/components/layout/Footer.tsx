'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/kreative_catalyst',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/kreative-catalyst',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=917860629745',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

const footerLinks = {
  Services: [
    { name: 'SEO Services', href: '/services/seo-services' },
    { name: 'Social Media Marketing', href: '/services/social-media-marketing' },
    { name: 'Google Ads Services', href: '/services/google-ads-services' },
    { name: 'Content Marketing', href: '/services/content-marketing' },
    { name: 'WhatsApp Marketing', href: '/services/whatsapp-marketing' },
    { name: 'Website Development', href: '/services/website-design-development' },
    { name: 'Digital PR Services', href: '/services/digital-pr-services' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Triple Play Model', href: '/triple-play-model' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  'Locations We Serve': [
    { name: 'Digital Marketing Agency in Delhi', href: '/locations/delhi' },
    { name: 'Digital Marketing Agency in Varanasi', href: '/locations/varanasi' },
    { name: 'Digital Marketing Agency in Bangalore', href: '/locations/bengaluru' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-12 md:pt-20 pb-8 px-4 sm:px-6 border-t border-dark-700/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 sm:gap-10 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/KC_Logo.jpeg"
                alt="Kreative Catalyst"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-heading font-semibold text-lg tracking-tight">
                Kreative<span className="text-accent-blue"> Catalyst</span>
              </span>
            </div>
            <p className="text-sm text-light-300/70 leading-relaxed mb-4 max-w-xs">
              Your strategic digital marketing partner. SEO, Social Media, Google Ads, and more — all under one roof.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-light-300/80">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href="tel:+917860629745" className="hover:text-light-300 transition-colors">+91 7860629745</a>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@kreativecatalyst.in" className="hover:text-light-300 transition-colors">info@kreativecatalyst.in</a>
              </div>
              <div className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>274, Saket, New Delhi 110070</span>
              </div>
            </div>

            {/* Locations */}
            <div className="flex gap-2 mt-4">
              {['Delhi', 'Varanasi', 'Bangalore'].map((city) => (
                <span key={city} className="px-3 py-1 rounded-full text-xs text-light-300/80 border border-dark-700/50">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-light-300/80 tracking-wider uppercase">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-light-300/80 hover:text-light transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      data-cursor="pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect column */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-light-300/80 tracking-wider uppercase">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-light-300/80 hover:text-accent-blue transition-colors inline-flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                  >
                    <span className="text-light-300/80 hover:text-accent-blue transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-dark-700/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-light-300/30">
            &copy; {new Date().getFullYear()} Kreative Catalyst. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social icons row */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-light-300/30 hover:text-accent-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  data-cursor="pointer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="w-px h-3 bg-dark-700/30" />
            <a href="#" className="text-xs text-light-300/70 hover:text-light transition-colors" data-cursor="pointer">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-light-300/70 hover:text-light transition-colors" data-cursor="pointer">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
