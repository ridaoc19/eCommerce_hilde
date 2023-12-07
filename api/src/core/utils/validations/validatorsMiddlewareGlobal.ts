import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { MapStatusCode, StatusHTTP } from '../enums';

const validationSchemas: { [key: string]: yup.Schema } = {
  _id: yup.string(),
  email: yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Ingrese un correo electrónico válido'),
  password: yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(15, 'La contraseña debe tener como máximo 15 caracteres'),
  token: yup.string()
    .required('Por favor inicie sesión nuevamente'),
  name: yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Ingrese al menos 2 caracteres para el nombre')
    .max(30, 'Ingrese máximo 30 caracteres para el nombre'),
  lastName: yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'Ingrese al menos 2 caracteres para el apellido')
    .max(30, 'Ingrese máximo 30 caracteres para el apellido'),
  phone: yup.string()
    .required('El número telefónico es obligatorio')
    .min(7, 'Ingrese al menos 7 dígitos para el número telefónico')
    .max(15, 'Ingrese máximo 15 dígitos para el número telefónico')
    .matches(/^[0-9]+$/, 'Ingrese solo números para el número telefónico'),
  newPassword: yup.string(),
  newEmail: yup.string()
    .required('El nuevo correo electrónico es obligatorio')
    .email('Ingrese un nuevo correo electrónico válido'),
  tokenEmail: yup.string()
    .required('Existe un problema en la validación del correo, solicita nuevamente el cambio de correo electrónico o después de 10 minutos de la solicitud se cancela el cambio de correo'),
  roles: yup.string()
    .required('Debe seleccionar uno de los roles aceptados'),
  department: yup.string()
    .required('Debe ingresar un Departamento')
    .min(2, 'Ingrese al menos 2 caracteres para el Departamento')
    .max(50, 'Ingrese máximo 50 caracteres para el Departamento'),
  category: yup.string()
    .required('Debe ingresar un Categoría')
    .min(2, 'Ingrese al menos 2 caracteres para el Categoría')
    .max(50, 'Ingrese máximo 50 caracteres para el Categoría'),
  subcategory: yup.string()
    .required('Debe ingresar un Subcategorías')
    .min(2, 'Ingrese al menos 2 caracteres para el Subcategorías')
    .max(50, 'Ingrese máximo 50 caracteres para el Subcategorías'),
  product: yup.string()
    .required('Debe ingresar una Producto')
    .min(2, 'Ingrese al menos 2 caracteres para el Producto')
    .max(50, 'Ingrese máximo 50 caracteres para el Producto'),
  brand: yup.string()
    .required('Debe ingresar un Marca')
    .min(2, 'Ingrese al menos 2 caracteres para el Marca')
    .max(50, 'Ingrese máximo 50 caracteres para el Marca'),
  description: yup.string()
    .required('Debe ingresar una Descripción')
    .min(20, 'Ingrese al menos 20 caracteres para el Descripción')
    .max(700, 'Ingrese máximo 700 caracteres para el Descripción'),
  specification: yup.array().of(yup.object({
    key: yup.string().required('El titulo es requerido'),
    value: yup.string().required('La descripción es requerida'),
  }))
    .required('La especificación es requerida'),
  images: yup.array().of(yup.string())
    .required('Debe ingresar un conjunto de imágenes')
    .min(1, 'Ingrese al menos 1 imagen')
    .max(3, 'Ingrese máximo 3 imágenes'),
  variants: yup.array(yup.object().shape({
    size: yup.string().optional(),
    color: yup.string().optional(),
    sellingPrice: yup.number()
      .min(1, 'El precio de venta debe ser mayor que 0')
      .max(19999999, 'El precio de venta debe ser menor a 20,000,000')
      .required('Este campo es obligatorio'),
    stock: yup.number()
      .max(500, 'El stock debe ser menor a 500')
      .required('Este campo es obligatorio'),
  })).required('Los variantes son obligatorios'),
};



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
