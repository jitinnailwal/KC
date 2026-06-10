import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'About Us | Kreative Catalyst',
  description: 'Learn about Kreative Catalyst — a digital marketing agency driven by integrity, innovation, and results for businesses across India.',
  alternates: { canonical: 'https://kreativecatalyst.in/about' },
  openGraph: {
    title: 'About Us | Kreative Catalyst',
    description: 'A digital marketing agency driven by integrity, innovation, and results.',
    url: 'https://kreativecatalyst.in/about',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/about');
  return { ...fallback, ...seo };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
