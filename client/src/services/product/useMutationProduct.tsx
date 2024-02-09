import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestMapProduct, RouteProduct } from "./productRequest";
import { MakeProductRequestReturn, productRequest, Error } from "./productApi";
import { IProduct } from "../../interfaces/product.interface";
import { useContext } from "react";
import { CreateContext } from "../../hooks/useContext";

export interface StatusSection {
  isLoadingProduct: boolean;
  isProductSuccess: boolean;
  productError: Error | null;
  isProductError: boolean;
  variablesProduct: {
    route: RouteProduct;
    options: Omit<RequestMapProduct[RouteProduct], 'route' | 'method'>;
  } | undefined;
}

function useMutationProduct() {
  const queryClient = useQueryClient();
  const { error: { errorContextDispatch } } = useContext(CreateContext)!

  const {
    mutate: executeProductMutation,
    reset: resetProductMutation,
    isPending: isLoadingProduct,
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
      errorContextDispatch({ type: 'errors', payload: error.errors })
      return error;
    },
    onSuccess() {
      // if (route === RouteProduct.AccountAdminGet || route === RouteProduct.AccountAdminDelete || route === RouteProduct.AccountAdminPut) {
      //   console.log(route, "entro muchos")
      queryClient.invalidateQueries({ queryKey: [IProduct.QUERY_KEY_PRODUCT.NavigationDashboard] })
      // } else {
      //   console.log(route, "entro uno")
      //   queryClient.setQueryData([IProduct.QUERY_KEY_PRODUCT.SingleProduct], data);
      // }
    },
  });

  const dataSection = {
    getProductQueryData() {
      const isFetchingProduct = queryClient.isFetching({ queryKey: [IProduct.QUERY_KEY_PRODUCT.NavigationDashboard] })
      const productQueryData = queryClient.getQueryData<MakeProductRequestReturn | undefined>([IProduct.QUERY_KEY_PRODUCT.NavigationDashboard]);
      return { productData: productQueryData?.data[0] || null, productQueryData, isFetchingProduct: !!isFetchingProduct };
    },
    // getAllProductQueryData() {
    //   const isFetchingAllProduct = queryClient.isFetching({ queryKey: [IProduct.QUERY_KEY_PRODUCT.MultipleProducts] })
    //   const allProductQueryData = queryClient.getQueryData<MakeProductRequestReturn | undefined>([IProduct.QUERY_KEY_PRODUCT.MultipleProducts]);
    //   return { allProductData: allProductQueryData?.data || null, allProductQueryData, isFetchingAllProduct: !!isFetchingAllProduct };
    // },
  };

  const statusSection: StatusSection = {
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
    // removeAllQueries() {
    //   queryClient.removeQueries({ queryKey: [IProduct.QUERY_KEY_PRODUCT.MultipleProducts] });
    // },
    removeQuery() {
      queryClient.removeQueries({ queryKey: [IProduct.QUERY_KEY_PRODUCT.NavigationDashboard] });
    },
    resetError() {
      resetProductMutation();
    },
  }

  return {
    data: dataSection,
    status: statusSection,
    tools: toolsSection,
    executeProductMutation
  };
}

export default useMutationProduct;
