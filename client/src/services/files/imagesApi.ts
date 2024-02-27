
// Enumeración para las rutas de las solicitudes
export enum Route {
  FilesCreate = 'files/create',
  FilesDelete = 'files/delete',
  FilesCreateDelete = ''
}

// Definición de tipos para las solicitudes basadas en las rutas
export type RequestMap = {
  [Route.FilesCreate]: {
    route: Route.FilesCreate;
    requestData: FormData;
  };
  [Route.FilesDelete]: {
    route: Route.FilesDelete;
    requestData: FormData;
  };
  [Route.FilesCreateDelete]: {
    route: Route.FilesCreateDelete;
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
    case Route.FilesCreate:
      return { route, requestOptions: { method: 'post', body: requestData }, };
    case Route.FilesDelete:
      return { route, requestOptions: { method: 'delete', body: requestData }, };
    case Route.FilesCreateDelete:
      return { route, requestOptions: { method: 'post', body: requestData }, };
    default:
      return { route: 'request', requestOptions: { method: 'get' } };
  }
};

// Función que realiza las llamadas a la API
async function filesApis<T extends Route>(params: RequestMap[T]): Promise<MakeFilesRequestReturn> {
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

// Tipo de retorno para las respuestas de las solicitudes
export type MakeFilesRequestReturn = {
  field: string;
  status: string;
  status_code: number;
  message: string;
  data: {
    imagesCreated: string[] | [],
    imagesDeleted: string[] | [],
  };
};

export type ErrorFiles = {
  status_code: number;
  status: string;
  errors: Array<{
    field: string | 'general';
    message: string
  }>;
}

// Función que realiza las solicitudes a la API
export function makeFilesRequest<R extends Route>(route: R): { withOptions: (options: Omit<RequestMap[R], 'route'>) => Promise<MakeFilesRequestReturn> } {
  return {
    withOptions: async (options: Omit<RequestMap[R], 'route'>) => {
      const requestParams = { route, ...options } as RequestMap[R];
      return await filesApis(requestParams);
    },
  };
}



export interface FilesAdmin {
  toStore?: {
    file: File[],
    entity: string,
    location: string,
    name: string
  },
  toDelete?: string[]
}

export async function filesAdmin({ toStore = { file: [], entity: "", location: "", name: "file" }, toDelete = [] }: FilesAdmin) {

  const form = new FormData();
  if (toStore && toStore.file.length > 0) {
    toStore.file.forEach((file, _index) => {
      form.append(`files`, file, `${toStore.name}.${file.type.split("/")[1]}`);
    });
  }
  if (toDelete && toDelete.length > 0) {
    toDelete.forEach((url, index) => form.append(`url[${index}]`, url));
  }
  const responseFiles = (await makeFilesRequest(Route.FilesCreateDelete).withOptions({ requestData: form }))
  return responseFiles;

}
