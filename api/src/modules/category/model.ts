// src/models/Category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  subcategories: mongoose.Types.ObjectId[];
  department: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
