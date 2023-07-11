import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Post {
  _id: string;
  name: string;
  lastName: string;
  email: string,
  password: string
}

interface Argument {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const fetchPosts = createAsyncThunk<Post[], Argument>(
  'posts/fetchPosts',
  async (dataPost: any, { rejectWithValue }) => {


    return await axios.post('http://localhost:3001/user', dataPost)
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