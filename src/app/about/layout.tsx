import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'About Us | Kreative Catalyst',
  description: 'Learn about Kreative Catalyst — a digital marketing agency driven by integrity, innovation, and results for businesses across India.',
  openGraph: {
    title: 'About Us | Kreative Catalyst',
    description: 'A digital marketing agency driven by integrity, innovation, and results.',
    url: 'https://kreativecatalyst.in/about',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/about');
  return seo.title ? seo : fallback;
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
