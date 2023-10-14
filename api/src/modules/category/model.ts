// src/models/Category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  subcategoriesId: mongoose.Types.ObjectId[];
  departmentId: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  subcategoriesId: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
},
{
  versionKey: false,
  timestamps: false
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
