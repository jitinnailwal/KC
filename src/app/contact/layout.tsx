import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';

const fallback: Metadata = {
  title: 'Contact Us | Kreative Catalyst',
  description: 'Get in touch with Kreative Catalyst for SEO, social media marketing, Google Ads, content marketing, and web development services.',
  openGraph: {
    title: 'Contact Us | Kreative Catalyst',
    description: 'Ready to grow your business? Contact us for a free consultation.',
    url: 'https://kreativecatalyst.in/contact',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/contact');
  return seo.title ? seo : fallback;
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
