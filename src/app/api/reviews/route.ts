import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { jsonError } from '@/lib/api-error';
import { requireAuth } from '@/lib/auth';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackReviews } from '@/lib/fallback-content';
import Review from '@/models/Review';

export const runtime = 'nodejs';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

// GET all reviews
export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find().sort({ date: -1 });
    if (reviews.length === 0) {
      return NextResponse.json(getFallbackReviews(), {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }
    return NextResponse.json(reviews, { headers: CACHE_HEADERS });
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for reviews. Serving fallback JSON content.');

      return NextResponse.json(getFallbackReviews(), {
        headers: { 'X-Data-Source': 'fallback-json', ...CACHE_HEADERS },
      });
    }

    return jsonError(error, 'Failed to load reviews');
  }
}

// POST create new review
export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.quote?.trim() || !body.name?.trim()) {
      return NextResponse.json(
        { error: 'Quote and name are required' },
        { status: 400 }
      );
    }

    if (body.name.length > 200) {
      return NextResponse.json(
        { error: 'Name must be 200 characters or less' },
        { status: 400 }
      );
    }

    if (body.quote.length > 5000) {
      return NextResponse.json(
        { error: 'Quote must be 5,000 characters or less' },
        { status: 400 }
      );
    }

    await dbConnect();

    const review = await Review.create({
      quote: body.quote,
      name: body.name,
      role: body.role || '',
      rating: body.rating ?? 5,
      published: body.published ?? true,
      date: new Date().toISOString().split('T')[0],
      image: body.image || '',
    });

    revalidatePath('/');

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return jsonError(
      error,
      isMongoConnectionError(error)
        ? 'Database unavailable. Review was not created.'
        : 'Failed to create review',
      isMongoConnectionError(error) ? 503 : 500
    );
  }
}
