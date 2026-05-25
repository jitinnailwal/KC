import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import CaseStudy from '@/models/CaseStudy';
import SeoPage from '@/models/SeoPage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    await dbConnect();

    const [blogs, caseStudies] = await Promise.all([
      Blog.find({ published: true }).select('title slug excerpt').lean(),
      CaseStudy.find({ published: true })
        .select('client headline slug description seoTitle seoDescription')
        .lean(),
    ]);

    let created = 0;

    const blogOps = blogs.map((b) => ({
      updateOne: {
        filter: { slug: `/blog/${b.slug}` },
        update: {
          $setOnInsert: {
            slug: `/blog/${b.slug}`,
            pageLabel: b.title,
            metaTitle: `${b.title} | Kreative Catalyst Blog`,
            metaDescription: b.excerpt || '',
          },
        },
        upsert: true,
      },
    }));

    const csOps = caseStudies.map((cs) => ({
      updateOne: {
        filter: { slug: `/case-studies/${cs.slug}` },
        update: {
          $setOnInsert: {
            slug: `/case-studies/${cs.slug}`,
            pageLabel: `${cs.client} Case Study`,
            metaTitle:
              cs.seoTitle ||
              `${cs.client} — ${cs.headline} | Kreative Catalyst`,
            metaDescription: cs.seoDescription || cs.description || '',
          },
        },
        upsert: true,
      },
    }));

    if (blogOps.length > 0) {
      const result = await SeoPage.bulkWrite(blogOps);
      created += result.upsertedCount;
    }
    if (csOps.length > 0) {
      const result = await SeoPage.bulkWrite(csOps);
      created += result.upsertedCount;
    }

    return NextResponse.json({ synced: true, created });
  } catch (error) {
    console.error('SEO sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync SEO pages' },
      { status: 500 }
    );
  }
}
