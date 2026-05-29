import { NextResponse } from 'next/server';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import SeoPage from '@/models/SeoPage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const pages = await SeoPage.find().sort({ slug: 1 }).lean();

    const result = pages.map((p) => ({
      id: p._id.toString(),
      slug: p.slug,
      pageLabel: p.pageLabel,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      updatedAt: p.updatedAt,
      updatedBy: p.updatedBy,
    }));

    return NextResponse.json(result);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for SEO pages.');
      return NextResponse.json([], { headers: { 'X-Data-Source': 'fallback-empty' } });
    }
    console.error('SEO list error:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO pages' }, { status: 500 });
  }
}
