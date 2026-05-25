import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import { requireAuth } from '@/lib/auth';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackCaseStudies } from '@/lib/fallback-content';
import { generateSlug } from '@/lib/utils';
import CaseStudy from '@/models/CaseStudy';
import SeoPage from '@/models/SeoPage';

export const runtime = 'nodejs';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

// GET all case studies
export async function GET() {
  try {
    await dbConnect();
    const caseStudies = await CaseStudy.find().sort({ date: -1 });
    if (caseStudies.length === 0) {
      return NextResponse.json(getFallbackCaseStudies(), {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }
    return NextResponse.json(caseStudies, { headers: CACHE_HEADERS });
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for case studies. Serving fallback JSON content.');

      return NextResponse.json(getFallbackCaseStudies(), {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }

    return jsonError(error, 'Failed to load case studies');
  }
}

// POST create new case study
export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.client?.trim() || !body.headline?.trim()) {
      return NextResponse.json(
        { error: 'Client and headline are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const caseStudy = await CaseStudy.create({
      client: body.client,
      industry: body.industry || '',
      headline: body.headline,
      description: body.description || '',
      results: body.results || [],
      services: body.services || [],
      coverImage: body.coverImage || '',
      slug: generateSlug(body.client),
      published: body.published ?? true,
      seoTitle: body.seoTitle || '',
      seoDescription: body.seoDescription || '',
      content: body.content || '',
      date: new Date().toISOString().split('T')[0],
    });

    // Auto-register SEO page for this case study
    await SeoPage.updateOne(
      { slug: `/case-studies/${caseStudy.slug}` },
      {
        $setOnInsert: {
          slug: `/case-studies/${caseStudy.slug}`,
          pageLabel: `${body.client} Case Study`,
          metaTitle: body.seoTitle || `${body.client} — ${body.headline} | Kreative Catalyst`,
          metaDescription: body.seoDescription || body.description || '',
        },
      },
      { upsert: true }
    ).catch(() => {});

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Case study was not created.'
        : 'Failed to create case study',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}
