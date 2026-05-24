import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Services | Kreative Catalyst',
  description: 'We help your business rank higher on Google through proven SEO strategies. From keyword research to technical audits, we ensure your website attracts organic traffic that converts into leads and sales.',
  openGraph: {
    title: 'SEO Services | Kreative Catalyst',
    description: 'Rank higher on Google with proven SEO strategies. Keyword research, technical audits, and organic traffic that converts.',
    url: 'https://kreativecatalyst.in/services/seo-services',
  },
};

const data: ServicePageData = {
  badge: 'SEO Services',
  headline: 'SEO Done Right',
  headlineGradient: "So You Don't Have to Google",
  heroDescription: "We help your business rank higher on Google through proven SEO strategies. From keyword research to technical audits, we ensure your website attracts organic traffic that converts into leads and sales.",
  whatIsTitle: 'What is SEO?',
  whatIsContent: [
    "SEO (Search Engine Optimization) transforms your website into a 24/7 salesperson through keyword optimization, technical foundations, and strategic approaches. Think of us as your website's personal coach ensuring dominance in Google rankings. Every page on your site becomes a potential entry point for customers who are actively searching for what you offer.",
    "SEO is the connection between your website and search engines. It focuses on visibility, user-friendly content, organic traffic growth, domain authority improvement, and ultimately driving leads and sales. From on-page elements like meta tags and content structure to off-page factors like backlinks and brand signals, SEO covers the full spectrum of what makes a website authoritative in Google's eyes.",
  ],
  whyNeededTitle: 'Why Do You Need SEO?',
  whyNeededContent: [
    "Your competitors are already investing in SEO. If you're not on page 1 of Google, you're invisible to 95% of potential customers searching for your services. Every day without a solid SEO strategy means lost traffic, lost leads, and lost revenue going directly to competitors who rank above you.",
    "SEO delivers the highest ROI of any digital marketing channel. Unlike paid ads, organic rankings compound over time, providing sustainable growth without increasing ad spend. A well-optimized page can generate leads for months or even years after publication, making SEO one of the most cost-effective long-term investments your business can make.",
  ],
  services: [
    { title: 'Keyword Research', description: "Identifying what your audience searches for when they need your products or services, then distributing keywords across your site for maximum visibility." },
    { title: 'On-Page SEO', description: "Optimizing page elements including meta titles, descriptions, headings, and content to appeal to both search engines and users." },
    { title: 'Off-Page SEO', description: "Building authority through high-quality backlinks from reputable sites to increase your online credibility and domain authority." },
    { title: 'Technical SEO', description: "Ensuring fast loading times, mobile responsiveness, proper site structure, and clean code for search engine compatibility." },
    { title: 'Local SEO', description: "Optimizing your Google My Business profile and location-based strategies to help nearby customers discover your business." },
    { title: 'SEO Content Strategy', description: "Creating search-optimized content that ranks, engages readers, and drives conversions through strategic topic targeting." },
  ],
  whyChoose: [
    { title: 'Page 1 Rankings', subtitle: '"Be Seen, Be Clicked"', description: "Our SEO tactics ensure your business isn't just seen but clicked on. We focus on first-page rankings that drive real traffic." },
    { title: 'Transparent Reporting', subtitle: '"No Guesswork, Just Results"', description: "We provide clear metrics and accountability with detailed reporting so you always know exactly how your SEO is performing." },
    { title: 'Search Engine Expertise', subtitle: '"We Speak Google\'s Language"', description: "Our deep understanding of search engine algorithms means we stay ahead of updates and keep your rankings strong." },
  ],
  support: [
    { title: 'Real-Time Assistance', description: "Our team is available for technical issues, ranking questions, and performance metric clarification whenever you need us." },
    { title: 'Proactive Monitoring', description: "Continuous oversight of your rankings, traffic patterns, and algorithm updates to keep your site performing at its best." },
    { title: 'Strategic Guidance', description: "Collaborative brainstorming and customized implementation plans tailored to your business goals and industry." },
  ],
  caseStudy: {
    title: 'The Usee Shop — From Lost to First Page',
    challenge: "An online saree retailer was lost among thousands of competitors, struggling to gain any organic visibility for their products.",
    result: 'Strategic optimization of the keyword "banarasi silk tissue saree" achieved first-page Google ranking, resulting in significant organic sales growth.',
    highlight: 'First Page Google Ranking Achieved',
  },
  tactics: ['Competitor Analysis', 'Keyword Research', 'On-Page Optimization', 'Technical Audits', 'Link Building', 'Content Optimization', 'Local SEO', 'Analytics & Reporting'],
  ctaTitle: 'Ready to Dominate Google?',
  ctaDescription: "Stop hiding on page 10. Let's get your business to page 1 where your customers are actually looking.",
};

export default function SEOServicesPage() {
  return <ServicePageTemplate data={data} />;
}
