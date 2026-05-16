import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
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

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Kreative Catalyst' },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    published: { type: Boolean, default: true },
    coverImage: { type: String, default: '' },
  },
  {
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BlogSchema.index({ date: -1 });
BlogSchema.index({ slug: 1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
