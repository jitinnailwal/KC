import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api-error';
import dbConnect, { isMongoConnectionError } from '@/lib/mongodb';
import { getFallbackReviews } from '@/lib/fallback-content';
import Review from '@/models/Review';

export const runtime = 'nodejs';

// GET all reviews
export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find().sort({ date: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    if (isMongoConnectionError(error)) {
      console.info('MongoDB unavailable for reviews. Serving fallback JSON content.');

      return NextResponse.json(getFallbackReviews(), {
        headers: { 'X-Data-Source': 'fallback-json' },
      });
    }

    return jsonError(error, 'Failed to load reviews');
  }
}

// POST create new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.quote?.trim() || !body.name?.trim()) {
      return NextResponse.json(
        { error: 'Quote and name are required' },
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
