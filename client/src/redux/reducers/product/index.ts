import { createSlice } from "@reduxjs/toolkit";
import { IProductRedux } from "../../../interfaces/product.interface";
import { RootState } from "../../store";
import { departmentPosts, productPosts } from "./actions";

const initialState: IProductRedux.InitialState = {
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
    clearProductError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(departmentPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(departmentPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload
      })
      .addCase(departmentPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      });
    builder
      .addCase(productPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload
      })
      .addCase(productPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      });
  },
});

export default productSlice.reducer;
export const { clearProduct, clearProductError } = productSlice.actions;


export const selectProductError = (state: RootState) => state.product.error;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductData = (state: RootState) => state.product.product;
