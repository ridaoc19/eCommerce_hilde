import { Method } from "../interfaces/global.interface";
import { RequestMapProduct, RouteProduct } from "./productRequest";
import { IProduct } from "../interfaces/product.interface";

// Enumeración para las rutas de las solicitudes
export enum Route {
  DepartmentCreate = 'department/create',
  DepartmentEdit = 'department/edit',
  DepartmentDelete = 'department/delete',

  CategoryCreate = 'category/create',
  CategoryEdit = 'category/edit',
  CategoryDelete = 'category/delete',

  SubCategoryCreate = 'subCategory/create',
  SubCategoryEdit = 'subCategory/edit',
  SubCategoryDelete = 'subCategory/delete',

  ProductRequest = 'product/request',
  ProductDelete = 'product/delete',
  ProductCreate = 'product/create',
  ProductEdit = 'product/edit',

  ProductEntry = 'product/entry',
}

// Definición de tipos para las solicitudes basadas en las rutas
export type RequestMap = {
  // departamento
  [Route.DepartmentCreate]: {
    route: Route.DepartmentCreate;
    requestData: Pick<IProduct.Department, 'name'>;
  };
  [Route.DepartmentEdit]: {
    route: Route.DepartmentEdit;
    departmentId: IProduct.Department['_id'];
    requestData: Pick<IProduct.Department, 'name'>;
  };
  [Route.DepartmentDelete]: {
    route: Route.DepartmentDelete;
    departmentId: IProduct.Department['_id'];
  };
  // category
  [Route.CategoryCreate]: {
    route: Route.CategoryCreate;
    departmentId: IProduct.Category['departmentId'];
    requestData: Pick<IProduct.Category, 'name'>;
  };
  [Route.CategoryEdit]: {
    route: Route.CategoryEdit;
    categoryId: IProduct.Category['_id'];
    requestData: Pick<IProduct.Category, 'name'>;
  };
  [Route.CategoryDelete]: {
    route: Route.CategoryDelete;
    categoryId: IProduct.Category['_id'];
  };
  // subcategory
  [Route.SubCategoryCreate]: {
    route: Route.SubCategoryCreate;
    categoryId: IProduct.Subcategory['categoryId'];
    requestData: Pick<IProduct.Subcategory, 'name'>;
  };
  [Route.SubCategoryEdit]: {
    route: Route.SubCategoryEdit;
    subcategoryId: IProduct.Subcategory['_id'];
    requestData: Pick<IProduct.Subcategory, 'name'>;
  };
  [Route.SubCategoryDelete]: {
    route: Route.SubCategoryDelete;
    subcategoryId: IProduct.Subcategory['_id'];
  };


  // product
  [Route.ProductRequest]: {
    route: Route.ProductRequest;
  };
  [Route.ProductCreate]: {
    route: Route.ProductCreate;
    subcategoryId: IProduct.Product['subcategoryId'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId' | 'variants'>;
  };
  [Route.ProductEdit]: {
    route: Route.ProductEdit;
    productId: IProduct.Product['_id'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId' | 'variants'>;
  };
  [Route.ProductDelete]: {
    route: Route.ProductDelete;
    productId: IProduct.Product['_id'];
  };

  // productEntry
  [Route.ProductEntry]: {
    route: Route.ProductEntry;
    productId: IProduct.Product['_id'];
    requestData: Omit<IProduct.Product, '_id' | 'subcategoryId'> & { _id?: IProduct.Product['_id']; }
  };
};

// Definición del tipo RequestOptions
interface RequestOptions {
  method: IProduct.Method;
  body?: string;
  headers?: Record<string, string>;
}

// Función que crea la carga útil de la solicitud
type Payload<T extends Route> = (params: RequestMap[T]) => {
  route: string;
  requestOptions: RequestOptions;
};

const createPayload: Payload<Route> = (params) => {
  // Definición de los encabezados comunes para las solicitudes
  const headers = { "Content-Type": "application/json" };
  const { route } = params;

  switch (route) {
    // department
    case Route.DepartmentCreate:
      return { route, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
    case Route.DepartmentEdit:
      return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
    case Route.DepartmentDelete:
      return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'delete', }, };
    // category
    case Route.CategoryCreate:
      return { route: `${route}/${params.departmentId}`, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
    case Route.CategoryEdit:
      return { route: `${route}/${params.categoryId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
    case Route.CategoryDelete:
      return { route: `${route}/${params.categoryId}`, requestOptions: { method: 'delete', }, };
    // subcategory
    case Route.SubCategoryCreate:
      return { route: `${route}/${params.categoryId}`, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
    case Route.SubCategoryEdit:
      return { route: `${route}/${params.subcategoryId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
    case Route.SubCategoryDelete:
      return { route: `${route}/${params.subcategoryId}`, requestOptions: { method: 'delete', }, };
    // product
    case Route.ProductRequest:
      return { route: `${route}`, requestOptions: { method: 'get', }, };
    case Route.ProductCreate:
      return { route: `${route}/${params.subcategoryId}`, requestOptions: { method: 'post', body: JSON.stringify(params.requestData), headers, }, };
    case Route.ProductEdit:
      return { route: `${route}/${params.productId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers, }, };
    case Route.ProductDelete:
      return { route: `${route}/${params.productId}`, requestOptions: { method: 'delete', }, };
    case Route.ProductEntry:
      // console.log(params.requestData);

      return { route: `${route}/${params.productId}`, requestOptions: { method: 'put', body: JSON.stringify(params.requestData), headers } };
    default:
      return { route: 'request', requestOptions: { method: 'get' } };
  }
};

// Tipo de retorno para las respuestas de las solicitudes
export type MakeProductsRequestReturn = { message: string; products: IProduct.Department[] };

// Función que realiza las solicitudes a la API
export function makeProductsRequest<R extends Route>(route: R): { withOptions: (options: Omit<RequestMap[R], 'route'>) => Promise<MakeProductsRequestReturn> } {
  return {
    withOptions: async (options: Omit<RequestMap[R], 'route'>) => {
      const requestParams = { route, ...options } as RequestMap[R];
      return await productApis(requestParams);
    },
  };
}

// Función que realiza las llamadas a la API
async function productApis<T extends Route>(params: RequestMap[T]): Promise<MakeProductsRequestReturn> {
  try {
    const { route, requestOptions } = createPayload(params);
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
export function productRequest<T extends RouteProduct>(route: T): { options: (options: Omit<RequestMapProduct[T], 'route'>) => Promise<MakeProductRequestReturn> } {
  return {
    options: async (options: Omit<RequestMapProduct[T], 'route'>) => {
      const requestParams = { route, ...options } as RequestMapProduct[T];
      return await apiProduct(requestParams);
    },
  };
}
