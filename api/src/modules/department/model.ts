// src/models/Department.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  categories: mongoose.Types.ObjectId[];
}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

const Department = mongoose.model<IDepartment>('Department', departmentSchema);

export default Department;
