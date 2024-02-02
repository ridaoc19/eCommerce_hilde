import { Request } from 'express';
import * as yup from 'yup';
import { Errors } from '../enums';
import { deleteFiles } from '../middleware/files';

type ValidateLocal = (data: { req: Request, validationSchemas: yup.AnyObject }) => Promise<Errors>

export const validatorsLocal: ValidateLocal = async ({ req, validationSchemas }) => {
  const requestBody: Record<string, unknown> = req.body;
  const fieldsToValidate: string[] = Object.keys(requestBody);

  const errorResponse: Errors = [];

  const validateField = async (field: string, fieldValue: unknown) => {
    try {
      const validationSchema = validationSchemas[field];

      if (!validationSchema) return;

      // Pasamos el cuerpo completo de la solicitud al test
      const pathWithoutSlashAndExtras = req.path.match(/^\/([^\/]+)/);
      const capturedPart = pathWithoutSlashAndExtras ? pathWithoutSlashAndExtras[1] : null;
      await validationSchema.validate(fieldValue, { context: { reqBody: requestBody, route: capturedPart } });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        if (req?.files && Array.isArray(req.files) && req.files.length > 0) {//eliminar image si hay error
          deleteFiles(req.files.map(e => e.filename))
        }
        errorResponse.push({ field, message: error.message });
      } else {
        console.error(error);
      }
    }
  };

  for (const field of fieldsToValidate) {
    const fieldValue = requestBody[field];
    await validateField(field, fieldValue);
  }

  return errorResponse;
};
