import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProductRedux } from "../../../interfaces/product.interface";
import { productApi } from "../../../services/productApi";
import { templateMessage } from "./templateMessage";



export const productsGet = createAsyncThunk<IProductRedux.ProductPostsReturn, IProductRedux.ProductPostsProps, { rejectValue: string }>(
  'posts/productGet',
  async (dataPost, { rejectWithValue }) => {
    const { routes, method, message }: IProductRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes})
    // delete dataPost.routes
    return await productApi({ routes, method, dataPost })
      .then(response => response)
      .catch(error => { // Lógica para manejar el error
        if (error.response) { // El servidor respondió con un código de estado diferente de 2xx
          return rejectWithValue(error.response.data.error)
        } else if (error.request) { // La solicitud se hizo pero no se recibió una respuesta
          return rejectWithValue(message)
        } else { // Ocurrió un error antes de enviar la solicitud
          return rejectWithValue(error.message)
        }
      });
  }
);
// export const departmentPosts = createAsyncThunk<IProductRedux.InitialState, IProductRedux.DepartmentPostsProps, { rejectValue: string }>(
//   'posts/departmentPosts',
//   async (dataPost, { rejectWithValue }) => {
//     const { routes, message }: IProductRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes as IProduct.ProductData["routes"] })
//     // delete dataPost.routes
//     return await departmentApi({ routes })
//       .then(response => response.data)
//       .catch(error => { // Lógica para manejar el error
//         if (error.response) { // El servidor respondió con un código de estado diferente de 2xx
//           return rejectWithValue(error.response.data.error)
//         } else if (error.request) { // La solicitud se hizo pero no se recibió una respuesta
//           return rejectWithValue(message)
//         } else { // Ocurrió un error antes de enviar la solicitud
//           return rejectWithValue(error.message)
//         }
//       });
//   }
// );