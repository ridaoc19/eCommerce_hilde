import * as Yup from 'yup';
import { validationSchemas } from './validationsSchemas';
import { useContext } from 'react';
import { CreateContext } from '../useContext';

export interface ResponseError { name: string | 'general', message: string, stop: boolean }

type GetValidationErrors = (data: { name: string, value: unknown }) => ResponseError;

function useValidations() {
  const { error: { errorContextDispatch } } = useContext(CreateContext)!

  const getValidationErrors: GetValidationErrors = ({ name, value }) => {
    try {
      const schema = validationSchemas[name];

      if (!schema) {
        errorContextDispatch({ type: 'errors', payload: [{ field: name, message: `El campo "${name}" falta por validar` }] })
        return { name, message: `El campo "${name}" falta por validar`, stop: true }
      }
      schema.validateSync(value);
      return { name, message: ``, stop: false };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        if (error.type && error.type === 'max') {
          errorContextDispatch({ type: 'errors', payload: [{ field: name, message: error.message }] })
          return { name, message: error.message, stop: true };
        } else {
          return { name, message: error.message, stop: false }
        };
      } else {
        return { name, message: ``, stop: false };
      }
    }
  };

  return { getValidationErrors };
}

export default useValidations;