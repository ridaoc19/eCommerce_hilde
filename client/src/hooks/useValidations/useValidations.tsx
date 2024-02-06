import * as Yup from 'yup';
import { validationSchemas } from './validationsSchemas';

export interface ResponseError { name: string | 'general', message: string, stop: boolean }

type GetValidationErrors = (data: { name: string, value: unknown }) => ResponseError;

function useValidations() {
  const getValidationErrors: GetValidationErrors = ({ name, value }) => {
    try {
      const schema = validationSchemas[name];

      if (!schema) {
        return { name, message: `El campo "${name}" falta por validar`, stop: true }
      }
      schema.validateSync(value);
      return { name, message: ``, stop: false };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        if (error.type && error.type === 'max') {
          return { name, message: error.message, stop: true };
        } else return { name, message: error.message, stop: false };
      } else {
        return { name, message: ``, stop: false };
      }
    }
  };

  return { getValidationErrors };
}

export default useValidations;