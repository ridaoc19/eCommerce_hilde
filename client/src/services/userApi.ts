import axios from "axios";
import { IServices } from "../interfaces/services/services.interface";

export const userApi = async ({ routes, dataPost }: IServices.UserApi) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL_API}/user/${routes}`, dataPost);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
};