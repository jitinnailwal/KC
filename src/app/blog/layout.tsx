import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Blog | Kreative Catalyst',
  description: 'Insights on digital marketing, SEO, social media, branding, and web development from the Kreative Catalyst team.',
  openGraph: {
    title: 'Blog | Kreative Catalyst',
    description: 'Insights on digital marketing, SEO, social media, branding, and web development.',
    url: 'https://kreativecatalyst.in/blog',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/blog');
  return seo.title ? seo : fallback;
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
