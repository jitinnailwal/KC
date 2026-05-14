import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
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

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    client: { type: String, required: true },
    industry: { type: String, default: '' },
    headline: { type: String, required: true },
    description: { type: String, default: '' },
    results: {
      type: [{ metric: { type: String }, label: { type: String } }],
      default: [],
    },
    services: { type: [String], default: [] },
    coverImage: { type: String, default: '' },
    slug: { type: String, required: true, unique: true },
    published: { type: Boolean, default: true },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    content: { type: String, default: '' },
    date: { type: String, required: true },
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

export default mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
