
// Enumeración para las rutas de las solicitudes
export enum Route {
  // ImagesCreate = 'images/create',
  // ImagesDelete = 'images/delete',
  ImagesCreateDelete = 'images/createdelete'
}

// Definición de tipos para las solicitudes basadas en las rutas
export type RequestMap = {
  // [Route.ImagesCreate]: {
  //   route: Route.ImagesCreate;
  //   requestData: FormData;
  // };
  // [Route.ImagesDelete]: {
  //   route: Route.ImagesDelete;
  //   requestData: FormData;
  // };
  [Route.ImagesCreateDelete]: {
    route: Route.ImagesCreateDelete;
    requestData: FormData;
  };

};

// Definición del tipo RequestOptions
interface RequestOptions {
  method: "get" | "post" | "put" | "delete";
  body?: FormData;
}

// Función que crea la carga útil de la solicitud
type Payload<T extends Route> = (params: RequestMap[T]) => {
  route: string;
  requestOptions: RequestOptions;
};

const createPayload: Payload<Route> = (params) => {
  // Definición de los encabezados comunes para las solicitudes
  const { route, requestData } = params;

  switch (route) {
    // case Route.ImagesCreate:
    //   return { route, requestOptions: { method: 'post', body: requestData }, };
    // case Route.ImagesDelete:
    //   return { route, requestOptions: { method: 'delete', body: requestData }, };
    case Route.ImagesCreateDelete:
      return { route, requestOptions: { method: 'post', body: requestData }, };
    default:
      return { route: 'request', requestOptions: { method: 'get' } };
  }
};
///////////////////////////////////////////////////////////////////////
//invoca
interface ImagesAdmin {
  toRequest?: {
    file: File[],
    name: string
  },
  toDelete?: string[]
}

export async function imagesAdmin({ toRequest = { file: [], name: "image" }, toDelete = [] }: ImagesAdmin) {

  const form = new FormData();
  if (toRequest && toRequest.file.length > 0) {
    toRequest.file.forEach((image, _index) => {
      form.append(`images`, image, `${toRequest.name}.${image.type.split("/")[1]}`);
    });
  }
  if (toDelete && toDelete.length > 0) {
    toDelete.forEach((url, index) => form.append(`url[${index}]`, url));
  }
  const responseImages = (await makeImagesRequest(Route.ImagesCreateDelete).withOptions({ requestData: form })).imageUrl
  
  return responseImages;

}

/////////////////////////////////////////////////////////////////////////
// Tipo de retorno para las respuestas de las solicitudes
export type MakeImagesRequestReturn = { message: string; imageUrl: string[] };

// Función que realiza las solicitudes a la API
export function makeImagesRequest<R extends Route>(route: R): { withOptions: (options: Omit<RequestMap[R], 'route'>) => Promise<MakeImagesRequestReturn> } {
  return {
    withOptions: async (options: Omit<RequestMap[R], 'route'>) => {
      const requestParams = { route, ...options } as RequestMap[R];
      return await imagesApis(requestParams);
    },
  };
}

// Función que realiza las llamadas a la API
async function imagesApis<T extends Route>(params: RequestMap[T]): Promise<MakeImagesRequestReturn> {
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