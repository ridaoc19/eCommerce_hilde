import * as Yup from 'yup';


const globalSchemas: { [key: string]: Yup.Schema } = {
  // name: Yup.string()
  //   .min(2, 'Este campo debe tener al menos 2 caracteres')
  //   .max(50, 'Este campo debe tener máximo 50 caracteres')
  //   .required('Este campo es obligatorio'),
  // email: Yup.string()
  //   .email('El correo electrónico no es válido')
  //   .required('El correo electrónico es requerido'),
  // password: Yup.string()
  //   .required('La contraseña es requerida')
  //   .min(6, 'La contraseña debe tener al menos 6 caracteres')
  //   .max(15, 'La contraseña debe tener máximo 15 caracteres'),
  // // .matches(
  // //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  // //   'La contraseña debe contener al menos una letra, un número y un carácter especial (@$!%*?&)'
  // // ),
  // department: Yup.string()
  //   .required('Debe ingresar un Departamento')
  //   .min(2, 'Ingrese al menos 2 caracteres para el Departamento')
  //   .max(50, 'Ingrese máximo 50 caracteres para el Departamento'),
  // category: Yup.string()
  //   .required('Debe ingresar un Categoría')
  //   .min(2, 'Ingrese al menos 2 caracteres para el Categoría')
  //   .max(50, 'Ingrese máximo 50 caracteres para el Categoría'),
  // subcategory: Yup.string()
  //   .required('Debe ingresar un Subcategorías')
  //   .min(2, 'Ingrese al menos 2 caracteres para el Subcategorías')
  //   .max(50, 'Ingrese máximo 50 caracteres para el Subcategorías'),
  // product: Yup.string()
  //   .required('Debe ingresar una Producto')
  //   .min(2, 'Ingrese al menos 2 caracteres para el Producto')
  //   .max(50, 'Ingrese máximo 50 caracteres para el Producto'),
  // brand: Yup.string()
  //   .required('Debe ingresar un Marca')
  //   .min(2, 'Ingrese al menos 2 caracteres para el Marca')
  //   .max(50, 'Ingrese máximo 50 caracteres para el Marca'),
  // description: Yup.string()
  //   .required('Debe ingresar una Descripción')
  //   .min(20, 'Ingrese al menos 20 caracteres para el Descripción')
  //   .max(700, 'Ingrese máximo 700 caracteres para el Descripción'),
  // specification: Yup.array().of(Yup.object()
  //   .shape({
  //     key: Yup.string()
  //       .min(3, 'Titulo de especificaciones debe tener al menos 3 caracteres')
  //       .max(30, 'Titulo de especificaciones debe tener máximo 30 caracteres')
  //       .required('Titulo de especificaciones es obligatorio'),
  //     value: Yup.string()
  //       .min(1, 'La descripción de especificaciones debe tener al menos 1 caracteres')
  //       .max(100, 'La descripción de especificaciones debe tener máximo 100 caracteres')
  //       .required('La descripción de especificaciones es obligatorio'),
  //   })
  // )
  //   .test('has-specifications', 'Al menos una especificación debe estar presente', function (value) {
  //     return value && value.length > 0;
  //   }),
  // // specification: Yup.array().of(Yup.object({
  // //   key: Yup.string().required('El titulo es requerido'),
  // //   value: Yup.string().required('La descripción es requerida'),
  // // }))
  // //   .required('La especificación es requerida'),
  // specificationKey: Yup.string()
  //   .min(3, 'Este campo debe tener al menos 3 caracteres')
  //   .max(30, 'Este campo debe tener máximo 30 caracteres')
  //   .required('Este campo es obligatorio'),
  // specificationValue: Yup.string()
  //   .min(3, 'Este campo debe tener al menos 3 caracteres')
  //   .max(100, 'Este campo debe tener máximo 100 caracteres')
  //   .required('Este campo es obligatorio'),
  // images: Yup.array(),
  // // .of(Yup.string())
  // // .required('Debe ingresar un conjunto de imágenes')
  // // .min(1, 'Ingrese al menos 1 imagen')
  // // .max(3, 'Ingrese máximo 3 imágenes'),
  // size: Yup.string()
  //   .test('has-size', '', (value) => !!value)
  //   .min(2, 'Este campo debe tener al menos 2 caracteres')
  //   .max(20, 'Este campo debe tener máximo 20 caracteres'),
  // color: Yup.string()
  //   .test('has-size', '', (value) => !!value)
  //   .min(2, 'Este campo debe tener al menos 2 caracteres')
  //   .max(20, 'Este campo debe tener máximo 20 caracteres'),
  // sellingPrice: Yup.number()
  //   .min(1, 'El precio de venta debe ser mayor que 0')
  //   .max(19999999, 'El precio de venta debe ser menor a 20,000,000')
  //   .required('Este campo es obligatorio'),
  // stock: Yup.number()
  //   .max(500, 'El stock debe ser menor a 500')
  //   .required('Este campo es obligatorio'),
};


const productSchemas: { [key: string]: Yup.Schema } = {
  // specification: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       key: Yup.string()
  //         .min(3, 'Este campo debe tener al menos 3 caracteres')
  //         .max(30, 'Este campo debe tener máximo 30 caracteres')
  //         .required('Este campo es obligatorio'),
  //       value: Yup.string()
  //         .min(1, 'Este campo debe tener al menos 1 caracteres')
  //         .max(100, 'Este campo debe tener máximo 100 caracteres')
  //         .required('Este campo es obligatorio'),
  //     })
  //   )
  //   .test('has-specifications', 'Al menos una especificación debe estar presente', function (value) {
  //     return value && value.length > 0;
  //   })
  //   .required('Este campo es obligatorio'),

  // images: Yup.array()
  //   .min(1, 'Debes subir al menos una imagen')
  //   .max(3, 'No puedes subir más de tres imágenes')
  //   .required('Este campo es obligatorio'),
};

const advertisingSchemas: { [key: string]: Yup.Schema } = {
  page: Yup.string()
    .required('Debe ingresar un page')
    .min(2, 'Ingrese al menos 2 caracteres para el page')
    .max(50, 'Ingrese máximo 50 caracteres para el page'),
  location: Yup.string()
    .required('Debe ingresar un location')
    .min(2, 'Ingrese al menos 2 caracteres para el location')
    .max(50, 'Ingrese máximo 50 caracteres para el location'),
  title: Yup.string()
    .required('Debe ingresar un title')
    .min(2, 'Ingrese al menos 2 caracteres para el title')
    .max(50, 'Ingrese máximo 50 caracteres para el title'),
  redirect: Yup.string()
    .required('Debe ingresar un redirect')
    .min(2, 'Ingrese al menos 2 caracteres para el redirect')
    .max(50, 'Ingrese máximo 50 caracteres para el redirect'),
  text: Yup.string()
    .required('Debe ingresar un text')
    .min(2, 'Ingrese al menos 2 caracteres para el text')
    .max(50, 'Ingrese máximo 50 caracteres para el text'),
  image_desktop: Yup.string()
    .required('Debe ingresar un image_desktop'),
  image_tablet: Yup.string(),
  image_phone: Yup.string(),
}

const validationSchemas = { ...globalSchemas, ...productSchemas, ...advertisingSchemas };

export { validationSchemas };
