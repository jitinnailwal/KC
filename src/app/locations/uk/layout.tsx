import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital Marketing Agency UK | Kreative Catalyst',
  description: 'Kreative Catalyst is a digital marketing agency serving businesses across the UK with SEO, local SEO, performance marketing, content marketing, website development, and AI search optimisation.',
  alternates: { canonical: 'https://kreativecatalyst.in/locations/uk' },
  openGraph: {
    title: 'Digital Marketing Agency UK | Kreative Catalyst',
    description: 'Digital marketing agency serving businesses across the UK.',
    url: 'https://kreativecatalyst.in/locations/uk',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/locations/uk');
  return { ...fallback, ...seo };
}

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
