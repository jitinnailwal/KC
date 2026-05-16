import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Kreative Catalyst',
  description: 'Explore our portfolio of successful digital marketing campaigns and web development projects.',
  openGraph: {
    title: 'Our Work | Kreative Catalyst',
    description: 'See the results we deliver for our clients.',
    url: 'https://kreativecatalyst.in/work',
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
