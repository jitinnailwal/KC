/**
 * Seed SEO pages into MongoDB.
 *
 * Usage:  npx tsx scripts/seedSeoPages.ts
 *
 * Safe to run multiple times — uses upsert.
 * Also auto-registers SEO entries for existing blogs and case studies.
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import dns from 'dns';
import mongoose from 'mongoose';

// Fix DNS for Windows (same as lib/mongodb.ts)
dns.setServers(['8.8.8.8', '1.1.1.1']);

// All public pages in the site
const pages = [
  { slug: '/', pageLabel: 'Home' },
  { slug: '/about', pageLabel: 'About' },
  { slug: '/blog', pageLabel: 'Blog' },
  { slug: '/case-studies', pageLabel: 'Case Studies' },
  { slug: '/contact', pageLabel: 'Contact' },
  { slug: '/services', pageLabel: 'Services' },
  { slug: '/services/seo-services', pageLabel: 'SEO Services' },
  { slug: '/services/social-media-marketing', pageLabel: 'Social Media Marketing' },
  { slug: '/services/google-ads-services', pageLabel: 'Google Ads Services' },
  { slug: '/services/content-marketing', pageLabel: 'Content Marketing' },
  { slug: '/services/whatsapp-marketing', pageLabel: 'WhatsApp Marketing' },
  { slug: '/services/website-design-development', pageLabel: 'Website Design & Development' },
  { slug: '/services/digital-pr-services', pageLabel: 'Digital PR Services' },
  { slug: '/triple-play-model', pageLabel: 'Triple Play Model' },
  { slug: '/locations/delhi', pageLabel: 'Delhi Location' },
  { slug: '/locations/varanasi', pageLabel: 'Varanasi Location' },
  { slug: '/locations/bengaluru', pageLabel: 'Bengaluru Location' },
  { slug: '/locations/uk', pageLabel: 'UK Location' },
  { slug: '/locations/usa', pageLabel: 'USA Location' },
  { slug: '/locations/uae', pageLabel: 'UAE Location' },
  { slug: '/work', pageLabel: 'Our Work' },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('ERROR: MONGODB_URI not found in environment variables.');
    console.error('Make sure .env.local or .env has MONGODB_URI defined.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 15000,
  });
  console.log('Connected.');

  const SeoPage = mongoose.models.SeoPage || mongoose.model(
    'SeoPage',
    new mongoose.Schema({
      slug: { type: String, required: true, unique: true },
      pageLabel: { type: String, required: true },
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      canonicalUrl: { type: String, default: '' },
      ogTitle: { type: String, default: '' },
      ogDescription: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      twitterCard: { type: String, default: 'summary_large_image' },
      robotsIndex: { type: Boolean, default: true },
      robotsFollow: { type: Boolean, default: true },
      structuredData: { type: String, default: '' },
      focusKeyword: { type: String, default: '' },
      updatedAt: { type: Date, default: Date.now },
      updatedBy: { type: String, default: '' },
    })
  );

  // Collect all pages to seed (static + dynamic from existing content)
  const allPages = [...pages];

  // Auto-discover existing blog posts
  try {
    const Blog = mongoose.models.Blog || mongoose.model(
      'Blog',
      new mongoose.Schema({ title: String, slug: String, excerpt: String, published: Boolean })
    );
    const blogs = await Blog.find({ published: true }, 'title slug excerpt').lean();
    for (const blog of blogs) {
      allPages.push({
        slug: `/blog/${blog.slug}`,
        pageLabel: blog.title,
      });
    }
    console.log(`Found ${blogs.length} published blog posts.`);
  } catch {
    console.log('Could not read blog posts (skipping).');
  }

  // Auto-discover existing case studies
  try {
    const CaseStudy = mongoose.models.CaseStudy || mongoose.model(
      'CaseStudy',
      new mongoose.Schema({ client: String, slug: String, headline: String, published: Boolean })
    );
    const studies = await CaseStudy.find({ published: true }, 'client slug headline').lean();
    for (const study of studies) {
      allPages.push({
        slug: `/case-studies/${study.slug}`,
        pageLabel: `${study.client} Case Study`,
      });
    }
    console.log(`Found ${studies.length} published case studies.`);
  } catch {
    console.log('Could not read case studies (skipping).');
  }

  let created = 0;
  let existing = 0;

  for (const page of allPages) {
    const result = await SeoPage.updateOne(
      { slug: page.slug },
      { $setOnInsert: page },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log(`  + Created: ${page.pageLabel} (${page.slug})`);
      created++;
    } else {
      console.log(`  = Exists:  ${page.pageLabel} (${page.slug})`);
      existing++;
    }
  }

  console.log(`\nDone! Created: ${created}, Already existed: ${existing}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
