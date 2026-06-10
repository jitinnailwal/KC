import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital Marketing Agency in UAE | Kreative Catalyst',
  description: 'Kreative Catalyst is a digital marketing agency serving businesses across the UAE with SEO, paid advertising, content marketing, and website development services.',
  alternates: { canonical: 'https://kreativecatalyst.in/locations/uae' },
  openGraph: {
    title: 'Digital Marketing Agency in UAE | Kreative Catalyst',
    description: 'Digital marketing agency serving businesses across the UAE.',
    url: 'https://kreativecatalyst.in/locations/uae',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/locations/uae');
  return { ...fallback, ...seo };
}

export default function UaeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
