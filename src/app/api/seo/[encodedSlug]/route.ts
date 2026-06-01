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
  let s = (input || '').trim();
  if (!s || s === '/') return '/';
  if (!s.startsWith('/')) s = '/' + s;
  s = s.replace(/\/+/g, '/'); // collapse duplicate slashes
  if (s.length > 1) s = s.replace(/\/$/, ''); // strip trailing slash
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
    const currentSlug = decodeSlug(params.encodedSlug);
    const body = await request.json();
    const newSlug = normalizeSlug(body.slug ?? currentSlug);

    await dbConnect();

    // If the slug is being changed, make sure the target isn't already taken.
    if (newSlug !== currentSlug) {
      const existing = await SeoPage.findOne({ slug: newSlug });
      if (existing) {
        return NextResponse.json(
          { error: 'A page with that slug already exists' },
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
      { slug: currentSlug },
      {
        $set: updateData,
        $setOnInsert: { pageLabel: body.pageLabel || newSlug },
      },
      { new: true, upsert: true }
    );

    // Invalidate cached pages so generateMetadata picks up new SEO data —
    // revalidate both the old and (if renamed) the new path.
    revalidatePath(currentSlug);
    if (newSlug !== currentSlug) {
      revalidatePath(newSlug);
    }
    // Also revalidate the layout to ensure metadata changes are reflected
    if (currentSlug !== '/' && newSlug !== '/') {
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
