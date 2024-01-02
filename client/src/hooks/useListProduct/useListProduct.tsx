import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/button/Button';
import { ErrorNavigation, navigationRequest } from '../../services/navigationApi';
import { RequestMapNavigation, RouteNavigation } from '../../services/navigationRequest';
import { HandleClick } from '../../interfaces/global.interface';

// Interfaz para las props del componente Breadcrumb
interface BreadcrumbProps {
  breadcrumb: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['breadcrumb'] | undefined;
  // handleClickBreadcrumb: () => void
}

// Componente Breadcrumb
function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  const navigator = useNavigate();

  const homeObject = {
    name: 'Home',
    name_id: 'home',
    _id: 'home',
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {breadcrumb?.data && [homeObject, ...breadcrumb.data].map(({ _id, name, name_id }, index) => (
        <span key={_id} style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            button={{
              text: name,
              type: 'link',
              handleClick: (event) => {
                event.preventDefault();
                name_id === 'home' ? navigator(`/`) : navigator(`/list-products/${_id}`);
              },
            }}
          />
          {index < (breadcrumb.data.length + 1) - 1 && ' > '}
        </span>
      ))}
    </div>
  );
}

interface PaginationButtonProps {
  handleClickPaginationButtonBack: () => void;
  handleClickPaginationButtonNext: () => void;
  handleClickPaginationButtonSelect: HandleClick;
  paginationTotal: number
  disableBack: boolean
  disableNext: boolean
}

function PaginationButton({
  handleClickPaginationButtonBack,
  handleClickPaginationButtonNext,
  handleClickPaginationButtonSelect,
  disableBack,
  disableNext,
  paginationTotal
}: PaginationButtonProps) {
  return (
    <div>
      <Button button={{ type: "dark", text: '<', handleClick: handleClickPaginationButtonBack, disabled: disableBack }} />
      <div style={{ display: 'flex', gap: '1rem', overflow: 'auto', maxWidth: '100vw' }} className='pagination'>
        {Array.from({ length: paginationTotal }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={pageNumber}
            >
              <Button
                button={{
                  value: String(pageNumber),
                  type: "light",
                  text: String(pageNumber),
                  handleClick: handleClickPaginationButtonSelect
                }}
              />
            </span>
          );
        })}
      </div>
      <Button button={{ type: "dark", text: '>', handleClick: handleClickPaginationButtonNext, disabled: disableNext }} />
    </div>
  );
}


// Interfaz para las props del hook
interface ListProductHook {
  listProducts: AllProducts[];
  currentIndex: number;
  isLoading: boolean;
  error: ErrorNavigation | null
  isError: boolean;
  BreadcrumbComponent: ReactNode;
  PaginationButton: ReactNode;
}

// Hook personalizado useListProduct
// ...

interface AllProducts {
  allProducts_id: number;
  allProducts_data: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['listProduct']
}

const useListProduct = (): ListProductHook => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState<AllProducts[]>([]);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const pagination = 10;
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [changeRequest, setChangeRequest] = useState<{ entity: string; id: string }>({ entity: '', id: '' });
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    ['list-product', id, currentIndex],
    () =>
      navigationRequest(RouteNavigation.NavigationListProduct).options({
        extensionRoute: `?id=${id}&skip=${(currentIndex - 1) * pagination}&take=${pagination}`,
      }),
    {
      // enabled: !!id ,
      enabled: !!id && !allProducts.some(e => e.allProducts_id === currentIndex),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError(err: ErrorNavigation) {
        return err;
      },
    }
  );
  console.log({ allProducts, paginationTotal, currentIndex, changeRequest, result: !allProducts.some(e => e.allProducts_id === currentIndex) });

  useEffect(() => {
    if (data?.data) {
      const bre = data.data.breadcrumb;
      const id = bre.data.find((d) => d.name_id === bre.entity)?._id;

      if (id && bre.entity !== changeRequest.entity && id !== changeRequest.id) {
        setChangeRequest({ entity: bre.entity, id });
        setPaginationTotal(Math.ceil(data.data.totalCount / pagination));
        setAllProducts([{ allProducts_id: currentIndex, allProducts_data: data.data.listProduct }]);
      } else {
        setAllProducts([{ allProducts_id: currentIndex, allProducts_data: data.data.listProduct }, ...allProducts]);
      }
    }
  }, [isLoading, isSuccess]);

  // useEffect(() => {
  //   setCurrentIndex(1);
  //   setAllProducts([]);
  // }, [id]);

  // Propiedades para el componente Breadcrumb
  const breadcrumbProps = {
    breadcrumb: data?.data.breadcrumb,
  };

  const paginationButtonProps = {
    paginationTotal: paginationTotal,
    disableBack: false,
    disableNext: false,
    handleClickPaginationButtonBack: () => {
      if ((currentIndex - 1) > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    handleClickPaginationButtonNext: () => {
      if (currentIndex < paginationTotal) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    handleClickPaginationButtonSelect: (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const selectedValue = (event.target as HTMLButtonElement).value;
      console.log(selectedValue, "este es el numbero")
      setCurrentIndex(Number(selectedValue));
    }
  }

  return {
    listProducts: allProducts,
    currentIndex,
    isLoading,
    isError,
    error,
    BreadcrumbComponent: <Breadcrumb {...breadcrumbProps} />,
    PaginationButton: <PaginationButton   {...paginationButtonProps} />,
  };
};

export default useListProduct;

