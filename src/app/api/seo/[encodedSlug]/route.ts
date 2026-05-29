import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import SeoPage from '@/models/SeoPage';
import { requireAuth } from '@/lib/auth';

function decodeSlug(encoded: string): string {
  if (encoded === 'home') return '/';
  return '/' + encoded.replace(/__/g, '/');
}

function normalizeSlug(input: string): string {
  let s = (input || '').trim().toLowerCase();
  if (!s) return '/';
  if (!s.startsWith('/')) s = '/' + s;
  s = s.replace(/\s+/g, '-').replace(/\/{2,}/g, '/');
  if (s.length > 1) s = s.replace(/\/+$/, '');
  return s;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { encodedSlug: string } }
) {
  try {
    const slug = decodeSlug(params.encodedSlug);
    await dbConnect();
    const doc = await SeoPage.findOne({ slug });

    if (!doc) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for SEO page fetch.');
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    console.error('SEO GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO page' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { encodedSlug: string } }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const slug = decodeSlug(params.encodedSlug);
    const body = await request.json();

    await dbConnect();

    const newSlug = body.slug !== undefined ? normalizeSlug(body.slug) : slug;

    // Guard against colliding with another page when the slug is changed.
    if (newSlug !== slug) {
      const conflict = await SeoPage.findOne({ slug: newSlug }).lean();
      if (conflict) {
        return NextResponse.json(
          { error: 'Another page already uses that slug.' },
          { status: 409 }
        );
      }
    }

    const updateData = {
      slug: newSlug,
      metaTitle: body.metaTitle ?? '',
      metaDescription: body.metaDescription ?? '',
      canonicalUrl: body.canonicalUrl ?? '',
      ogTitle: body.ogTitle ?? '',
      ogDescription: body.ogDescription ?? '',
      ogImage: body.ogImage ?? '',
      twitterCard: body.twitterCard ?? 'summary_large_image',
      robotsIndex: body.robotsIndex ?? true,
      robotsFollow: body.robotsFollow ?? true,
      structuredData: body.structuredData ?? '',
      focusKeyword: body.focusKeyword ?? '',
      updatedAt: new Date(),
      updatedBy: body.updatedBy ?? '',
    };

    const doc = await SeoPage.findOneAndUpdate(
      { slug },
      {
        $set: updateData,
        $setOnInsert: { pageLabel: body.pageLabel || newSlug },
      },
      { new: true, upsert: true }
    );

    // Invalidate cached pages so generateMetadata picks up new SEO data.
    // Revalidate both the old and new paths when the slug changed.
    revalidatePath(slug);
    if (newSlug !== slug) revalidatePath(newSlug);
    // Also revalidate the layout to ensure metadata changes are reflected
    if (slug !== '/' && newSlug !== '/') {
      revalidatePath('/');
    }

    return NextResponse.json(doc);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for SEO page update.');
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    console.error('SEO PUT error:', error);
    return NextResponse.json({ error: 'Failed to update SEO page' }, { status: 500 });
  }
}
