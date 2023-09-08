import { IProduct } from "../interfaces/product.interface";

// Enumeración para las rutas de las solicitudes
export enum Route {
  ImagesCreate = 'images/create',
  ImagesDelete = 'images/delete',
}

// Definición de tipos para las solicitudes basadas en las rutas
export type RequestMap = {
  // departamento
  [Route.ImagesCreate]: {
    route: Route.ImagesCreate;
    requestData: FormData;
  };
  [Route.ImagesDelete]: {
    route: Route.ImagesDelete;
    imageId: string;
  };

};

// Definición del tipo RequestOptions
interface RequestOptions {
  method: IProduct.Method;
  body?: FormData;
}

// Función que crea la carga útil de la solicitud
type Payload<T extends Route> = (params: RequestMap[T]) => {
  route: string;
  requestOptions: RequestOptions;
};

const createPayload: Payload<Route> = (params) => {
  // Definición de los encabezados comunes para las solicitudes
  const { route } = params;

  switch (route) {
    case Route.ImagesCreate:
      return { route, requestOptions: { method: 'post', body: params.requestData, }, };
    case Route.ImagesDelete:
      return { route: `${route}/${params.imageId}`, requestOptions: { method: 'delete', }, };
    default:
      return { route: 'request', requestOptions: { method: 'get' } };
  }
};

// Tipo de retorno para las respuestas de las solicitudes
export type MakeProductsRequestReturn = { message: string; imageUrl: string };

// Función que realiza las solicitudes a la API
export function makeImagesRequest<R extends Route>(route: R): { withOptions: (options: Omit<RequestMap[R], 'route'>) => Promise<MakeProductsRequestReturn> } {
  return {
    withOptions: async (options: Omit<RequestMap[R], 'route'>) => {
      const requestParams = { route, ...options } as RequestMap[R];
      return await imagesApis(requestParams);
    },
  };
}

// Función que realiza las llamadas a la API
async function imagesApis<T extends Route>(params: RequestMap[T]): Promise<MakeProductsRequestReturn> {
  try {
    const { route, requestOptions } = createPayload(params);
    const responseApi = await fetch(`${process.env.REACT_APP_SERVER_FILE}/${route}`, requestOptions);
    return await responseApi.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
}
