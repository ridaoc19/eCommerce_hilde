import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { ListProductHook } from "../../../hooks/useListProduct/types";
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import { IAdvertising } from "../../../interfaces/advertising.interface";
import { IProduct } from "../../../interfaces/product.interface";
import { navigationRequest } from "../../../services/navigation/navigationApi";
import { RouteNavigation } from "../../../services/navigation/navigationRequest";
import Content from "./Components/Content";
import Images from "./Components/Images";
import Other from "./Components/Other";
export interface InitialStateProductDetail {
  selectedVariant: Omit<IProduct.Variant, "product"> | null;
  currentImage: number;
}

const initialStateProductDetail: InitialStateProductDetail = {
  selectedVariant: null,
  currentImage: 0
}

export interface UseProductDetail {
  components: {
    BreadcrumbComponent: ReactNode;
    Images: ReactNode;
    Content: ReactNode;
    Other: ReactNode;
  }
  react: {
    stateProductDetail: InitialStateProductDetail,
    setStateProductDetail: Dispatch<SetStateAction<InitialStateProductDetail>>
  }
  data: {
    listProducts: ListProductHook['listProducts'],
  }
}
function useProductDetail(): UseProductDetail {
  const { BreadcrumbComponent, listProducts } = useListProduct();
  const queryClient = useQueryClient();
  const [stateProductDetail, setStateProductDetail] = useState<InitialStateProductDetail>(initialStateProductDetail);
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (productId: string) => await navigationRequest(RouteNavigation.NavigationProductView).options({ extensionRoute: `/${productId}` }),
    onSuccess() { queryClient.invalidateQueries({ queryKey: [IAdvertising.QUERY_KEY_PRODUCT.Advertising] }) },
  });

  useEffect(() => {
    if (listProducts.length > 0) {
      if (!isPending && !isSuccess) {
        mutate(listProducts[0].product.product_id)
      }
      const selectProductStock = listProducts[0].variants.find(e => e.stock > 0)
      const selectProductAllStock = listProducts[0].variants[0]
      setStateProductDetail({ ...stateProductDetail, selectedVariant: selectProductStock || selectProductAllStock });
    }
    // eslint-disable-next-line
  }, [listProducts]);

  return {
    components: {
      BreadcrumbComponent,
      Images: <Images stateProductDetail={stateProductDetail} handleClick={(index) => setStateProductDetail({ ...stateProductDetail, currentImage: index })} />,
      Content: <Content listProductsData={{ listProducts }} stateProductDetail={stateProductDetail} handleClick={(variant) => setStateProductDetail({ ...stateProductDetail, selectedVariant: variant })} />,
      Other: <Other listProductsData={{ listProducts }} />
    },
    react: {
      stateProductDetail,
      setStateProductDetail
    },
    data: {
      listProducts
    }
  };
}


export default useProductDetail;

