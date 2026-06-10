import { MetadataRoute } from 'next';

const BASE_URL = 'https://kreativecatalyst.in';

const staticPages = [
  { path: '', priority: 1.0 },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/services/seo-services', priority: 0.8 },
  { path: '/services/google-ads-services', priority: 0.8 },
  { path: '/services/social-media-marketing', priority: 0.8 },
  { path: '/services/website-design-development', priority: 0.8 },
  { path: '/services/whatsapp-marketing', priority: 0.8 },
  { path: '/services/content-marketing', priority: 0.8 },
  { path: '/services/digital-pr-services', priority: 0.8 },
  { path: '/blog', priority: 0.8 },
  { path: '/case-studies', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/triple-play-model', priority: 0.7 },
  { path: '/locations/delhi', priority: 0.6 },
  { path: '/locations/varanasi', priority: 0.6 },
  { path: '/locations/bengaluru', priority: 0.6 },
  { path: '/locations/uk', priority: 0.6 },
  { path: '/locations/usa', priority: 0.6 },
  { path: '/locations/uae', priority: 0.6 },
];

async function fetchSlugs(endpoint: string): Promise<{ slug: string; date?: string }[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data)
      ? data.map((item: { slug?: string; date?: string }) => ({
          slug: item.slug || '',
          date: item.date,
        })).filter((item: { slug: string }) => item.slug)
      : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, caseStudies] = await Promise.all([
    fetchSlugs('blog'),
    fetchSlugs('case-studies'),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map(({ slug, date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: date ? new Date(date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map(({ slug, date }) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    lastModified: date ? new Date(date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
