import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
  roles: "super" | "admin" | "edit" | "visitant";
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
  },
  {
    versionKey: false,
    timestamps: true
  })

export const User = model<IUser>('User', userSchema);
