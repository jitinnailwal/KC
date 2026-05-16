/**
 * Shared TypeScript interfaces used across the application.
 */

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

export interface CaseStudy {
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
