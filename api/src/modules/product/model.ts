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
  timestamps: true
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;


const colors = {
  white: { Blanco: "#FFFFFF" },
  lavenderWhite: { "Lavanda Blanca": "#FFF0F5" },
  ivory: { Marfil: "#FFFFF0" },
  lemonYellow: { "Amarillo Limón": "#FFFFE0" },
  yellow: { Amarillo: "#FFFF00" },
  goldenYellow: { "Amarillo Dorado": "#FFD700" },
  coral: { Coral: "#FF6B6B" },
  lightCoral: { "Coral Claro": "#F08080" },
  salmon: { Salmón: "#FA8072" },
  rose: { Rosado: "#FFC0CB" },
  roseLavender: { "Lavanda Rosa": "#FFF0F5" },
  lavender: { Lavanda: "#E6E6FA" },
  lavenderGray: { "Lavanda Gris": "#D3D3D3" },
  blueLavender: { "Lavanda Azul": "#6A5ACD" },
  lavenderBlue: { "Azul Lavanda": "#CCCCFF" },
  steelBlue: { "Azul Acero": "#4682B4" },
  navyBlue: { "Azul Marino": "#000080" },
  royalBlue: { "Azul Real": "#4169E1" },
  lightBlue: { "Azul Claro": "#ADD8E6" },
  skyBlue: { "Azul Cielo": "#87CEEB" },
  darkBlue: { "Azul Oscuro": "#00008B" },
  greenBlue: { "Azul Verde": "#008080" },
  teal: { Teal: "#008080" },
  darkCyan: { "Cian Oscuro": "#008B8B" },
  cyan: { Cían: "#00FFFF" },
  lightTurquoise: { "Turquesa Claro": "#00CED1" },
  turquoise: { Turquesa: "#40E0D0" },
  seaGreen: { "Verde Mar": "#2E8B57" },
  limeGreen: { "Verde Lima": "#00FF00" },
  green: { Verde: "#008000" },
  darkOliveGreen: { "Verde Oliva Oscuro": "#556B2F" },
  oliveGreen: { "Verde Oliva": "#808000" },
  mossGreen: { "Verde Musgo": "#ADFF2F" },
  forestGreen: { "Verde Bosque": "#228B22" },
  appleGreen: { "Verde Manzana": "#7FFF00" },
  lemonGreen: { "Verde Limón": "#32CD32" },
  grayGreen: { "Verde Gris": "#98FB98" },
  darkGreen: { "Verde Oscuro": "#006400" },
  brown: { Marrón: "#A52A2A" },
  saddleBrown: { "Marrón Saddle": "#8B4513" },
  chocolate: { Chocolate: "#D2691E" },
  darkRed: { "Rojo Oscuro": "#8B0000" },
  red: { Rojo: "#FF0000" },
  firebrick: { Firebrick: "#B22222" },
  darkOrange: { "Naranja Oscuro": "#FF8C00" },
  orange: { Naranja: "#FFA500" },
  darkGoldenrod: { "Oro Oscuro": "#B8860B" },
  gold: { Oro: "#FFD700" },
  antiqueGold: { "Oro Antiguo": "#FFD700" },
  silver: { Plateado: "#C0C0C0" },
  gray: { Gris: "#808080" },
  darkGray: { "Gris Oscuro": "#666666" },
  black: { Negro: "#000000" },
};




