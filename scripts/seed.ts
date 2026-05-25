import dns from 'dns';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not set. Run with: npx tsx --env-file=.env.local scripts/seed.ts');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Define schemas inline to avoid import path issues
  const BlogSchema = new mongoose.Schema({
    title: String,
    slug: String,
    excerpt: String,
    content: String,
    category: String,
    author: String,
    date: String,
    readTime: String,
    published: Boolean,
    coverImage: String,
  });

  const ReviewSchema = new mongoose.Schema({
    quote: String,
    name: String,
    role: String,
    rating: Number,
    published: Boolean,
    date: String,
  });

  const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
  const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

  // Seed blogs
  const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
  if (fs.existsSync(blogsPath)) {
    const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
    if (blogs.length > 0) {
      const existingCount = await Blog.countDocuments();
      if (existingCount === 0) {
        await Blog.insertMany(blogs.map(({ id, ...rest }: Record<string, unknown>) => rest));
        console.log(`Seeded ${blogs.length} blog posts`);
      } else {
        console.log(`Skipped blogs - ${existingCount} already exist`);
      }
    }
  }

  // Seed reviews
  const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');
  if (fs.existsSync(reviewsPath)) {
    const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));
    if (reviews.length > 0) {
      const existingCount = await Review.countDocuments();
      if (existingCount === 0) {
        await Review.insertMany(reviews.map(({ id, ...rest }: Record<string, unknown>) => rest));
        console.log(`Seeded ${reviews.length} reviews`);
      } else {
        console.log(`Skipped reviews - ${existingCount} already exist`);
      }
    }
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
