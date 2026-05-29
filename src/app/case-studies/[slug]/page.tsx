import type { Metadata } from 'next';
import { getSeoMeta } from '@/lib/getSeoMeta';
import CaseStudyDetailClient from './CaseStudyDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Check for admin-managed SEO overrides first
  const seo = await getSeoMeta(`/case-studies/${params.slug}`);
  if (seo.title) return seo;

  // Fall back to generating metadata from case study content
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kreativecatalyst.in';
    const res = await fetch(`${baseUrl}/api/case-studies`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch');
    const studies = await res.json();
    const study = studies.find((cs: { slug: string; published: boolean }) => cs.slug === params.slug && cs.published);

    if (!study) {
      return { title: 'Case Study Not Found | Kreative Catalyst' };
    }

    const title = study.seoTitle || `${study.client} — ${study.headline}`;
    const description = study.seoDescription || study.description || `See how we helped ${study.client} achieve results.`;

    return {
      title: `${title} | Kreative Catalyst`,
      description,
      alternates: {
        canonical: `${baseUrl}/case-studies/${params.slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/case-studies/${params.slug}`,
        siteName: 'Kreative Catalyst',
        locale: 'en_IN',
        ...(study.coverImage ? { images: [{ url: study.coverImage }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch {
    return { title: 'Case Studies | Kreative Catalyst' };
  }
}

export default function CaseStudyDetailPage() {
  return <CaseStudyDetailClient />;
}
