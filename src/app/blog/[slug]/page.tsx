import type { Metadata } from 'next';
import { getSeoMeta, getSeoStructuredData } from '@/lib/getSeoMeta';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Check for admin-managed SEO overrides first
  const seo = await getSeoMeta(`/blog/${params.slug}`);
  if (seo.title) return seo;

  // Fall back to generating metadata from blog post content
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kreativecatalyst.in';
    const res = await fetch(`${baseUrl}/api/blog`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch');
    const blogs = await res.json();
    const post = blogs.find((b: { slug: string; published: boolean }) => b.slug === params.slug && b.published);

    if (!post) {
      return { title: 'Post Not Found | Kreative Catalyst' };
    }

    return {
      title: `${post.title} | Kreative Catalyst Blog`,
      description: post.excerpt || `Read ${post.title} on Kreative Catalyst blog.`,
      alternates: {
        canonical: `${baseUrl}/blog/${params.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Kreative Catalyst blog.`,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        url: `${baseUrl}/blog/${params.slug}`,
        siteName: 'Kreative Catalyst',
        locale: 'en_IN',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return { title: 'Blog | Kreative Catalyst' };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const structuredData = await getSeoStructuredData(`/blog/${params.slug}`);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      <BlogPostClient />
    </>
  );
}
