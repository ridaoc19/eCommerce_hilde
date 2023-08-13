// src/models/Subcategory.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISubcategory extends Document {
  name: string;
  products: mongoose.Types.ObjectId[];
  category: mongoose.Types.ObjectId;
}

const subcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;
