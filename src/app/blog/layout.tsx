import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Kreative Catalyst',
  description: 'Insights on digital marketing, SEO, social media, branding, and web development from the Kreative Catalyst team.',
  openGraph: {
    title: 'Blog | Kreative Catalyst',
    description: 'Insights on digital marketing, SEO, social media, branding, and web development.',
    url: 'https://kreativecatalyst.in/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
