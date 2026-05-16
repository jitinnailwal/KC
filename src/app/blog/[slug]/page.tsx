import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
      openGraph: {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Kreative Catalyst blog.`,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        url: `${baseUrl}/blog/${params.slug}`,
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

export default function BlogPostPage() {
  return <BlogPostClient />;
}
