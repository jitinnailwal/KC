import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Design & Development | Kreative Catalyst',
  description: 'We build high-converting, fast, mobile-friendly websites designed for business growth — Shopify stores, WordPress sites, landing pages, or complete ecommerce setups.',
  openGraph: {
    title: 'Website Design & Development | Kreative Catalyst',
    description: 'High-converting, fast, mobile-friendly websites designed for business growth. Shopify, WordPress, landing pages, and ecommerce.',
    url: 'https://kreativecatalyst.in/services/website-design-development',
  },
};

const data: ServicePageData = {
  badge: 'Website Design & Development',
  headline: 'Your Website Should Sell',
  headlineGradient: "Not Just Sit There",
  heroDescription: "A beautiful website means nothing without leads, sales, or trust. We build high-converting, fast, mobile-friendly websites designed for business growth — Shopify stores, WordPress sites, landing pages, or complete ecommerce setups.",
  whatIsTitle: 'What Is Website Design & Development?',
  whatIsContent: [
    "Website design & development is the process of building an online presence that helps visitors trust your brand and take action. It includes UI/UX design, mobile-first layouts, speed optimization, and conversion-focused page structure. Your website is the digital storefront of your business — it needs to load fast, look professional, and guide every visitor toward a clear next step.",
    "We handle everything from Shopify and WordPress development to custom landing pages, ecommerce stores, lead generation forms, and technical SEO-ready development. Every website we build is optimized for Core Web Vitals, mobile responsiveness, and search engine visibility — ensuring your site not only looks great but also ranks well and converts visitors into paying customers.",
  ],
  whyNeededTitle: 'Why Do You Need It?',
  whyNeededContent: [
    "Your website is your first impression. Slow loading, outdated design, or confusing navigation causes visitors to abandon your site within seconds. Studies show that 53% of mobile users leave a site that takes longer than 3 seconds to load — and they rarely come back. A professionally built website eliminates these friction points and keeps visitors engaged.",
    "A strong website builds trust, improves conversions, supports SEO, and enhances paid advertising performance by converting traffic into leads and customers. Whether you're running Google Ads, social media campaigns, or relying on organic search, your website is where every marketing effort ultimately lands — making it the single most important asset in your digital marketing toolkit.",
  ],
  services: [
    { title: 'Shopify Development', description: "Built for ecommerce brands prioritizing clean design, performance, and conversions. New store setup, theme customization, product page optimization, and checkout flow improvements." },
    { title: 'WordPress Development', description: "Flexible, scalable websites for service businesses, personal brands, and growing companies. Business sites, blogs, lead gen pages, and SEO-friendly development." },
    { title: 'Landing Page Design', description: "Optimized for Meta Ads, Google Ads, and lead generation campaigns. Lower customer acquisition cost, better ROAS, higher lead quality." },
    { title: 'Ecommerce Development', description: "Sales-focused optimization for better product performance, faster loading, trust-building layouts, higher order values, and reduced cart abandonment." },
    { title: 'Website Redesign', description: "Improvement of existing websites addressing weak layouts, speed issues, and user journey problems through comprehensive redesigns and optimization." },
    { title: 'Performance Optimization', description: "Speed audits, Core Web Vitals improvements, image optimization, and code efficiency to ensure your site loads lightning fast." },
  ],
  whyChoose: [
    { title: 'Built for Conversion', subtitle: '"More Leads, Better Sales"', description: "Our websites aren't just visually stunning — they're strategically designed to guide visitors toward taking action and converting." },
    { title: 'Mobile-First Experience', subtitle: '"Where Your Users Are"', description: "With most traffic coming from mobile, we prioritize mobile functionality and user experience from the very start." },
    { title: 'SEO-Ready Structure', subtitle: '"Rankings From Day One"', description: "Clean architecture, proper markup, and optimized structure that supports search rankings from the moment your site launches." },
  ],
  support: [
    { title: 'Strategy First', description: "We understand your business before writing a single line of code. Strategy and goals drive every design and development decision." },
    { title: 'Speed + Performance', description: "Fast-loading sites prevent customer loss. We optimize every element to ensure your website performs at peak speed." },
    { title: 'Analytics + Tracking', description: "We set up comprehensive tracking to measure leads, clicks, sales, and user behavior so you can make informed decisions." },
  ],
  caseStudy: {
    title: 'Ecommerce Client — ₹30 Lacs in Sales',
    challenge: "A Banarasi silk saree brand needed a website that aligned with their Meta Ads strategy, with an optimized landing page flow and improved buying journey.",
    result: "Website restructuring combined with Meta Ads alignment generated ₹30 lakh in sales with a 14:1 ROAS. Great ads need great landing pages.",
    highlight: '14:1 ROAS with Aligned Strategy',
  },
  tactics: ['UI/UX Design', 'Mobile-First', 'Speed Optimization', 'Conversion Optimization', 'SEO Structure', 'A/B Testing', 'Analytics Setup', 'Performance Audits'],
  ctaTitle: "Ready to Build a Website That Converts?",
  ctaDescription: "Let's build a website that doesn't just look good — it drives real business results and growth.",
};

export default function WebsiteDesignDevelopmentPage() {
  return <ServicePageTemplate data={data} />;
}
