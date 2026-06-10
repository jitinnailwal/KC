import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital Marketing Agency in Bangalore | Kreative Catalyst',
  description: 'Kreative Catalyst is a leading digital marketing agency in Bangalore offering SEO, social media marketing, Google Ads, and web development services.',
  alternates: { canonical: 'https://kreativecatalyst.in/locations/bengaluru' },
  openGraph: {
    title: 'Digital Marketing Agency in Bangalore | Kreative Catalyst',
    description: 'Leading digital marketing agency in Bangalore.',
    url: 'https://kreativecatalyst.in/locations/bengaluru',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/locations/bengaluru');
  return { ...fallback, ...seo };
}

export default function BengaluruLayout({ children }: { children: React.ReactNode }) {
  return children;
}
