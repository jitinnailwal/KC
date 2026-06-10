import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital Marketing Agency in Delhi | Kreative Catalyst',
  description: 'Kreative Catalyst is a leading digital marketing agency in Delhi offering SEO, social media marketing, Google Ads, and web development services.',
  alternates: { canonical: 'https://kreativecatalyst.in/locations/delhi' },
  openGraph: {
    title: 'Digital Marketing Agency in Delhi | Kreative Catalyst',
    description: 'Leading digital marketing agency in Delhi.',
    url: 'https://kreativecatalyst.in/locations/delhi',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/locations/delhi');
  return { ...fallback, ...seo };
}

export default function DelhiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
