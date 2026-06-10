import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Case Studies | Kreative Catalyst',
  description: 'See how Kreative Catalyst has helped businesses grow with SEO, social media marketing, Google Ads, and web development.',
  alternates: { canonical: 'https://kreativecatalyst.in/case-studies' },
  openGraph: {
    title: 'Case Studies | Kreative Catalyst',
    description: 'Real results for real businesses. Explore our digital marketing success stories.',
    url: 'https://kreativecatalyst.in/case-studies',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/case-studies');
  return { ...fallback, ...seo };
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
