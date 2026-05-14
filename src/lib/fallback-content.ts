import fallbackBlogsJson from '../../data/blogs.json';
import fallbackReviewsJson from '../../data/reviews.json';
import fallbackCaseStudiesJson from '../../data/case-studies.json';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  published: boolean;
  coverImage?: string;
}

export interface Review {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  published: boolean;
  date: string;
  image?: string;
}

export interface CaseStudyPost {
  id: string;
  client: string;
  industry: string;
  headline: string;
  description: string;
  results: { metric: string; label: string }[];
  services: string[];
  coverImage: string;
  slug: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  content: string;
  date: string;
}

const fallbackBlogs = fallbackBlogsJson as BlogPost[];
const fallbackReviews = fallbackReviewsJson as Review[];
const fallbackCaseStudies = fallbackCaseStudiesJson as CaseStudyPost[];

function newestFirst<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

export function getFallbackBlogs() {
  return fallbackBlogs.map((blog) => ({ ...blog })).sort(newestFirst);
}

export function getFallbackBlog(idOrSlug: string) {
  return (
    getFallbackBlogs().find(
      (blog) => blog.id === idOrSlug || blog.slug === idOrSlug
    ) || null
  );
}

export function getFallbackReviews() {
  return fallbackReviews.map((review) => ({ ...review })).sort(newestFirst);
}

export function getFallbackReview(id: string) {
  return getFallbackReviews().find((review) => review.id === id) || null;
}

export function getFallbackCaseStudies() {
  return fallbackCaseStudies.map((cs) => ({ ...cs })).sort(newestFirst);
}

export function getFallbackCaseStudy(idOrSlug: string) {
  return (
    getFallbackCaseStudies().find(
      (cs) => cs.id === idOrSlug || cs.slug === idOrSlug
    ) || null
  );
}
