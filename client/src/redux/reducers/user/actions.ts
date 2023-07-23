import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { templateMessage } from "./tools";
import { IUser } from "../../../components/utils/interface/user";
import { IValidation } from "../../../components/utils/interface/validation";

export const userPosts = createAsyncThunk<IUser.ResponseUser, IValidation.DataPost | IUser.UserProps, { rejectValue: string }>(
  'posts/userPosts',
  async (dataPost, { rejectWithValue }) => {
    const { routes, message } = templateMessage(dataPost.routes as IUser.Routes)
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