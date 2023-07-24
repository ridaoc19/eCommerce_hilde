import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { userPosts } from "./actions";
import { IUser } from "../../../components/utils/interface/user";

const initialState: IUser.PostState = {
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
    clearUserError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      });
  },
});

export default userSlice.reducer;
export const { clearUser, clearUserError } = userSlice.actions;


export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserData = (state: RootState) => state.user.data;
