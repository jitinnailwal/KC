import type { Metadata } from 'next';
import CaseStudyDetailClient from './CaseStudyDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/case-studies/${params.slug}`,
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
