import mongoose, { Schema, Document } from 'mongoose';

interface Specification {
  key: string;
  value: string;
}

interface IProduct extends Document {
  images: string[];
  department: string;
  category: string;
  subcategory: string;
  price: string;
  specification: Specification[];
  description: string;
}

const specificationSchema = new Schema<Specification>({
  key: String,
  value: String,
});

const productSchema = new Schema<IProduct>({
  images: [String],
  department: String,
  category: String,
  subcategory: String,
  price: String,
  specification: [specificationSchema],
  description: String,
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;

