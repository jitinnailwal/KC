import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackBlog } from '@/lib/fallback-content';
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

// GET single blog
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for blog post lookup. Serving fallback JSON content.');

      const blog = getFallbackBlog(params.id);
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json(blog, {
        headers: { 'X-Data-Source': 'fallback-json' },
      });
    }

    return jsonError(error, 'Failed to load blog post');
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    if (body.title !== undefined) {
      blog.title = body.title;
      blog.slug = generateSlug(body.title);
    }
    if (body.excerpt !== undefined) blog.excerpt = body.excerpt;
    if (body.content !== undefined) {
      blog.content = body.content;
      blog.readTime = estimateReadTime(body.content);
    }
    if (body.category !== undefined) blog.category = body.category;
    if (body.author !== undefined) blog.author = body.author;
    if (body.published !== undefined) blog.published = body.published;
    if (body.coverImage !== undefined) blog.coverImage = body.coverImage;

    await blog.save();
    return NextResponse.json(blog);
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Blog post was not updated.'
        : 'Failed to update blog post',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}

// DELETE blog
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Blog post was not deleted.'
        : 'Failed to delete blog post',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}
