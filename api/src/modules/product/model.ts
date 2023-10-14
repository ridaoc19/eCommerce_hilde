import mongoose, { Schema, Document } from 'mongoose';

interface IVariants extends Document {
  size: string;
  color: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  brand: string;
  specification: Record<string, string>[];
  description: string;
  images: string[];
  subcategoryId: mongoose.Types.ObjectId;
  variants: IVariants[];
}

const varianteSchema = new Schema<IVariants>({
  size: String, // Talla del producto
  color: String, // Color del producto
  purchasePrice: Number, // Precio de compra de esta variante
  sellingPrice: Number, // Precio de venta de esta variante
  stock: Number, // Cantidad en stock de esta variante
});

const productSchema = new Schema<IProduct>({
  name: String,
  brand: String,
  specification: [{ type: Schema.Types.Mixed }],
  description: String,
  images: [String],
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  variants: [varianteSchema],
}, {
  versionKey: false,
  timestamps: false
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;




