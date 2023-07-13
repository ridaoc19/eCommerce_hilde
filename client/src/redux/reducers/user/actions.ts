import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxUser } from "./interface";

export const fetchPosts = createAsyncThunk<ReduxUser.ResultDataUser,ReduxUser.UserProps | {}>(
  'posts/fetchPosts',
  async (dataPost, { rejectWithValue }) => {

    return await axios.post(`${process.env.REACT_APP_URL_API}/user`, dataPost)
      .then(response => {
        return response.data
      })
      .catch(error => {
        // Lógica para manejar el error
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió una respuesta
          return rejectWithValue('No se recibió respuesta del servidor')

        } else {
          // Ocurrió un error antes de enviar la solicitud
          return rejectWithValue(error.message)
        }
      });



  }
);