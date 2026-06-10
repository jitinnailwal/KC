import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital Marketing Agency in Varanasi | Kreative Catalyst',
  description: 'Kreative Catalyst is a leading digital marketing agency in Varanasi offering SEO, social media marketing, Google Ads, and web development services.',
  alternates: { canonical: 'https://kreativecatalyst.in/locations/varanasi' },
  openGraph: {
    title: 'Digital Marketing Agency in Varanasi | Kreative Catalyst',
    description: 'Leading digital marketing agency in Varanasi.',
    url: 'https://kreativecatalyst.in/locations/varanasi',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/locations/varanasi');
  return { ...fallback, ...seo };
}

export default function VaranasiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
