import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import { IProduct } from "../../../interfaces/product.interface";
import Images from "./Components/Images";
import { ListProductHook } from "../../../hooks/useListProduct/types";
import Content from "./Components/Content";
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
  const [stateProductDetail, setStateProductDetail] = useState<InitialStateProductDetail>(initialStateProductDetail);

  useEffect(() => {
    if (listProducts.length > 0) {
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

