import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Blog | Kreative Catalyst',
  description: 'Insights on digital marketing, SEO, social media, branding, and web development from the Kreative Catalyst team.',
  alternates: { canonical: 'https://kreativecatalyst.in/blog' },
  openGraph: {
    title: 'Blog | Kreative Catalyst',
    description: 'Insights on digital marketing, SEO, social media, branding, and web development.',
    url: 'https://kreativecatalyst.in/blog',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/blog');
  return { ...fallback, ...seo };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
