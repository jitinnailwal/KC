import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Ads | Kreative Catalyst',
  description: "Looking for instant results? Our Google Ads strategies boost traffic, leads, and sales faster than you can say 'Click-Through Rate.' Let's put your brand on top where it belongs.",
  openGraph: {
    title: 'Google Ads | Kreative Catalyst',
    description: 'Google Ads strategies that boost traffic, leads, and sales. Put your brand on top where it belongs.',
    url: 'https://kreativecatalyst.in/services/google-ads-services',
  },
};

const data: ServicePageData = {
  badge: 'Google Ads Services',
  headline: 'Google Ads That Make',
  headlineGradient: 'Your Competitors Cry',
  heroDescription: "Looking for instant results? Our Google Ads strategies boost traffic, leads, and sales faster than you can say 'Click-Through Rate.' Let's put your brand on top where it belongs.",
  whatIsTitle: 'What Are Google Ads?',
  whatIsContent: [
    "Google Ads is your direct line to potential customers who are actively searching for your products or services. Think of it as the VIP lane to online visibility — you skip the wait and go straight to the top of search results. Whether through Search, Display, Shopping, or YouTube campaigns, Google Ads puts your business in front of high-intent audiences exactly when they're ready to take action.",
    "With Google Ads, every click is a potential customer. We transform those clicks into conversions through strategic targeting, compelling ad copy, and continuous optimization. Our approach goes beyond basic campaign setup — we analyze search intent, refine audience segments, test ad variations, and optimize landing pages to ensure every rupee of your ad spend delivers maximum returns.",
  ],
  whyNeededTitle: 'Why Do You Need Google Ads?',
  whyNeededContent: [
    "Google Ads is a result-driven advertising platform that targets specific audiences actively searching for what you offer. It's not about casting a wide net — it's about reaching the right people at the right moment. With billions of searches happening daily, your potential customers are already looking for solutions — Google Ads ensures they find you first.",
    "While SEO builds long-term organic presence, Google Ads delivers immediate visibility and leads. The combination of both creates an unbeatable digital marketing strategy. From brand new businesses needing instant traction to established brands scaling their revenue, Google Ads provides the measurable, controllable growth engine that modern businesses need to stay competitive.",
  ],
  services: [
    { title: 'Search Ads', description: "We craft ads that pop up just when your audience is searching. Highly targeted, conversion-focused search campaigns that put you at the top." },
    { title: 'Display Ads', description: "Display ads are the digital equivalent of billboards, but smarter. Visual campaigns that build brand awareness across millions of websites." },
    { title: 'Shopping Ads', description: "Your product, front and center, where shoppers are already browsing. Perfect for e-commerce businesses looking to drive direct sales." },
    { title: 'Remarketing', description: "They came, they saw, they didn't buy — yet. Our remarketing campaigns gently nudge your audience back to complete their purchase." },
    { title: 'YouTube Video Ads', description: "Engage audiences with compelling video content on the world's second-largest search engine. Build brand awareness and drive action." },
    { title: 'Conversion Optimization', description: "We don't just drive clicks — we optimize every step of the funnel to maximize your return on ad spend." },
  ],
  whyChoose: [
    { title: 'Data-Driven Strategies', subtitle: '"Every Decision Backed by Insights"', description: "We use advanced analytics and A/B testing to ensure every campaign decision is backed by real data, not guesswork." },
    { title: 'Creative Ads That Convert', subtitle: '"ROI Meets Visual Appeal"', description: "Our ads don't just look good — they drive results. We balance creativity with conversion optimization for maximum impact." },
    { title: 'Always Transparent', subtitle: '"No Shady Numbers"', description: "No hidden fees, no inflated metrics. Just clear, honest reporting that shows you exactly where your money is going and what it's earning." },
  ],
  support: [
    { title: '24/7 Customer Assistance', description: "Round-the-clock support for campaign monitoring, adjustments, and any urgent issues that need immediate attention." },
    { title: 'Expert Consultation', description: "Personalized guidance from Google Ads specialists who understand your industry and can recommend optimal strategies." },
    { title: 'Multi-Channel Support', description: "Reach us via email, phone, live chat, or social media. We're always accessible when you need campaign support." },
  ],
  caseStudy: {
    title: 'UT Sarees — ₹50 Lacs Revenue',
    challenge: "A banarasi silk saree brand needed to scale their online sales through Google Ads while maintaining a profitable return on ad spend.",
    result: "Strategic search and shopping campaigns generated ₹50 lacs in revenue with an exceptional 10X return on ad spend through targeted keyword bidding and creative optimization.",
    highlight: '10X ROAS Achieved',
  },
  tactics: ['Keyword Mastery', 'A/B Testing', 'Custom Reporting', 'Bid Optimization', 'Audience Targeting', 'Ad Copy Testing', 'Landing Page Optimization', 'Analytics & Reporting'],
  ctaTitle: "Let's Turn Clicks Into Customers",
  ctaDescription: "Schedule a free consultation today and discover how our Google Ads strategies can drive real business growth.",
};

export default function GoogleAdsServicesPage() {
  return <ServicePageTemplate data={data} />;
}
