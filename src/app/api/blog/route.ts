import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import { requireAuth } from '@/lib/auth';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackBlogs } from '@/lib/fallback-content';
import { generateSlug, estimateReadTime } from '@/lib/utils';
import Blog from '@/models/Blog';
import SeoPage from '@/models/SeoPage';

export const runtime = 'nodejs';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

// GET all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ date: -1 });
    if (blogs.length === 0) {
      return NextResponse.json(getFallbackBlogs(), {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }
    return NextResponse.json(blogs, { headers: CACHE_HEADERS });
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for blog posts. Serving fallback JSON content.');

      return NextResponse.json(getFallbackBlogs(), {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }

    return jsonError(error, 'Failed to load blog posts');
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (body.title.length > 500) {
      return NextResponse.json(
        { error: 'Title must be 500 characters or less' },
        { status: 400 }
      );
    }

    if (body.content.length > 100000) {
      return NextResponse.json(
        { error: 'Content must be 100,000 characters or less' },
        { status: 400 }
      );
    }

    await dbConnect();

    const blog = await Blog.create({
      title: body.title,
      slug: generateSlug(body.title),
      excerpt: body.excerpt || '',
      content: body.content,
      category: body.category || 'General',
      author: body.author || 'Kreative Catalyst',
      date: new Date().toISOString().split('T')[0],
      readTime: estimateReadTime(body.content),
      published: body.published ?? true,
      coverImage: body.coverImage || '',
    });

    // Auto-register SEO page for this blog post
    await SeoPage.updateOne(
      { slug: `/blog/${blog.slug}` },
      {
        $setOnInsert: {
          slug: `/blog/${blog.slug}`,
          pageLabel: blog.title,
          metaTitle: `${blog.title} | Kreative Catalyst Blog`,
          metaDescription: body.excerpt || '',
        },
      },
      { upsert: true }
    ).catch(() => {});

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Blog post was not created.'
        : 'Failed to create blog post',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}
