import { IProductRedux } from "../interfaces/product.interface";


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

// const callApi = async ({ method, route, loading, post }) => {
//   dispatch({ type: LOADING_API, payload: { [loading]: true } })

//   fetch(`${process.env.REACT_APP_URL}/${route}`, {
//     method: method,
//     body: JSON.stringify(post),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch({ type: DATA_UPDATE, payload: data, })
//       dispatch({ type: LOADING_API, payload: { [loading]: false } })
//     })
//     .catch((error) => console.log({ errPost: error.message }));
// };
