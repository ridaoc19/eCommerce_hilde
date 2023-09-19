import mongoose, { Schema, Document } from 'mongoose';


interface IProduct extends Document {
  name: string;
  brand: string;
  specification: Record<string, string>[];
  description: string;
  images: string[];
  subcategoryId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  name: String,
  brand: String,
  specification:[{ type: Schema.Types.Mixed }],
  description: String,
  images: [String],
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
},
{
  versionKey: false,
  timestamps: true
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;

