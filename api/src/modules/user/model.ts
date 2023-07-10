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
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.<^'],
    },
  },
  {
    versionKey: false,
  })

// userSchema.plugin((schema: Schema<IUser>) => {
//   schema.post('save', function(error: any, doc: any, next: any) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//       console.log("entro aca", error);
      
//       next(new Error('El correo electrónico ya está registrado'));
//     } else {
//       next(error);
//     }
//   });
// });
// console.log(userSchema.requiredPaths());


export const User = model<IUser>('User', userSchema);