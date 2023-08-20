import { createSlice } from "@reduxjs/toolkit";
import { IProductRedux } from "../../../interfaces/product.interface";
import { RootState } from "../../store";
import { departmentCall, productsGet } from "./actions";

const initialState: IProductRedux.InitialState = {
  products: { message: "", products: [] },
  product: {},
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.products = { message: "", products: [] };
      state.loading = false;
      state.error = null;
    },
    clearProductError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsGet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsGet.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload
        // products = action.payload
      })
      .addCase(productsGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      });
    builder
      .addCase(departmentCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(departmentCall.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload
        // products = action.payload
      })
      .addCase(departmentCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error occurred";
      });
  },
});

export default productSlice.reducer;
export const { clearProduct, clearProductError } = productSlice.actions;


export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsData = (state: RootState) => state.products.products;
