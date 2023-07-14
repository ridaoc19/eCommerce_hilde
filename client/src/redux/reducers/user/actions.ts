import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxUser } from "./interface";

export const fetchPosts = createAsyncThunk<ReduxUser.ResultDataUser, ReduxUser.UserProps | {}>(
  'posts/fetchPosts',
  async (dataPost, { rejectWithValue }) => {
    return await axios.post(`${process.env.REACT_APP_URL_API}/user`, dataPost)
      .then(response => response.data)
      .catch(error => { // Lógica para manejar el error
        if (error.response) { // El servidor respondió con un código de estado diferente de 2xx
          return rejectWithValue(error.response.data.error)
        } else if (error.request) { // La solicitud se hizo pero no se recibió una respuesta
          return rejectWithValue(`<p>No se pudo completar la creación de tu cuenta</p>
          <p>Lamentablemente, hemos encontrado un problema al procesar tu solicitud de registro en este momento.</p>
          <p>Si tienes alguna pregunta o necesitas asistencia, por favor, contáctanos a través de <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a> y estaremos encantados de ayudarte.</p>`)
        } else { // Ocurrió un error antes de enviar la solicitud
          return rejectWithValue(error.message)
        }
      });
  }
);

export const loginPosts = createAsyncThunk<ReduxUser.ResultDataUser, ReduxUser.UserProps | {}>(
  'posts/fetchPosts',
  async (dataPost, { rejectWithValue }) => {
    return await axios.post(`${process.env.REACT_APP_URL_API}/user`, dataPost)
      .then(response => response.data)
      .catch(error => { // Lógica para manejar el error
        if (error.response) { // El servidor respondió con un código de estado diferente de 2xx
          return rejectWithValue(error.response.data.error)
        } else if (error.request) { // La solicitud se hizo pero no se recibió una respuesta
          return rejectWithValue(`
          <p>No se pudo iniciar sesión en este momento</p>
          <p>Lo sentimos, estamos experimentando problemas técnicos en nuestros servidores y no podemos procesar tu solicitud de inicio de sesión.</p>
          <p>Por favor, intenta iniciar sesión nuevamente más tarde. Si el problema persiste, por favor, contáctanos a través 
          de <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a></p>
          `)
        } else { // Ocurrió un error antes de enviar la solicitud
          return rejectWithValue(error.message)
        }
      });
  }
);