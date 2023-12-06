import * as Yup from 'yup';
import { validationSchemas } from './validationsSchemas';

export interface ResponseError { field: string | 'general', message: string, stop: boolean }
// export interface ResponseError { error: string, stop: boolean }

type GetValidationErrors = (data: { fieldName: string, value: unknown }) => ResponseError;

// function useValidations() {
//   const getValidationErrors: GetValidationErrors = ({ fieldName, value }) => {
//     try {
//       const schema = validationSchemas[fieldName];

//       if (!schema) {
//         console.log(schema, "si")
//       }

//       //       const fieldValue = requestBody[field];

//       //       await validationSchema.validate(fieldValue);



//       schema.validateSync(value);
//       return { error: '', stop: false };
//     } catch (error) {
//       if (error instanceof Yup.ValidationError) {
//         if (error.type && error.type === 'max') {
//           return { error: error.message, stop: true };
//         } else return { error: error.message, stop: false };
//       } else {
//         return { error: '', stop: false };
//       }
//     }
//   };

//   return { getValidationErrors };
// }

function useValidations() {
  const getValidationErrors: GetValidationErrors = ({ fieldName, value }) => {
    try {
      const schema = validationSchemas[fieldName];

      if (!schema) {
        return { field: fieldName, message: `El campo "${fieldName}" falta por validar`, stop: true }
      }
      schema.validateSync(value);
      return { field: fieldName, message: ``, stop: false };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        if (error.type && error.type === 'max') {
          return { field: fieldName, message: error.message, stop: true };
        } else return { field: fieldName, message: error.message, stop: false };
        // } else return { error: error.message, stop: false };
      } else {
        return { field: fieldName, message: ``, stop: false };
      }
    }
  };

  return { getValidationErrors };
}

export default useValidations;

// export const validatorsMiddlewareGlobal = async (req: Request, res: Response, next: NextFunction) => {
//   const requestBody: Record<string, unknown> = req.body;
//   const fieldsToValidate: string[] = Object.keys(requestBody);

//   const errorResponse: MapStatusCode<string>[StatusHTTP.badRequest_400] = {
//     status: StatusHTTP.badRequest_400,
//     status_code: 400,
//     errors: []
//   };

//   for (const field of fieldsToValidate) {
//     try {
//       const validationSchema = validationSchemas[field];

//       if (!validationSchema) {
//         throw new yup.ValidationError(`Se ha producido un error al validar ${field}. Por favor, contacte al administrador del sistema e informe sobre este inconveniente. Incluya este mensaje para una mejor asistencia: "${field}" requiere validación.`, 'required');
//       }

//       const fieldValue = requestBody[field];

//       await validationSchema.validate(fieldValue);
//     } catch (error) {
//       if (error instanceof yup.ValidationError) {
//         errorResponse.errors.push({ field, message: error.message });
//       } else {
//         console.error(error);
//       }
//     }
//   }

//   if (errorResponse.errors.length > 0) {
//     res.status(errorResponse.status_code).json(errorResponse);
//   } else {
//     next();
//   }
// };