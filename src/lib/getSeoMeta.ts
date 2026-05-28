import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import SeoPage from '@/models/SeoPage';

const BASE_URL = 'https://kreativecatalyst.in';

export async function getSeoMeta(slug: string): Promise<Metadata> {
  try {
    await dbConnect();
    const doc = await SeoPage.findOne({ slug }).lean();

    if (!doc) return {};

    const meta: Metadata = {};

    if (doc.metaTitle) {
      meta.title = doc.metaTitle;
    }

    if (doc.metaDescription) {
      meta.description = doc.metaDescription;
    }

    // Always set canonical URL — use admin-set value or derive from slug
    const canonical = doc.canonicalUrl || `${BASE_URL}${slug === '/' ? '' : slug}`;
    meta.alternates = { canonical };

    const indexStr = doc.robotsIndex ? 'index' : 'noindex';
    const followStr = doc.robotsFollow ? 'follow' : 'nofollow';
    meta.robots = { index: doc.robotsIndex, follow: doc.robotsFollow, googleBot: `${indexStr}, ${followStr}` };

    const ogTitle = doc.ogTitle || doc.metaTitle;
    const ogDesc = doc.ogDescription || doc.metaDescription;
    if (ogTitle || ogDesc) {
      meta.openGraph = {
        ...(ogTitle && { title: ogTitle }),
        ...(ogDesc && { description: ogDesc }),
        url: doc.canonicalUrl || `${BASE_URL}${slug === '/' ? '' : slug}`,
        siteName: 'Kreative Catalyst',
        ...(doc.ogImage && { images: [{ url: doc.ogImage }] }),
      };
    }

    meta.twitter = {
      card: (doc.twitterCard as 'summary' | 'summary_large_image') || 'summary_large_image',
      ...(ogTitle && { title: ogTitle }),
      ...(ogDesc && { description: ogDesc }),
      ...(doc.ogImage && { images: [doc.ogImage] }),
    };

    return meta;
  } catch {
    return {};
  }
}
