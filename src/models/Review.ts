import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  quote: string;
  name: string;
  role: string;
  rating: number;
  published: boolean;
  date: string;
  image?: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    published: { type: Boolean, default: true },
    date: { type: String, required: true },
    image: { type: String, default: '' },
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

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
