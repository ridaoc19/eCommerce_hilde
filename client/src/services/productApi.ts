import axios from "axios";
import { IProductRedux } from "../interfaces/product.interface";


export const departmentApi = async ({ routes, dataPost }: IProductRedux.DepartmentApi) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL_API}/department${routes}`, dataPost);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
};

export const productApi = async ({ routes, dataPost }: any) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL_API}/${routes}`, dataPost);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
};
