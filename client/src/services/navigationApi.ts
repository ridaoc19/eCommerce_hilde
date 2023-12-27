import { Method } from "../interfaces/global.interface";
import { RequestMapNavigation, RouteNavigation } from "./navigationRequest";

export type ErrorNavigation = {
  status_code: number;
  status: string;
  errors: Array<{
    field: string | 'general';
    message: string
  }>;
}

export type MakeNavigationRequestReturn = {
  field: string;
  status: string;
  status_code: number;
  message: string;
};

async function apiNavigation<R extends keyof RequestMapNavigation>(data: Omit<RequestMapNavigation[R], 'data'>): Promise<MakeNavigationRequestReturn & { data: RequestMapNavigation[R]['data'] }> {
  const parts = data.route.split('|');
  const method = parts[0];
  const route = parts[1];

  try {
    const fetchOptions: RequestInit = {
      method: method,
      // headers: { 'Content-Type': 'application/json' }
    };
    if (method !== Method.Get && 'requestData' in data) fetchOptions.body = JSON.stringify(data.requestData);

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/${route}${'paramId' in data ? `/${data.paramId}` : ""}`, fetchOptions)
    const resJson = await responseApi.json();

    if (!responseApi.ok) {
      throw resJson;
    } else {
      return resJson;
    }
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line
      throw ({
        status_code: 500,
        status: "internal_server_error",
        errors: [{
          field: 'general',
          message: `Por favor, contacte al administrador del sistema e informe sobre este inconveniente. Incluya este mensaje para una mejor asistencia: "Error interno del servidor front" ${route}`
        }]
      })
    } else {
      throw error
    }
  }
}


// Función que realiza las solicitudes a la API
export function navigationRequest<T extends RouteNavigation>(route: T): {
  options: (options: Omit<RequestMapNavigation[T], 'route' | 'data'>) => Promise<MakeNavigationRequestReturn & { data: RequestMapNavigation[T]['data'] }>
} {
  return {
    options: async (options: Omit<RequestMapNavigation[T], 'route' | 'data'>) => {
      const requestParams = { route, ...options } as Omit<RequestMapNavigation[T], 'data'>;
      return await apiNavigation(requestParams);
    },
  };
}
