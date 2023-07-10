import { createSlice, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { error } from 'console';

interface Post {
  _id: string;
  name: string;
  lastName: string;
  email: string,
  password: string
}

interface PostState {
  data: Post[] | null;
  loading: boolean;
  error: string | null | {};
}

interface Argument {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const initialState: PostState = {
  data: null,
  loading: false,
  error: null,
};


export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
});

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
          console.log('Código de estado:', error.response.status);
          console.log('Mensaje de error:', error.response.data.error);
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió una respuesta
          console.log('No se recibió respuesta del servidor');
          return rejectWithValue('No se recibió respuesta del servidor')

        } else {
          // Ocurrió un error antes de enviar la solicitud
          console.log('Error:', error.message);
          return rejectWithValue(error.message)
        }
      });



  }
);




const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log(state, "/", action)
        state.loading = false;
        state.error = action.payload ?? 'Error occurred';
      });
  },
});

export default postSlice.reducer;
