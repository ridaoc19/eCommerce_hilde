import { Document, Schema, model } from "mongoose";
import { IProduct } from "../product/model";

export interface IUsers {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  verified: boolean;
  verifiedEmail: boolean;
  roles: "super" | "admin" | "edit" | "visitant";
  items: {
    purchasedProducts: Array<IProduct>;
    favoriteProducts: Array<IProduct>;
  };
  addresses: Array<string>;
}

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  verified: boolean;
  verifiedEmail: boolean;
  roles: "super" | "admin" | "edit" | "visitant";
  items: {
    purchasedProducts: Array<IProduct>;
    favoriteProducts: Array<IProduct>;
  };
  addresses: Array<string>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio.<^']
    },
    lastName: {
      type: String,
      required: [true, 'Los apellidos son obligatorios.<^']
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio.<^'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio.<^'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.<^'],
    },
    roles: {
      type: String,
      default: 'visitant'
    },
    verified: {
      type: Boolean,
      default: false
    },
    verifiedEmail: {
      type: Boolean,
      default: true
    },
    items: {
      purchasedProducts: [
        { type: Schema.Types.ObjectId, ref: 'Product' }
      ],
      favoriteProducts: [
        { type: Schema.Types.ObjectId, ref: 'Product' }
      ]
    },
    addresses: [
      {
        type: String
      }
    ]
  },
  {
    versionKey: false,
    timestamps: false
  })

export const User = model<IUser>('User', userSchema);



// {  name,  lastName,  email, phone,  password,  verified,  verifiedEmail,  roles,  items,  addresses}