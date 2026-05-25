import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { jsonError } from '@/lib/api-error';
import { requireAuth } from '@/lib/auth';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackReview } from '@/lib/fallback-content';
import Review from '@/models/Review';

export const runtime = 'nodejs';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

// GET single review
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const review = await Review.findById(params.id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json(review, { headers: CACHE_HEADERS });
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for review lookup. Serving fallback JSON content.');

      const review = getFallbackReview(params.id);
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      }

      return NextResponse.json(review, {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }

    return jsonError(error, 'Failed to load review');
  }
}

// PUT update review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    await dbConnect();
    const review = await Review.findById(params.id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (body.quote !== undefined) review.quote = body.quote;
    if (body.name !== undefined) review.name = body.name;
    if (body.role !== undefined) review.role = body.role;
    if (body.rating !== undefined) review.rating = body.rating;
    if (body.published !== undefined) review.published = body.published;
    if (body.image !== undefined) review.image = body.image;

    await review.save();

    revalidatePath('/');

    return NextResponse.json(review);
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Review was not updated.'
        : 'Failed to update review',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}

// DELETE review
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    await dbConnect();
    const review = await Review.findByIdAndDelete(params.id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Review was not deleted.'
        : 'Failed to delete review',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}
