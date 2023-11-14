import axios from "axios";
import { IUser, IUserRedux } from "../interfaces/user.interface";
import { Method } from "../interfaces/global.interface";
import { RequestMapUser, RouteUser } from "./userRequest";

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


/////////////////////////////////////////
// export type Success = { status: "success"; field: string; message: string, data: IUser.UserData }
export type Error = {
  status_code: number;
  status: string;
  errors: Array<{
    field: string | 'general';
    message: string
  }>;
}

export type MakeUserRequestReturn = {
  field: string;
  status: string;
  status_code: number;
  message: string;
  data: IUser.UserData;
};

async function apiUser<R extends keyof RequestMapUser>(data: RequestMapUser[R]): Promise<MakeUserRequestReturn> {
  const parts = data.route.split('|');
  const method = parts[0];
  const route = parts[1];

  try {
    const fetchOptions: RequestInit = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (method !== Method.Get && data.requestData) fetchOptions.body = JSON.stringify(data.requestData);

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/${route}`, fetchOptions)
    const resJson = await responseApi.json();

    if (!responseApi.ok) {
      throw resJson;
    } else {
      return {...resJson};
    }
  } catch (error) {
    if (error instanceof Error) {
      throw {
        status_code: 500,
        status: "internal_server_error",
        errors: [{
          field: 'general',
          message: `Por favor, contacte al administrador del sistema e informe sobre este inconveniente. Incluya este mensaje para una mejor asistencia: "Error interno del servidor".`
        }]
      }
    } else {
      throw error
    }
  }
}


// Función que realiza las solicitudes a la API
export function userRequest<T extends RouteUser>(route: T): { options: (options: Omit<RequestMapUser[T], 'route' | 'method'>) => Promise<MakeUserRequestReturn> } {
  return {
    options: async (options: Omit<RequestMapUser[T], 'route' | 'method'>) => {
      const requestParams = { route, ...options } as RequestMapUser[T];
      return await apiUser(requestParams);
    },
  };
}


