import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Kreative Catalyst',
  description: 'See how Kreative Catalyst has helped businesses grow with SEO, social media marketing, Google Ads, and web development.',
  openGraph: {
    title: 'Case Studies | Kreative Catalyst',
    description: 'Real results for real businesses. Explore our digital marketing success stories.',
    url: 'https://kreativecatalyst.in/case-studies',
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
