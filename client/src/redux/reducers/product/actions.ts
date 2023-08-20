import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct, IProductRedux } from "../../../interfaces/product.interface";
import { templateMessage } from "./templateMessage";



// export const productsGet = createAsyncThunk<IProductRedux.ProductPostsReturn, IProduct.Routes, { rejectValue: string }>(
//   'posts/productGet',
//   async (dataPost, { rejectWithValue }) => {
//     const { routes, method, message }: IProductRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes })
//     // delete dataPost.routes
//     return await productApi({ routes, method, dataPost })
//       .then(response => response)
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

export const productsGet = createAsyncThunk<IProductRedux.ProductPostsReturn, IProduct.Routes, { rejectValue: string }>(
  'posts/userPosts',
  async (routes, { rejectWithValue }) => {
    const { route, message }: IProductRedux.TemplateMessageReturn = templateMessage(routes)
    return await axios.get(`${process.env.REACT_APP_URL_API}/${`product/${route}`}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          return rejectWithValue(message)
        } else {
          return rejectWithValue(error.message)
        }
      });
  }
);


// export const departmentPosts = createAsyncThunk<IProductRedux.DepartmentPostsReturn, IProductRedux.DepartmentPostsProps, { rejectValue: string }>(
//   'posts/departmentPosts',
//   async (dataPost, { rejectWithValue }) => {
//     const { routes, method, message }: IProductRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes })
//     // delete dataPost.routes
//     return await departmentApi({ routes, method, dataPost })
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