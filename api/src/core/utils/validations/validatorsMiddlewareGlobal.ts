import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { MapStatusCode, StatusHTTP } from '../enums';

const validationSchemas: { [key: string]: yup.Schema } = ({
  name: yup.string()
    .min(2, 'Este campo debe tener al menos 2 caracteres')
    .max(50, 'Este campo debe tener máximo 50 caracteres')
    .required('Este campo es obligatorio'),
  description: yup.string()
    .min(3, 'Este campo debe tener al menos 3 caracteres')
    .max(700, 'Este campo debe tener máximo 700 caracteres')
    .required('Este campo es obligatorio'),
  email: yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  password: yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(15, 'La contraseña debe tener máximo 15 caracteres'),
  token: yup.string()
    .required('No has iniciado de sesión en días anteriores')
    // .min(6, 'La contraseña debe tener al menos 6 caracteres')
    // .max(15, 'La contraseña debe tener máximo 15 caracteres'),
});


export const validatorsMiddlewareGlobal = async (req: Request, res: Response, next: NextFunction) => {
  const requestBody: Record<string, unknown> = req.body;
  const fieldsToValidate: string[] = Object.keys(requestBody);

  const errorResponse: MapStatusCode<string>[StatusHTTP.badRequest_400] = {
    status: StatusHTTP.badRequest_400,
    status_code: 400,
    errors: []
  };

  for (const field of fieldsToValidate) {
    try {
      const validationSchema = validationSchemas[field];

      if (!validationSchema) {
        throw new yup.ValidationError(`Se ha producido un error al validar ${field}. Por favor, contacte al administrador del sistema e informe sobre este inconveniente. Incluya este mensaje para una mejor asistencia: "${field}" requiere validación.`, 'required');
      }

      const fieldValue = requestBody[field];

      await validationSchema.validate(fieldValue);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        errorResponse.errors.push({ field, message: error.message });
      } else {
        console.error(error);
      }
    }
  }

  if (errorResponse.errors.length > 0) {
    res.status(errorResponse.status_code).json(errorResponse);
  } else {
    next();
  }
};







// const emailSchema = yup.string().email().required();
// const passwordSchema = yup.string().min(6).max(16).required();

// export const validateEmptyFields = (fields: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     for (const field of fields) {
//       if (!req.body[field]) {
//         return res.status(400).json({
//           status: 'bad_request',
//           message: `El campo ${field} no puede estar vacío.`,
//         });
//       }
//     }
//     next();
//   };
// };

// export const validateEmailNotRegistered = async (req: Request, res: Response, next: NextFunction) => {
//   const { email } = req.body;

//   try {
//     await emailSchema.validate(email);

//     const user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({
//         status: 'bad_request',
//         message: 'El correo electrónico ya está registrado. Ingrese un correo electrónico único.',
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(400).json({
//       status: 'bad_request',
//       message: `El correo electrónico no es válido: ${error.message}`,
//     });
//   }
// };

// export const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
//   const { password } = req.body;

//   try {
//     await passwordSchema.validate(password);

//     next();
//   } catch (error) {
//     return res.status(400).json({
//       status: 'bad_request',
//       message: `La contraseña no cumple con los requisitos: ${error.message}`,
//     });
//   }
// };
