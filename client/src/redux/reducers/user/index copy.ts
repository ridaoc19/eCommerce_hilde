// types
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';

interface PostState {
  user: string;
  loading: boolean;
  error: string | null;
}
// initial state
const initialState: PostState = {
  user: "",
  loading: false,
  error: null
};

interface User{
  id: string
}

// ==============================|| ASYNC ||============================== //

export const postUserAsync = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    console.log(userId);
    
    // const response = await fetchUserById(userId);
    // return response.data;
  }
  )

  export function fetchUserById(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
  }
  

// export const postUserAsync = createAsyncThunk(
//   'post/fetchPostUser',
//   async (dataUser: string) => {
//     fetch('http://localhost:3001/user', {
//       method: "POST",
//       body: JSON.stringify(dataUser),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {

//         return res
//       })
//       .catch((error) => console.log({ err: error.message }));
//     // console.log(dataUser)
//     // const response = await fetch('http://localhost:3001/user');
//     // const data = await response.json();
//     // return data;
//   }
// );




// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    postUser(state, action) {
      state.user = action.payload.openItem;
    },
    getUser(state, action) {
      state.user = action.payload.openItem;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
      })
      .addCase(postUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error occurred';
      })
  }
});

export default user.reducer;

export const { postUser } = user.actions;
