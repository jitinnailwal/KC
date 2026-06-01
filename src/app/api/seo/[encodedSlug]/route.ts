import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import SeoPage from '@/models/SeoPage';
import Blog from '@/models/Blog';
import CaseStudy from '@/models/CaseStudy';
import { requireAuth } from '@/lib/auth';

function decodeSlug(encoded: string): string {
  if (encoded === 'home') return '/';
  return '/' + encoded.replace(/__/g, '/');
}

// Blog and case-study SEO pages don't own their slug — it's derived from the
// underlying document and re-created on every SEO sync. To rename one without
// the sync re-creating a duplicate at the old slug, the source document's slug
// must move too. These map an SEO slug prefix to the collection that owns it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CONTENT_SOURCES: { prefix: string; model: mongoose.Model<any>; kind: string }[] = [
  { prefix: '/blog/', model: Blog, kind: 'blog post' },
  { prefix: '/case-studies/', model: CaseStudy, kind: 'case study' },
];

/**
 * If the renamed SEO page maps to a blog/case-study, rename that document's slug
 * to match so the two stay in sync. Returns a conflict when another document
 * already uses the target slug. No-op for static pages or when the URL prefix
 * (i.e. the content type) changes.
 */
async function syncSourceSlug(
  currentSlug: string,
  newSlug: string
): Promise<{ conflict: true; kind: string } | null> {
  for (const { prefix, model, kind } of CONTENT_SOURCES) {
    if (!currentSlug.startsWith(prefix) || !newSlug.startsWith(prefix)) continue;

    const oldContentSlug = currentSlug.slice(prefix.length);
    const newContentSlug = newSlug.slice(prefix.length);
    if (!newContentSlug || oldContentSlug === newContentSlug) return null;

    const clash = await model.findOne({ slug: newContentSlug });
    if (clash) return { conflict: true, kind };

    await model.updateOne({ slug: oldContentSlug }, { $set: { slug: newContentSlug } });
    revalidatePath(`${prefix}${oldContentSlug}`);
    revalidatePath(`${prefix}${newContentSlug}`);
    return null;
  }
  return null;
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

    // If the slug is being changed, make sure the target isn't already taken,
    // then propagate the rename to the underlying blog/case-study (if any) so
    // the next SEO sync doesn't re-create a duplicate at the old slug.
    if (newSlug !== currentSlug) {
      const existing = await SeoPage.findOne({ slug: newSlug });
      if (existing) {
        return NextResponse.json(
          { error: 'A page with that slug already exists' },
          { status: 409 }
        );
      }

      const sourceConflict = await syncSourceSlug(currentSlug, newSlug);
      if (sourceConflict) {
        return NextResponse.json(
          { error: `Another ${sourceConflict.kind} already uses that URL` },
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
