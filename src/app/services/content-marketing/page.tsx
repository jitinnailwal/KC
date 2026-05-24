import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';
import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Content Marketing | Kreative Catalyst',
  description: 'Stop publishing content that nobody reads. We create strategic, SEO-optimized content that builds trust, improves visibility, and drives real business growth.',
  openGraph: {
    title: 'Content Marketing | Kreative Catalyst',
    description: 'Strategic, SEO-optimized content that builds trust, improves visibility, and drives real business growth.',
    url: 'https://kreativecatalyst.in/services/content-marketing',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/services/content-marketing');
  return seo.title ? seo : fallback;
}

const data: ServicePageData = {
  badge: 'Content Marketing',
  headline: 'Content That Drives',
  headlineGradient: 'Traffic & Leads',
  heroDescription: "Stop publishing content that nobody reads. We create strategic, SEO-optimized content that builds trust, improves visibility, and drives real business growth.",
  whatIsTitle: 'What Is Content Marketing?',
  whatIsContent: [
    "Content marketing involves creating useful, valuable materials that help build trust before customers make purchase decisions. Blog posts, website copy, landing pages, SEO content, emails, and social media — all working together as a unified content ecosystem. Every piece of content serves a specific purpose in your marketing funnel, whether it's attracting new visitors, nurturing prospects, or converting leads into customers.",
    "Great content answers your customers' questions, improves online visibility, builds authority, strengthens brand positioning, and supports conversion actions across every marketing channel. When done strategically, content marketing becomes the backbone of your entire digital presence — feeding your SEO rankings, social media engagement, email campaigns, and paid advertising with consistent, high-quality messaging that resonates with your target audience.",
  ],
  whyNeededTitle: 'Why Does Content Marketing Work?',
  whyNeededContent: [
    "Most customers research extensively before purchasing. Strategic content ensures your business is visible during their decision journey, building trust and credibility along the way. In a world where buyers consume an average of 3-5 pieces of content before engaging with a brand, having a strong content strategy means you're shaping their perception long before the first conversation happens.",
    "Content marketing delivers measurable results: increased organic traffic, established credibility, improved search rankings, higher engagement, better conversion rates, and consistent lead generation. Unlike paid campaigns that stop the moment you pause spending, quality content continues working for your business around the clock — attracting, educating, and converting your ideal customers month after month.",
  ],
  services: [
    { title: 'Content Strategy', description: "No more unfocused posting. We understand your audience's search behavior, identify relevant topics, and build a content funnel that drives conversions." },
    { title: 'SEO Content Writing', description: "Naturally readable content that ranks on search engines. Targeting search intent, improving keyword visibility, and driving sustainable organic traffic." },
    { title: 'Website Content', description: "Clear messaging that explains your value, target audience, differentiation, and desired actions — reducing visitor abandonment and increasing conversions." },
    { title: 'Blog Content', description: "Search-optimized articles designed for long-term traffic generation, user question answering, internal linking, and consistent visibility growth." },
    { title: 'Social Media Content', description: "Attention-grabbing posts that boost engagement, strengthen brand recall, and support your promotional campaigns across platforms." },
    { title: 'Ad Copywriting', description: "Conversion-focused messaging for paid campaigns. Better click-through rates, stronger landing page performance, and improved ad ROI." },
  ],
  whyChoose: [
    { title: 'Strategy First', subtitle: '"Content With Purpose"', description: "Every piece of content we create serves a strategic purpose. No random posts — just intentional, goal-driven content that moves the needle." },
    { title: 'SEO + Content', subtitle: '"Visibility That Compounds"', description: "Our content is built on keyword research and search intent. It ranks, it engages, and it keeps working for you long after publication." },
    { title: 'Results You Can Measure', subtitle: '"Track Every Win"', description: "We track traffic, engagement, rankings, and conversions. You always know exactly how your content investment is performing." },
  ],
  support: [
    { title: 'Real-Time Assistance', description: "Immediate support for content needs, campaign adjustments, and strategic pivots when opportunities arise." },
    { title: 'Proactive Monitoring', description: "Continuous tracking of content performance, search rankings, and engagement metrics to keep your strategy on track." },
    { title: 'Strategic Guidance', description: "Content planning aligned with your business objectives, seasonal trends, and audience behavior patterns." },
  ],
  caseStudy: {
    title: 'From Low Traffic to Consistent Leads',
    challenge: "A business had existing blogs and website content but experienced low traffic and inconsistent conversions — content without strategy.",
    result: "Restructured content, simplified website messaging, and implemented SEO-focused strategy aligned with search intent. Result: enhanced rankings, increased engagement, and reliable organic lead generation.",
    highlight: 'Consistent Organic Lead Growth',
  },
  tactics: ['Content Strategy', 'SEO Writing', 'Blog Management', 'Copywriting', 'Content Calendar', 'Performance Tracking', 'Topic Research', 'Audience Analysis'],
  ctaTitle: "Ready to Create Content That Converts?",
  ctaDescription: "Let's create content that does more than look good — clear strategy, better visibility, more traffic, and real business growth.",
};

export default function ContentMarketingPage() {
  return <ServicePageTemplate data={data} />;
}
