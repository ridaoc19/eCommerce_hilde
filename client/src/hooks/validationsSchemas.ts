import * as Yup from 'yup';


const globalSchemas: { [key: string]: Yup.Schema } = {
  name: Yup.string()
    .min(2, 'Este campo debe tener al menos 2 caracteres')
    .max(50, 'Este campo debe tener máximo 50 caracteres')
    .required('Este campo es obligatorio'),
  description: Yup.string()
    .min(3, 'Este campo debe tener al menos 3 caracteres')
    .max(600, 'Este campo debe tener máximo 600 caracteres')
    .required('Este campo es obligatorio'),
};


const productSchemas: { [key: string]: Yup.Schema } = {
  specification: Yup.array()
    .of(
      Yup.object().shape({
        key: Yup.string()
          .min(3, 'Este campo debe tener al menos 3 caracteres')
          .max(30, 'Este campo debe tener máximo 30 caracteres')
          .required('Este campo es obligatorio'),
        value: Yup.string()
          .min(1, 'Este campo debe tener al menos 1 caracteres')
          .max(100, 'Este campo debe tener máximo 100 caracteres')
          .required('Este campo es obligatorio'),
      })
    )
    .test('has-specifications', 'Al menos una especificación debe estar presente', function (value) {
      return value && value.length > 0;
    })
    .required('Este campo es obligatorio'),
  specificationKey: Yup.string()
    .min(3, 'Este campo debe tener al menos 3 caracteres')
    .max(30, 'Este campo debe tener máximo 30 caracteres')
    .required('Este campo es obligatorio'),
  specificationValue: Yup.string()
    .min(1, 'Este campo debe tener al menos 1 caracteres')
    .max(100, 'Este campo debe tener máximo 100 caracteres')
    .required('Este campo es obligatorio'),
  // images: Yup.array()
  //   .min(1, 'Debes subir al menos una imagen')
  //   .max(3, 'No puedes subir más de tres imágenes')
  //   .required('Este campo es obligatorio'),
  brand: Yup.string()
    .min(2, 'Este campo debe tener al menos 2 caracteres')
    .max(50, 'Este campo debe tener máximo 50 caracteres')
    .required('Este campo es obligatorio'),

};



const validationSchemas = { ...globalSchemas, ...productSchemas };

export { validationSchemas };