// src/models/Subcategory.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISubcategory extends Document {
  name: string;
  productsId: mongoose.Types.ObjectId[];
  categoryId: mongoose.Types.ObjectId;
}

const subcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  productsId: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
},
{
  versionKey: false,
  timestamps: false
});

const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;
