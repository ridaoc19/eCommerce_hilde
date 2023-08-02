import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserRedux } from "../../../interfaces/redux/user/user.interface";
import { IUser } from "../../../interfaces/sections/user.interface";
import { userApi } from "../../../services/userApi";
import { templateMessage } from "./templateMessage";

export const userPosts = createAsyncThunk<IUser.UserData, IUserRedux.UserPostsProps, { rejectValue: string }>(
  'posts/userPosts',
  async (dataPost, { rejectWithValue }) => {
    const { routes, message }: IUserRedux.TemplateMessageReturn = templateMessage({ routes: dataPost.routes as IUser.Routes })
    delete dataPost.routes
    return await userApi({ routes, dataPost })
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
