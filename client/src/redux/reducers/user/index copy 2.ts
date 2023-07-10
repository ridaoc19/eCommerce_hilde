import { createSlice, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostState {
  data: Post[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
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
        state.loading = false;
        state.error = action.error.message ?? 'Error occurred';
      });
  },
});

export default postSlice.reducer;
