import * as Yup from 'yup';

// Define las reglas de validación para cada campo
const validationSchemas: Record<string, Yup.StringSchema<string>> = {
  name: Yup.string()
    .min(2, 'Este campo debe tener al menos 2 caracteres')
    .max(20, 'Este campo debe tener máximo 20 caracteres')
    .required('Este campo es obligatorio'),
};

export interface ResponseError { error: string, stop: boolean }

type GetValidationErrors = (data: { fieldName: string, value: unknown }) => ResponseError;

function useValidations() {
  // const [count, setCount] = useState(0)
  // Función para obtener errores de validación

  const getValidationErrors: GetValidationErrors = ({ fieldName, value }) => {
    console.log(value)
    try {
      const schema = validationSchemas[fieldName];
      schema.validateSync(value);
      return { error: '', stop: false };
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // console.log(error.value);

        if (error.type, error.type === 'max') {
          // setCount(prevState => (prevState + 1))
          return { error: error.message, stop: true }
        }
        return { error: error.message, stop: false };
      } else {
        return { error: '', stop: false };
      }
    }
  };

  return { getValidationErrors };
}

export default useValidations;













// import * as Yup from 'yup';

// // Enum para los nombres de las validaciones
// export enum ValidationField {
//   Name = 'name',
//   // Department = 'department',
//   // Category = 'category',
//   // Subcategory = 'subcategory'
// }

// // Define las reglas de validación para cada campo
// const validationSchemas: Record<ValidationField, Yup.StringSchema<string>> = {
//   [ValidationField.Name]: Yup.string()
//     .min(2, 'Este campo debe tener al menos 2 caracteres')
//     .max(20, 'Este campo debe tener máximo 20 caracteres')
//     .required('Este campo es obligatorio'),
//   // [ValidationField.Department]: Yup.string()
//   //   .min(2, 'El Departamento debe tener al menos 2 caracteres')
//   //   .max(20, 'El Departamento debe tener máximo 20 caracteres')
//   //   .required('El Departamento es obligatorio'),
//   // [ValidationField.Category]: Yup.string()
//   //   .min(2, 'La categoría debe tener al menos 2 caracteres')
//   //   .max(20, 'La categoría debe tener máximo 20 caracteres')
//   //   .required('La categoría es obligatoria'),
//   // [ValidationField.Subcategory]: Yup.string()
//   //   .min(2, 'La subcategoría debe tener al menos 2 caracteres')
//   //   .max(20, 'La subcategoría debe tener máximo 20 caracteres')
//   //   .required('La subcategoría es obligatoria')
// };

// type GetValidationErrors = (data: { fieldName: ValidationField, value: unknown }) => { name: string; error: string };

// function useValidations() {
//   // Función para obtener errores de validación
//   const getValidationErrors: GetValidationErrors = ({ fieldName, value }) => {
//     try {
//       const schema = validationSchemas[fieldName];
//       schema.validateSync(value);
//       return { name: fieldName, error: '' };
//     } catch (error) {
//       if (error instanceof Yup.ValidationError) {
//         // console.error(error.name);
//         return { name: fieldName, error: error.message };
//       } else {
//         return { name: fieldName, error: '' };
//       }
//     }
//   };

//   return { getValidationErrors };
// }

// export default useValidations;
