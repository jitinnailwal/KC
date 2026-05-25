import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SeoPage from '@/models/SeoPage';
import { requireAuth } from '@/lib/auth';

function decodeSlug(encoded: string): string {
  if (encoded === 'home') return '/';
  return '/' + encoded.replace(/__/g, '/');
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

    const updateData = {
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
        $setOnInsert: { slug, pageLabel: body.pageLabel || slug },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(doc);
  } catch (error) {
    console.error('SEO PUT error:', error);
    return NextResponse.json({ error: 'Failed to update SEO page' }, { status: 500 });
  }
}
