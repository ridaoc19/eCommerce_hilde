import * as Yup from 'yup';
import { validationSchemas } from './validationsSchemas';

export interface ResponseError { error: string, stop: boolean }

type GetValidationErrors = (data: { fieldName: string, value: unknown }) => ResponseError;

function useValidations() {
  const getValidationErrors: GetValidationErrors = ({ fieldName, value }) => {
    try {
      const schema = validationSchemas[fieldName];
      schema.validateSync(value);
      return { error: '', stop: false };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        if (error.type && error.type === 'max') {
          return { error: error.message, stop: true };
        } else return { error: error.message, stop: false };
      } else {
        return { error: '', stop: false };
      }
    }
  };

  return { getValidationErrors };
}

export default useValidations;
