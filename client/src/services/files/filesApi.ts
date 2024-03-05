import { Method } from "../../interfaces/global.interface";
import { RequestMapFiles, RouteFiles } from "./filesRequest";

export type ErrorFiles = {
  status_code: number;
  status: string;
  errors: Array<{
    field: string | 'general';
    message: string
  }>;
}

export type MakeFilesRequestReturn = {
  field: string;
  status: string;
  status_code: number;
  message: string;
};

async function apiFiles<R extends keyof RequestMapFiles>(data: Omit<RequestMapFiles[R], 'data'>): Promise<MakeFilesRequestReturn & { data: RequestMapFiles[R]['data'] }> {
  const parts = data.route.split('|');
  const method = parts[0];
  const route = parts[1];

  try {
    const fetchOptions: RequestInit = {
      method: method,
      // headers: { 'Content-Type': 'application/json' }
    };
    if (method !== Method.Get && 'requestData' in data) {
      const convert = convertFromData(data.requestData as RequestMapFiles[RouteFiles.FilesCreateDelete]['requestData'])

      fetchOptions.body = convert!
      // fetchOptions.body = JSON.stringify(data.requestData)
    };

    const responseApi = await fetch(`${process.env.REACT_APP_SERVER_FILE}/${route}${'extensionRoute' in data ? `${data.extensionRoute}` : ""}`, fetchOptions)
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
export function filesRequest<T extends RouteFiles>(route: T): {
  options: (options: Omit<RequestMapFiles[T], 'route' | 'data'>) => Promise<MakeFilesRequestReturn & { data: RequestMapFiles[T]['data'] }>
} {
  return {
    options: async (options: Omit<RequestMapFiles[T], 'route' | 'data'>) => {
      const requestParams = { route, ...options } as Omit<RequestMapFiles[T], 'data'>;
      return await apiFiles(requestParams);
    },
  };
}



export const convertFromData = ({ toStore, toDelete }: RequestMapFiles[RouteFiles.FilesCreateDelete]['requestData']) => {
  const form = new FormData();
  if (toStore && toStore.file.length > 0) {
    toStore.file.forEach((file, _index) => {
      form.append(`files`, file, `${toStore.entity}-${toStore.location}-${toStore.name}.${file.type.split("/")[1]}`);
    });
  }
  if (toDelete && toDelete.length > 0) {
    toDelete.forEach((url, index) => form.append(`delete[${index}]`, url));
  }

  return form;
};
