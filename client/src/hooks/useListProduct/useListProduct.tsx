import { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
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

  const [stateListProduct, setStateListProduct] = useState<InitialStateListProduct>(initialStateListProduct)
  const { allProducts, currentIndex, pagination, paginationTotal, id, query, dataState } = stateListProduct;
  const { data, isLoading, isError, error, isSuccess, isFetching } = useQuery(
    ['list-product', id, currentIndex, query],
    async () => navigationRequest(RouteNavigation.NavigationListProduct).options({ extensionRoute: `/${id}/${(((currentIndex - 1) * pagination) - 1) < 0 ? 0 : ((currentIndex - 1) * pagination) - 1}/${pagination}${query}` }),
    {
      enabled: !!id && (!allProducts.some(e => e.allProducts_id === currentIndex) || !!query),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError(err: ErrorNavigation) {
        return err;
      },
    }
  );


  useLayoutEffect(() => {
    if (params?.id) {
      setStateListProduct({
        ...initialStateListProduct,
        query: location.search,
        id: params.id,
        dataState: stateListProduct.dataState
      })
    }
    // eslint-disable-next-line
  }, [params.id, location.search])

  useEffect(() => {
    if (data?.data) {
      // const bre = data.data.breadcrumb;
      // const id = params.id;
      // const id = bre.data.find((d) => d.name_id === bre.entity)?._id;
      // console.log({ data, bre, id })
      // if (id && bre) {
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
      handleClickPaginationButtonSelect={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const selectedValue = (event.target as HTMLButtonElement).value;
        setStateListProduct(prevState => ({ ...prevState, currentIndex: Number(selectedValue) }))
      }}
    />,
    Filters: <Filters {...dataState.filters} />
  };
};

export default useListProduct;

