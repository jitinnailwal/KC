import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Digital Marketing Agency in USA | Kreative Catalyst',
  description: 'Kreative Catalyst is a digital marketing agency serving businesses across the USA with SEO, performance marketing, AI search optimization, website development, and Digital PR.',
  openGraph: {
    title: 'Digital Marketing Agency in USA | Kreative Catalyst',
    description: 'Digital marketing agency serving businesses across the USA.',
    url: 'https://kreativecatalyst.in/locations/usa',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/locations/usa');
  return seo.title ? seo : fallback;
}

export default function UsaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
