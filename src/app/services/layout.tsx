import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Our Services | Kreative Catalyst',
  description: 'Digital marketing services including SEO, Google Ads, social media marketing, content marketing, WhatsApp marketing, and web development.',
  alternates: { canonical: 'https://kreativecatalyst.in/services' },
  openGraph: {
    title: 'Our Services | Kreative Catalyst',
    description: 'Full-stack digital marketing services to grow your business online.',
    url: 'https://kreativecatalyst.in/services',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/services');
  return { ...fallback, ...seo };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
