import { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { BreadcrumbType } from '../../interfaces/global.interface';
import { ErrorNavigation, navigationRequest } from '../../services/navigation/navigationApi';
import { RouteNavigation } from '../../services/navigation/navigationRequest';
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb';
import Filters from './Filters';
import PaginationButton from './PaginationButton';
import { InitialStateListProduct, ListProductHook } from './types';


const initialStateListProduct: InitialStateListProduct = {
  allProducts: [],
  paginationTotal: 0,
  pagination: 10,
  currentIndex: 1,
  filterType: "flexible",
  id: "",
  query: "",
  dataState: {
    breadcrumb: { data: [], entity: BreadcrumbType.Department },
    filters: { department: [], category: [], subcategory: [], brand: [], attributes: {}, specifications: {} }
  }
}

const useListProduct = (): ListProductHook => {
  const params = useParams();
  let location = useLocation()
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams();

  const [stateListProduct, setStateListProduct] = useState<InitialStateListProduct>(initialStateListProduct)
  const { allProducts, currentIndex, pagination, paginationTotal, id, query, dataState, filterType } = stateListProduct;
  const { data, isLoading, isError, error, isSuccess, isFetching } = useQuery(
    ['list-product', id, currentIndex, query],
    async () => navigationRequest(RouteNavigation.NavigationListProduct).options({
      extensionRoute: `/${filterType}/${id}/${(((currentIndex - 1) * pagination) - 1) < 0 ? 0 : ((currentIndex - 1) * pagination) - 1}/${pagination}${query}`
    }),
    {
      enabled: !!id && (!allProducts.some(e => e.allProducts_id === currentIndex) || !!query),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError(err: ErrorNavigation) {
        return err;
      },
    }
  );

  useEffect(() => { //limpiar si se cambia se filtro strict y flex
    if (params?.id) {
      setSearchParams()
      setStateListProduct({
        ...initialStateListProduct,
        filterType: stateListProduct.filterType,
        id: params.id,
        dataState: stateListProduct.dataState
      })
    }
    // eslint-disable-next-line
  }, [stateListProduct.filterType])


  useLayoutEffect(() => {
    if (params?.id) {
      setStateListProduct({
        ...initialStateListProduct,
        filterType: stateListProduct.filterType,
        query: location.search,
        id: params.id,
        dataState: stateListProduct.dataState
      })
    }
    // eslint-disable-next-line
  }, [params.id, location.search])

  useEffect(() => {
    if (data?.data) {
      setStateListProduct(prevState => ({
        ...prevState,
        allProducts: [{ allProducts_id: currentIndex, allProducts_data: data.data.listProduct }, ...allProducts],
        paginationTotal: Math.ceil(data.data.totalCount / pagination),
        dataState: { filters: data.data.filters, breadcrumb: data.data.breadcrumb }
      }))
      // }
    }
    // eslint-disable-next-line
  }, [isLoading, isSuccess, data, isFetching]);

  const preListoProduct = allProducts.find(item => item.allProducts_id === currentIndex)?.allProducts_data

  return {
    listProducts: preListoProduct ? preListoProduct : [],
    paginationTotal,
    totalProduct: data?.data.totalCount || 0,
    currentIndex,
    isLoading,
    isError,
    error,
    setStateListProduct,
    BreadcrumbComponent: <Breadcrumb breadcrumb={dataState.breadcrumb} />,
    PaginationButton: <PaginationButton
      currentIndex={currentIndex}
      paginationTotal={paginationTotal}
      disableBack={false}
      disableNext={false}
      handleClickPaginationButtonBack={() => {
        if ((currentIndex - 1) > 0) {
          setStateListProduct(prevState => ({ ...prevState, currentIndex: currentIndex - 1 }))
        }
      }}
      handleClickPaginationButtonNext={() => {
        if (currentIndex < paginationTotal) {
          setStateListProduct(prevState => ({ ...prevState, currentIndex: currentIndex + 1 }))
        }
      }}
      handleClickPaginationButtonSelect={(selectedValue: string) => {
        setStateListProduct(prevState => ({ ...prevState, currentIndex: Number(selectedValue) }))
      }}
    />,
    Filters: <Filters filters={{ ...dataState.filters }} />
  };
};

export default useListProduct;

