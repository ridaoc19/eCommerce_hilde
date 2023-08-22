import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct, IProductRedux } from "../../../interfaces/product.interface";

export const productsGet = createAsyncThunk<IProductRedux.ProductPostsReturn, IProduct.Routes, { rejectValue: string }>(
  'posts/product',
  async (dataPost, { rejectWithValue }) => {
    // const { route, message }: IProductRedux.TemplateMessageReturn = templateMessage(routes)
    return await axios.get(`${process.env.REACT_APP_URL_API}/product/${dataPost.routes}`)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          return rejectWithValue("Lamentamos informarte que estamos experimentando dificultades técnicas en este momento")
        } else {
          return rejectWithValue(error.message)
        }
      });
  }
);

export interface DepartmentCallProps extends Pick<IProduct.Department, '_id' | 'name'> {
  method: IProduct.Method;
  route: IProduct.Routes['routes'];
}

export const departmentCall = createAsyncThunk<IProductRedux.ProductPostsReturn, DepartmentCallProps, { rejectValue: string }>(
  'posts/product',
  async (dataPost, { rejectWithValue }) => {
    const fetchPost = dataPost.method !== "get" || "delete" ? {
      method: dataPost.method,
      body: JSON.stringify(dataPost),
      headers: { "Content-Type": "application/json" }
    } : {}
    return await fetch(`${process.env.REACT_APP_URL_API}/department/${dataPost.route}/${dataPost._id}`, fetchPost)
      .then(response => response.json())
      .then(response => response)
      .catch(error => {
        if (error.response) {
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          return rejectWithValue("Lamentamos informarte que estamos experimentando dificultades técnicas en este momento")
        } else {
          return rejectWithValue(error.message)
        }
      });
  }
);


export interface CategoryCallProps extends Pick<IProduct.Category, '_id' | 'name'> {
  method: IProduct.Method;
  route: IProduct.Routes['routes'];
}

export const categoryCall = createAsyncThunk<IProductRedux.ProductPostsReturn, CategoryCallProps, { rejectValue: string }>(
  'posts/product',
  async (dataPost, { rejectWithValue }) => {
    const fetchPost = dataPost.method !== "get" || "delete" ? {
      method: dataPost.method,
      body: JSON.stringify(dataPost),
      headers: { "Content-Type": "application/json" }
    } : {}
    return await fetch(`${process.env.REACT_APP_URL_API}/category/${dataPost.route}/${dataPost._id}`, fetchPost)
      .then(response => response.json())
      .then(response => response)
      .catch(error => {
        if (error.response) {
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          return rejectWithValue("Lamentamos informarte que estamos experimentando dificultades técnicas en este momento")
        } else {
          return rejectWithValue(error.message)
        }
      });
  }
);

export interface SubcategoryCallProps extends Pick<IProduct.Subcategory, '_id' | 'name'> {
  method: IProduct.Method;
  route: IProduct.Routes['routes'];
}

export const subcategoryCall = createAsyncThunk<IProductRedux.ProductPostsReturn, SubcategoryCallProps, { rejectValue: string }>(
  'posts/product',
  async (dataPost, { rejectWithValue }) => {
    const fetchPost = dataPost.method !== "get" || "delete" ? {
      method: dataPost.method,
      body: JSON.stringify(dataPost),
      headers: { "Content-Type": "application/json" }
    } : {}
    return await fetch(`${process.env.REACT_APP_URL_API}/subcategory/${dataPost.route}/${dataPost._id}`, fetchPost)
      .then(response => response.json())
      .then(response => response)
      .catch(error => {
        if (error.response) {
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          return rejectWithValue("Lamentamos informarte que estamos experimentando dificultades técnicas en este momento")
        } else {
          return rejectWithValue(error.message)
        }
      });
  }
);

export interface ProductsCallProps extends Pick<IProduct.Product, '_id' | 'name'> {
  method: IProduct.Method;
  route: IProduct.Routes['routes'];
}

export const productsCall = createAsyncThunk<IProductRedux.ProductPostsReturn, ProductsCallProps, { rejectValue: string }>(
  'posts/product',
  async (dataPost, { rejectWithValue }) => {
    const fetchPost = dataPost.method !== "get" || "delete" ? {
      method: dataPost.method,
      body: JSON.stringify(dataPost),
      headers: { "Content-Type": "application/json" }
    } : {}
    return await fetch(`${process.env.REACT_APP_URL_API}/product/${dataPost.route}/${dataPost._id}`, fetchPost)
      .then(response => response.json())
      .then(response => response)
      .catch(error => {
        if (error.response) {
          return rejectWithValue(error.response.data.error)
        } else if (error.request) {
          return rejectWithValue("Lamentamos informarte que estamos experimentando dificultades técnicas en este momento")
        } else {
          return rejectWithValue(error.message)
        }
      });
  }
);

