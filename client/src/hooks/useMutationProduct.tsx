import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestMapProduct, RouteProduct } from "../services/productRequest";
import { MakeProductRequestReturn, productRequest, Error } from "../services/productApi";
import { IProduct } from "../interfaces/product.interface";

function useMutationProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: executeProductMutation,
    reset: resetProductMutation,
    isLoading: isLoadingProduct,
    error: productError,
    isSuccess: isProductSuccess,
    isError: isProductError,
    variables: variablesProduct
  } = useMutation({
    mutationFn: ({ route, options }: { route: RouteProduct, options: Omit<RequestMapProduct[RouteProduct], 'route' | 'method'> }) => {
      const requestData = productRequest(route).options(options);
      return requestData;
    },
    onError(error: Error) {
      return error;
    },
    onSuccess() {
      // if (route === RouteProduct.AccountAdminGet || route === RouteProduct.AccountAdminDelete || route === RouteProduct.AccountAdminPut) {
      //   console.log(route, "entro muchos")
      queryClient.invalidateQueries([IProduct.QUERY_KEY_PRODUCT.MultipleProducts])
      // } else {
      //   console.log(route, "entro uno")
      //   queryClient.setQueryData([IProduct.QUERY_KEY_PRODUCT.SingleProduct], data);
      // }
    },
  });

  const dataSection = {
    getProductQueryData() {
      const isFetchingProduct = queryClient.isFetching([IProduct.QUERY_KEY_PRODUCT.SingleProduct])
      const productQueryData = queryClient.getQueryData<MakeProductRequestReturn | undefined>([IProduct.QUERY_KEY_PRODUCT.SingleProduct]);
      return { productData: productQueryData?.data[0] || null, productQueryData, isFetchingProduct: !!isFetchingProduct };
    },
    getAllProductQueryData() {
      const isFetchingAllProduct = queryClient.isFetching([IProduct.QUERY_KEY_PRODUCT.MultipleProducts])
      const allProductQueryData = queryClient.getQueryData<MakeProductRequestReturn | undefined>([IProduct.QUERY_KEY_PRODUCT.MultipleProducts]);
      return { allProductData: allProductQueryData?.data || null, allProductQueryData, isFetchingAllProduct: !!isFetchingAllProduct };
    },
  };

  const statusSection = {
    isLoadingProduct,
    isProductSuccess,
    productError,
    isProductError,
    variablesProduct
  };

  const toolsSection = {
    fetch<T extends RouteProduct>(route: T): { options: (options: Omit<RequestMapProduct[T], 'route' | 'method'>) => void } {
      return {
        options: async (options: Omit<RequestMapProduct[T], 'route' | 'method'>) => {
          executeProductMutation({ route, options });
        },
      };
    },
    removeAllQueries() {
      queryClient.removeQueries([IProduct.QUERY_KEY_PRODUCT.MultipleProducts]);
    },
    removeQuery() {
      queryClient.removeQueries([IProduct.QUERY_KEY_PRODUCT.SingleProduct]);
    },
    resetError() {
      resetProductMutation();
    },
  }

  return {
    data: dataSection,
    status: statusSection,
    tools: toolsSection,
  };
}

export default useMutationProduct;
