import mongoose, { Schema, Document } from 'mongoose';

export interface ISeoPage extends Document {
  slug: string;
  pageLabel: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  structuredData: string;
  focusKeyword: string;
  updatedAt: Date;
  updatedBy: string;
}

const SeoPageSchema = new Schema<ISeoPage>(
  {
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

export default mongoose.models.SeoPage || mongoose.model<ISeoPage>('SeoPage', SeoPageSchema);
