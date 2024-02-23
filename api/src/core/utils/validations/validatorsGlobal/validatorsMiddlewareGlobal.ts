import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { deleteFiles } from '../../middleware/files';
import { validationSchemas } from './validationsSchemas';
import { MapStatusCode, StatusHTTP } from '../../send/enums';

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
    if (req?.files && Array.isArray(req.files) && req.files.length > 0) {//eliminar image si hay error
      deleteFiles(req.files.map(e => e.filename))
    }
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
