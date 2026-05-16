import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Kreative Catalyst',
  description: 'Learn about Kreative Catalyst — a digital marketing agency driven by integrity, innovation, and results for businesses across India.',
  openGraph: {
    title: 'About Us | Kreative Catalyst',
    description: 'A digital marketing agency driven by integrity, innovation, and results.',
    url: 'https://kreativecatalyst.in/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
