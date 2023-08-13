import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProductRedux } from "../../../interfaces/redux/product/product.interface";
import { IUserRedux } from "../../../interfaces/redux/user/user.interface";
import { IProduct } from "../../../interfaces/sections/product.interface";
import { IUser } from "../../../interfaces/sections/user.interface";
import { departmentApi, productApi } from "../../../services/productApi";
import { templateMessage } from "./templateMessage";

export const departmentPosts = createAsyncThunk<IProduct.ProductData, IProductRedux.DepartmentPostsProps, { rejectValue: string }>(
  'posts/departmentPosts',
  async (dataPost, { rejectWithValue }) => {
    const { routes, message }: IUserRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes as IProduct.ProductData["routes"] })
    // delete dataPost.routes
    return await departmentApi({ routes })
      .then(response => response.data)
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


export const productPosts = createAsyncThunk<IProduct.ProductData, IProductRedux.ProductPostsProps, { rejectValue: string }>(
  'posts/productPosts',
  async (dataPost, { rejectWithValue }) => {
    const { routes, message }: IUserRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes as IUser.UserData["routes"] })
    // delete dataPost.routes
    return await productApi({ routes, dataPost })
      .then(response => response.data)
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