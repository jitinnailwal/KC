import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';
import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital PR | Kreative Catalyst',
  description: 'Build visibility, authority, and credibility through strategic media outreach. Get your brand seen, mentioned, and trusted on publications and industry platforms.',
  alternates: { canonical: 'https://kreativecatalyst.in/services/digital-pr-services' },
  openGraph: {
    title: 'Digital PR | Kreative Catalyst',
    description: 'Build brand visibility, authority, and credibility through strategic media outreach and digital PR.',
    url: 'https://kreativecatalyst.in/services/digital-pr-services',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/services/digital-pr-services');
  return { ...fallback, ...seo };
}

const data: ServicePageData = {
  badge: 'Digital PR Services',
  headline: 'Get Your Brand Seen',
  headlineGradient: 'Mentioned & Trusted',
  heroDescription: "Running ads gets attention. But when people start seeing your brand on trusted websites, media platforms, and industry publications, trust changes completely. We help businesses build visibility, authority, and credibility through strategic media outreach.",
  whatIsTitle: 'What is Digital PR?',
  whatIsContent: [
    "Digital PR is about increasing your brand visibility across the internet through media coverage, online publications, interviews, brand mentions, and authority-building strategies.",
    "Ads stop working the moment you stop spending. But a strong brand presence keeps building trust long after. We help your business get noticed in the right places through smart outreach, strategic storytelling, and digital visibility that supports long-term growth.",
    "From founder interviews to publication features, from backlink-driven PR to online reputation building — Digital PR helps your business look more credible, searchable, and trustworthy.",
  ],
  whyNeededTitle: 'Why Digital PR Actually Works',
  whyNeededContent: [
    "People don't trust unknown brands easily anymore. Before making decisions, they search your business, check reviews, look for mentions, compare competitors, and judge credibility based on what they find online. In a market flooded with options, the brands that appear in trusted publications and authoritative platforms are the ones that win customer confidence — and ultimately, their business.",
    "Digital PR helps shape that perception. With the right strategy, it improves online credibility, builds brand authority, strengthens SEO performance, increases branded search visibility, earns quality backlinks, and improves customer trust. Unlike traditional advertising that interrupts audiences, Digital PR earns attention through genuine media coverage and thought leadership — creating lasting brand equity that paid campaigns simply cannot replicate.",
  ],
  services: [
    { title: 'Media Outreach', description: "We connect your business with relevant publications, blogs, and digital platforms to increase visibility and strengthen authority online." },
    { title: 'Founder PR', description: "People connect with people before businesses. We help founders build visibility through interviews, features, and strategic personal brand positioning." },
    { title: 'Press Release Distribution', description: "Launching something new? Achieved a milestone? We distribute professional press releases that improve reach and credibility." },
    { title: 'SEO PR', description: "Good Digital PR supports SEO. We generate high-authority backlinks, brand mentions, and signals that improve search performance." },
    { title: 'Brand Mention Strategy', description: "The more trusted places people see your brand, the stronger your reputation. We increase meaningful brand visibility across digital platforms." },
    { title: 'Online Reputation Management', description: "People judge businesses online within seconds. We improve how your business appears across search results and digital platforms." },
  ],
  whyChoose: [
    { title: 'Visibility Builds Trust', subtitle: '"People Trust Brands They Recognize"', description: "Digital PR helps your business appear more credible, established, and trustworthy online — the foundation of long-term growth." },
    { title: 'Beyond Paid Ads', subtitle: '"Authority Can\'t Be Bought"', description: "Anyone can run campaigns. Strong PR helps your business stand out beyond paid promotions through earned media and credibility." },
    { title: 'Reputation Drives Revenue', subtitle: '"Trust Impacts Conversions"', description: "The way your brand appears online directly affects trust, enquiries, and buying decisions. Better reputation means better business." },
  ],
  support: [
    { title: 'Real-Time Assistance', description: "Need help handling brand communication, media opportunities, or online reputation concerns? Our team is always ready to support you." },
    { title: 'Proactive Monitoring', description: "We monitor brand mentions, visibility trends, and online reputation signals to help your business stay ahead of the curve." },
    { title: 'Strategic Guidance', description: "From founder visibility to publication strategy, we help you build Digital PR campaigns aligned with your business goals." },
  ],
  caseStudy: {
    title: 'From Unknown to Recognized',
    challenge: "A growing business had strong services but very little online visibility outside ads and social media — no media mentions, no authority signals.",
    result: "Targeted media outreach, brand mentions, and authority-focused PR strategies led to better brand visibility, improved trust, stronger search presence, and more enquiries from people already familiar with the business.",
    highlight: 'Brand Authority Established',
  },
  tactics: ['Media Outreach', 'Publication Features', 'Founder Positioning', 'SEO PR', 'Brand Mentions', 'Reputation Monitoring', 'Press Releases', 'Authority Building'],
  ctaTitle: "Ready to Build Brand Authority?",
  ctaDescription: "Let's help your business get seen in the right places by the right audience. Build trust that lasts.",
};

export default function DigitalPRServicesPage() {
  return <ServicePageTemplate data={data} />;
}
