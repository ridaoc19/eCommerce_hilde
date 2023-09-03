import { IProduct, IProductRedux } from "../interfaces/product.interface";


export const departmentApi = async ({ routes, method, dataPost }: IProductRedux.DepartmentApi) => {
  try {
    const fetchPost = method !== "get" ? {
      method: method,
      body: JSON.stringify(dataPost),
      headers: { "Content-Type": "application/json" }
    } : {}

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/department/${routes}`, fetchPost)
    return await responseApi.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
};

export const productApi = async ({ routes, method, dataPost }: IProductRedux.ProductApi) => {
  try {
    const fetchPost = method !== "get" ? {
      method: method,
      body: JSON.stringify(dataPost),
      headers: { "Content-Type": "application/json" }
    } : {}

    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/product/${routes}`, fetchPost)
    return await responseApi.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
};


////////////////////////////////////////////////////////////



//////DEPARTMENT
export interface DepartmentCreateApi {
  route: 'department/create';
  dataPost: Pick<IProduct.Department, 'name'>
}

export interface DepartmentEditApi {
  departmentId: IProduct.Department['_id']
  route: 'department/edit/';
  dataPost: Pick<IProduct.Department, 'name'>
}
export interface DepartmentDeleteApi {
  departmentId: IProduct.Department['_id']
  route: 'department/delete/';
}



/////////////////////////////////////////////


// Define un enum para las rutas
export enum Route {
  DepartmentCreate = 'department/create',
  DepartmentEdit = 'department/edit',
  DepartmentDelete = 'department/delete',
  ProductRequest = 'product/request',
  ProductDelete = 'product/delete',
  ProductCreate = 'product/create',
  ProductEdit = 'product/edit',
}

// Define tipos para las solicitudes basadas en las rutas
type RequestMap = {
  [Route.DepartmentCreate]: {
    route: Route.DepartmentCreate;
    dataPost: Pick<IProduct.Department, 'name'>;
  };
  [Route.DepartmentEdit]: {
    route: Route.DepartmentEdit;
    departmentId: IProduct.Department['_id'];
    dataPost: Pick<IProduct.Department, 'name'>;
  };
  [Route.DepartmentDelete]: {
    route: Route.DepartmentDelete;
    departmentId: IProduct.Department['_id'];
  };
  [Route.ProductRequest]: {
    route: Route.ProductRequest;
  };
  [Route.ProductDelete]: {
    route: Route.ProductDelete;
    productId: string;
  };
  [Route.ProductCreate]: {
    route: Route.ProductCreate;
    dataPost: any; // Ajustar este tipo si es más específico
  };
  [Route.ProductEdit]: {
    route: Route.ProductEdit;
    productId: string;
    dataPost: any; // Ajustar este tipo si es más específico
  };
};

// Define el tipo RequestOptions
interface RequestOptions {
  method: IProduct.Method;
  body?: string;
  headers?: Record<string, string>;
}

// Define la función payload
type Payload<T extends Route> = (params: RequestMap[T]) => {
  route: string;
  requestOptions: RequestOptions;
};

const payload: Payload<Route> = (params) => {
  const headers = { "Content-Type": "application/json" };
  const { route } = params;

  switch (route) {
    case Route.DepartmentCreate:
      return { route, requestOptions: { method: 'post', body: JSON.stringify(params.dataPost), headers } };
    case Route.DepartmentEdit:
      return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'put', body: JSON.stringify(params.dataPost), headers } };
    case Route.DepartmentDelete:
      return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'delete' } };
    case Route.ProductRequest:
      return { route: `${route}`, requestOptions: { method: 'get' } };
    case Route.ProductDelete:
      return { route: `${route}/${params.productId}`, requestOptions: { method: 'delete' } };
    case Route.ProductCreate:
      return { route, requestOptions: { method: 'post', body: params.dataPost, headers } };
    case Route.ProductEdit:
      return { route: `${route}/${params.productId}`, requestOptions: { method: 'put', body: params.dataPost, headers } };
    default:
      return { route: 'request', requestOptions: { method: 'get' } };
  }
};

// Define la función productApis
async function productApis<T extends Route>(params: RequestMap[T]) {
  try {
    const { route, requestOptions } = payload(params);
    const responseApi = await fetch(`${process.env.REACT_APP_URL_API}/${route}`, requestOptions);
    return await responseApi.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error desconocido");
    }
  }
}

// Define la función que crea solicitudes con autocompletado
export function createRequest<R extends Route>(route: R) {
  return {
    withRoute: (options: Omit<RequestMap[R], 'route'>) => {
      const request = { route, ...options } as RequestMap[R];
      return productApis(request);
    },
  };
}

// Ejemplo de uso
// createRequest(Route.DepartmentCreate).withRoute({ dataPost: { name: "" } })
// createRequest(Route.DepartmentDelete).withRoute({ departmentId: "faf" })
// createRequest(Route.ProductEdit).withRoute({ productId: "", dataPost: {} })


// import { useQuery, useQueryClient } from 'react-query';

// export function useGetProducts() {
//   const queryClient = useQueryClient();

//   return useQuery(
//     'products', // Query key
//     () => api.get('/products'), // Función para obtener los datos
//     {
//       staleTime: 60000, // Tiempo de caché en milisegundos (1 minuto)
//       cacheTime: 300000, // Tiempo de almacenamiento en caché en milisegundos (5 minutos)
//       onSuccess: (data) => {
//         // Acciones a realizar cuando la consulta tiene éxito
//         console.log('Product data fetched successfully:', data);
//       },
//       onError: (error) => {
//         // Acciones a realizar cuando hay un error en la consulta
//         console.error('Error fetching product data:', error);
//       },
//       refetchOnWindowFocus: false, // No realizar automáticamente una nueva consulta al enfocar la ventana
//     }
//   );
// }