import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { jsonError } from '@/lib/api-error';
import { requireAuth } from '@/lib/auth';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackBlog } from '@/lib/fallback-content';
import { generateSlug, estimateReadTime } from '@/lib/utils';
import Blog from '@/models/Blog';
import SeoPage from '@/models/SeoPage';

export const runtime = 'nodejs';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

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
    return NextResponse.json(blog, { headers: CACHE_HEADERS });
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for blog post lookup. Serving fallback JSON content.');

      const blog = getFallbackBlog(params.id);
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json(blog, {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
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
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const oldSlug = blog.slug;

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

    // Sync SeoPage if slug changed
    if (blog.slug !== oldSlug) {
      await SeoPage.findOneAndUpdate(
        { slug: `/blog/${oldSlug}` },
        { $set: { slug: `/blog/${blog.slug}`, pageLabel: blog.title } }
      ).catch(() => {});
      revalidatePath(`/blog/${oldSlug}`);
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath('/');

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
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await SeoPage.deleteOne({ slug: `/blog/${blog.slug}` }).catch(() => {});

    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath('/');

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
