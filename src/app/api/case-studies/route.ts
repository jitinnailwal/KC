import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import { requireAuth } from '@/lib/auth';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackCaseStudies } from '@/lib/fallback-content';
import CaseStudy from '@/models/CaseStudy';

export const runtime = 'nodejs';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// GET all case studies
export async function GET() {
  try {
    await dbConnect();
    const caseStudies = await CaseStudy.find().sort({ date: -1 });
    if (caseStudies.length === 0) {
      return NextResponse.json(getFallbackCaseStudies(), {
        headers: { 'X-Data-Source': 'fallback-json' },
      });
    }
    return NextResponse.json(caseStudies);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for case studies. Serving fallback JSON content.');

      return NextResponse.json(getFallbackCaseStudies(), {
        headers: { 'X-Data-Source': 'fallback-json' },
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
