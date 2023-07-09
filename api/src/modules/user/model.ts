import { Schema, model, connect } from "mongoose";

interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const User = model<IUser>('User', userSchema);