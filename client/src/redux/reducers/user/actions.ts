import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReduxUser } from "../../../interfaces/user/reduxUser.interface";
import { templateMessage } from "./tools";

export const userPosts = createAsyncThunk<IReduxUser.UserPostsReturn, IReduxUser.UserPostsProps, { rejectValue: string }>(
  'posts/userPosts',
  async (dataPost, { rejectWithValue }) => {
    const { routes, message }: IReduxUser.TemplateMessageReturn = templateMessage({ routes: dataPost.routes as IReduxUser.Routes })
    delete dataPost.routes
    return await axios.post(`${process.env.REACT_APP_URL_API}/${`user/${routes}`}`, dataPost)
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