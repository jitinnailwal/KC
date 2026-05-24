import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Our Services | Kreative Catalyst',
  description: 'Digital marketing services including SEO, Google Ads, social media marketing, content marketing, WhatsApp marketing, and web development.',
  openGraph: {
    title: 'Our Services | Kreative Catalyst',
    description: 'Full-stack digital marketing services to grow your business online.',
    url: 'https://kreativecatalyst.in/services',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/services');
  return seo.title ? seo : fallback;
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
