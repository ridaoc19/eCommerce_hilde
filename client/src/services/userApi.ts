import { Method } from "../interfaces/global.interface";
import { IUser } from "../interfaces/user.interface";
import { RequestMapUser, RouteUser } from "./userRequest";

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
  data: IUser.UserData[];
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
    if (method !== Method.Get && 'requestData' in data) fetchOptions.body = JSON.stringify(data.requestData);

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/${route}${'routeId' in data ? `/${data.routeId}` : ""}`, fetchOptions)
    const resJson = await responseApi.json();

    if (!responseApi.ok) {
      throw resJson;
    } else {
      return { ...resJson };
    }
  } catch (error) {
    // eslint-disable-next-line
    throw ({
      status_code: 500,
      status: "internal_server_error",
      errors: [{
        field: 'general',
        message: `Por favor, contacte al administrador del sistema e informe sobre este inconveniente. Incluya este mensaje para una mejor asistencia: "Error interno del servidor front".`
      }]
    })
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


