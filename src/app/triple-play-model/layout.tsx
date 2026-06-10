import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Triple Play Model | Kreative Catalyst',
  description: 'Our unified SEO + Meta Ads + Google Ads strategy that combines three powerful channels into one cohesive growth system.',
  alternates: { canonical: 'https://kreativecatalyst.in/triple-play-model' },
  openGraph: {
    title: 'Triple Play Model | Kreative Catalyst',
    description: 'A unified system that combines three powerful channels into one cohesive strategy.',
    url: 'https://kreativecatalyst.in/triple-play-model',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/triple-play-model');
  return { ...fallback, ...seo };
}

export default function TriplePlayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
