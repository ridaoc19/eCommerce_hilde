import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchPosts } from "./actions";

const initialState: PostState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "posts",
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
        console.log(state, "/", action);
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      });
  },
});

export default userSlice.reducer;

export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserData = (state: RootState) => state.user.data;
