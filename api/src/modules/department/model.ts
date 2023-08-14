// src/models/Department.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  categoriesId: mongoose.Types.ObjectId[];
}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  categoriesId: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
},
{
  versionKey: false,
  timestamps: true
});

const Department = mongoose.model<IDepartment>('Department', departmentSchema);

export default Department;
