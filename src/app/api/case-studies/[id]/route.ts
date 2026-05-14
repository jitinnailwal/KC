import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackCaseStudy } from '@/lib/fallback-content';
import CaseStudy from '@/models/CaseStudy';

export const runtime = 'nodejs';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// GET single case study
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const caseStudy = await CaseStudy.findById(params.id);
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    return NextResponse.json(caseStudy);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for case study lookup. Serving fallback JSON content.');

      const caseStudy = getFallbackCaseStudy(params.id);
      if (!caseStudy) {
        return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
      }

      return NextResponse.json(caseStudy, {
        headers: { 'X-Data-Source': 'fallback-json' },
      });
    }

    return jsonError(error, 'Failed to load case study');
  }
}

// PUT update case study
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    await dbConnect();
    const caseStudy = await CaseStudy.findById(params.id);
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    if (body.client !== undefined) {
      caseStudy.client = body.client;
      caseStudy.slug = generateSlug(body.client);
    }
    if (body.industry !== undefined) caseStudy.industry = body.industry;
    if (body.headline !== undefined) caseStudy.headline = body.headline;
    if (body.description !== undefined) caseStudy.description = body.description;
    if (body.results !== undefined) caseStudy.results = body.results;
    if (body.services !== undefined) caseStudy.services = body.services;
    if (body.coverImage !== undefined) caseStudy.coverImage = body.coverImage;
    if (body.published !== undefined) caseStudy.published = body.published;
    if (body.seoTitle !== undefined) caseStudy.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) caseStudy.seoDescription = body.seoDescription;
    if (body.content !== undefined) caseStudy.content = body.content;

    await caseStudy.save();
    return NextResponse.json(caseStudy);
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Case study was not updated.'
        : 'Failed to update case study',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}

// DELETE case study
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const caseStudy = await CaseStudy.findByIdAndDelete(params.id);
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Case study was not deleted.'
        : 'Failed to delete case study',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}
