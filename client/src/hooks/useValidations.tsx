import * as Yup from 'yup';
import { validationSchemas } from './validationsSchemas';

export interface ResponseError { field: string | 'general', message: string, stop: boolean }

type GetValidationErrors = (data: { fieldName: string, value: unknown }) => ResponseError;

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
      } else {
        return { field: fieldName, message: ``, stop: false };
      }
    }
  };

  return { getValidationErrors };
}

export default useValidations;