import axios from "axios";
import { IUserRedux } from "../interfaces/user.interface";

export const userApi = async ({ routes, dataPost }: IUserRedux.UserApi) => {
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