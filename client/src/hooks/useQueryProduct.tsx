import { useQuery } from "@tanstack/react-query";
import { RequestMapProduct, RouteProduct } from "../services/productRequest";
import { MakeProductRequestReturn, productRequest } from "../services/productApi";
import { IProduct } from "../interfaces/product.interface";

function useQueryProduct<T extends RouteProduct.ProductRequest>({ route, options, enabled = false }: { route: T, options: Omit<RequestMapProduct[T], 'route'>, enabled: boolean }) {
  const { isFetching: isFetchingProduct, isLoading: isLoadingProduct, data, error: errorProduct, isSuccess: isSuccessProduct, isError: isErrorProduct } = useQuery<MakeProductRequestReturn, Error>({
    queryKey: [IProduct.QUERY_KEY_PRODUCT.MultipleProducts],
    queryFn: () => productRequest(route).options(options),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
  });
  return { dataProduct: data?.data, dataProductSuccess: data, isFetchingProduct, isLoadingProduct, isSuccessProduct, errorProduct, isErrorProduct };
}
export default useQueryProduct;
