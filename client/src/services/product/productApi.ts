import { Method } from "../../interfaces/global.interface";
import { IProduct } from "../../interfaces/product.interface";
import { RequestMapProduct, RouteProduct } from "./productRequest";

export type Error = {
  status_code: number;
  status: string;
  errors: Array<{
    field: string | 'general';
    message: string
  }>;
}

export type MakeProductRequestReturn = {
  field: string;
  status: string;
  status_code: number;
  message: string;
  data: IProduct.Department[];
};

async function apiProduct<R extends keyof RequestMapProduct>(data: RequestMapProduct[R]): Promise<MakeProductRequestReturn> {
  const parts = data.route.split('|');
  const method = parts[0];
  const route = parts[1];

  try {
    const fetchOptions: RequestInit = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (method !== Method.Get && 'requestData' in data) fetchOptions.body = JSON.stringify(data.requestData);

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/${route}${'paramId' in data ? `/${data.paramId}` : ""}`, fetchOptions)
    const resJson = await responseApi.json();

    if (!responseApi.ok) {
      throw resJson;
    } else {
      return { ...resJson };
    }
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line
      throw ({
        status_code: 500,
        status: "internal_server_error",
        errors: [{
          field: 'general',
          message: `Por favor, contacte al administrador del sistema e informe sobre este inconveniente. Incluya este mensaje para una mejor asistencia: "Error interno del servidor front".`
        }]
      })
    } else {
      throw error
    }
  }
}


// Función que realiza las solicitudes a la API
export function productRequest<T extends RouteProduct>(route: T): { options: (options: Omit<RequestMapProduct[T], 'route'>) => Promise<MakeProductRequestReturn> } {
  return {
    options: async (options: Omit<RequestMapProduct[T], 'route'>) => {
      const requestParams = { route, ...options } as RequestMapProduct[T];
      return await apiProduct(requestParams);
    },
  };
}
