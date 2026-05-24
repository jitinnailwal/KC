import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media Marketing | Kreative Catalyst',
  description: "Turn likes, shares, and hashtags into leads, sales, and success. Scroll-stopping content and ROI-driven campaigns that make your competition wish they'd hired us first.",
  openGraph: {
    title: 'Social Media Marketing | Kreative Catalyst',
    description: 'Scroll-stopping content and ROI-driven social media campaigns that turn engagement into real business results.',
    url: 'https://kreativecatalyst.in/services/social-media-marketing',
  },
};

const data: ServicePageData = {
  badge: 'Social Media Marketing',
  headline: "Your Brand's New BFF",
  headlineGradient: 'Social Media That Sells',
  heroDescription: "Let's turn likes, shares, and hashtags into leads, sales, and success. Scroll-stopping content and ROI-driven campaigns that make your competition wish they'd hired us first.",
  whatIsTitle: 'What Is Social Media Marketing?',
  whatIsContent: [
    "Social media marketing is your brand's megaphone — but way smarter. It involves crafted campaigns targeting audiences on the platforms where they spend hours every day. From Instagram Reels and Facebook campaigns to LinkedIn thought leadership and YouTube shorts, every piece of content is designed with a clear business objective in mind.",
    "SMM isn't about gaining followers for vanity metrics. It's about converting casual browsers into paying customers through strategic content, community building, and targeted advertising. We combine organic content strategies with paid social campaigns to create a complete social presence that builds brand loyalty, drives website traffic, and generates measurable revenue for your business.",
  ],
  whyNeededTitle: 'Why Do You Need It?',
  whyNeededContent: [
    "Social media is no longer optional — it's a mandatory business tool in today's market. Billions of potential customers are accessible through these platforms every single day. Your audience is already scrolling through feeds, watching stories, and engaging with content — the question is whether they're seeing your brand or your competitor's.",
    "The brands winning on social media are the ones having meaningful interactions and driving real business results, not just posting pretty pictures. A well-executed social media strategy increases brand awareness, builds customer trust, drives direct sales through social commerce, and creates a community of loyal advocates who amplify your message organically.",
  ],
  services: [
    { title: 'Strategy Development', description: "Random posts are so 2010. We create cohesive strategies that make your brand message loud, clear, and irresistible across all platforms." },
    { title: 'Content Creation', description: "We design content that makes your audience pause mid-scroll. Eye-catching visuals, engaging videos, and copy that converts." },
    { title: 'Ad Campaigns', description: "Our paid ads don't burn budgets — they multiply returns. Laser-focused targeting puts your brand in front of the right eyes." },
    { title: 'Social Listening', description: "We track what people are saying about your brand and turn feedback into opportunities for growth and engagement." },
    { title: 'Community Management', description: "Likes are cool, but conversations are cooler. We keep your audience engaged, replying to every comment and DM with finesse." },
    { title: 'Analytics & Reporting', description: "Data-driven insights on engagement, reach, and conversions. We measure what matters and optimize for results." },
  ],
  whyChoose: [
    { title: 'Data-Driven Approach', subtitle: '"Insights Guide Every Decision"', description: "Every post, every campaign, every decision is backed by data. We don't guess — we analyze, optimize, and deliver results." },
    { title: 'Creative Excellence', subtitle: '"Unconventional Ideas That Work"', description: "Our creative team generates engaging content that breaks through the noise and captures attention in crowded feeds." },
    { title: 'Platform Expertise', subtitle: '"We Know the Algorithms"', description: "Deep knowledge of each platform's algorithm means your content gets maximum reach and engagement organically." },
  ],
  support: [
    { title: '24/7 Customer Assistance', description: "Round-the-clock support across multiple channels for immediate help with any social media concerns or opportunities." },
    { title: 'Expert Consultation', description: "Guidance on growing your digital presence across social media, SEO, and advertising from experienced strategists." },
    { title: 'Multi-Channel Support', description: "Available via email, phone, live chat, and social media messaging — we're always just a message away." },
  ],
  caseStudy: {
    title: 'The Usee Shop — ₹30 Lacs in Sales',
    challenge: "An online banarasi silk saree brand needed help navigating Meta Ads to effectively showcase their premium products to the right audience.",
    result: "Strategic Meta Ads campaigns generated ₹30 lakh in sales with an exceptional 14:1 return on ad spend — ₹1 spent generated ₹14 in revenue.",
    highlight: '14:1 ROAS Achieved',
  },
  tactics: ['Platform-Specific Content', 'Trend Identification', 'Meme Marketing', 'A/B Testing', 'Audience Segmentation', 'Influencer Outreach', 'Analytics & Reporting'],
  ctaTitle: "Ready to Win on Social Media?",
  ctaDescription: "Let's create social media campaigns that don't just get likes — they drive real business growth and revenue.",
};

export default function SocialMediaMarketingPage() {
  return <ServicePageTemplate data={data} />;
}
