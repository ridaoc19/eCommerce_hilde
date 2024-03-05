import { IAdvertising } from "../../interfaces/advertising.interface";
import { Method } from "../../interfaces/global.interface";
import { RequestMapAdvertising, RouteAdvertising } from "./advertisingRequest";

export type ErrorAdvertising = {
  status_code: number;
  status: string;
  errors: Array<{
    field: string | 'general';
    message: string
  }>;
}

export type MakeAdvertisingRequestReturn = {
  field: string;
  status: string;
  status_code: number;
  message: string;
};

async function apiAdvertising<R extends keyof RequestMapAdvertising>(data: Omit<RequestMapAdvertising[R], 'data'>): Promise<MakeAdvertisingRequestReturn & { data: RequestMapAdvertising[R]['data'] }> {
  const parts = data.route.split('|');
  const method = parts[0];
  const route = parts[1];
console.log(data)
  try {
    const fetchOptions: RequestInit = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (method !== Method.Get && 'requestData' in data) {
      // const convert = convertFromData(data.requestData as Omit<IAdvertising.advertising, 'advertising_id'>)

      // fetchOptions.body = convert!
      fetchOptions.body = JSON.stringify(data.requestData)
    };

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/${route}${'extensionRoute' in data ? `${data.extensionRoute}` : ""}`, fetchOptions)
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
export function advertisingRequest<T extends RouteAdvertising>(route: T): {
  options: (options: Omit<RequestMapAdvertising[T], 'route' | 'data'>) => Promise<MakeAdvertisingRequestReturn & { data: RequestMapAdvertising[T]['data'] }>
} {
  return {
    options: async (options: Omit<RequestMapAdvertising[T], 'route' | 'data'>) => {
      const requestParams = { route, ...options } as Omit<RequestMapAdvertising[T], 'data'>;
      return await apiAdvertising(requestParams);
    },
  };
}



export const convertFromData = (requestData: Omit<IAdvertising.advertising, 'advertising_id'>) => {
  const form = new FormData();
  Object.entries(requestData).forEach(([key, value]) => {
    if (typeof value === 'object') {
      const image: File = value
      form.append(`files`, value, `${key}.${image.type.split("/")[1]}`);
    } else {
      form.append(key, value,);
    }
  })
  return form
}