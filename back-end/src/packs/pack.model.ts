import * as mongoose from 'mongoose';

export const PackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

export interface Pack extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  products: Array<string>
}