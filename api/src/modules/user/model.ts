import { Schema, model, connect, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
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
      // unique: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.<^'],
    },
  },
  {
    versionKey: false,
  })

export const User = model<IUser>('User', userSchema);