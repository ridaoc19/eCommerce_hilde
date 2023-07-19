import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchPosts } from "./actions";
import { ReduxUser } from "./interface";

const initialState: ReduxUser.PostState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
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
        state.error = action.payload ?? "Error occurred";
      });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;


export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserData = (state: RootState) => state.user.data;
