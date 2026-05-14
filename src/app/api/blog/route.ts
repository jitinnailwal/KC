import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackBlogs } from '@/lib/fallback-content';
import Blog from '@/models/Blog';

export const runtime = 'nodejs';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// GET all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ date: -1 });
    if (blogs.length === 0) {
      return NextResponse.json(getFallbackBlogs(), {
        headers: { 'X-Data-Source': 'fallback-json' },
      });
    }
    return NextResponse.json(blogs);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for blog posts. Serving fallback JSON content.');

      return NextResponse.json(getFallbackBlogs(), {
        headers: { 'X-Data-Source': 'fallback-json' },
      });
    }

    return jsonError(error, 'Failed to load blog posts');
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
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
