import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorNavigation, navigationRequest } from '../../services/navigationApi';
import { RequestMapNavigation, RouteNavigation } from '../../services/navigationRequest';
import Button from '../../components/common/button/Button';

// Interfaz para las props del componente Breadcrumb
interface BreadcrumbProps {
  breadcrumb: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['breadcrumb'] | undefined;
  // handleClickBreadcrumb: () => void
}

// Componente Breadcrumb
function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  const navigator = useNavigate();

  const handleClickBreadcrumb = ({ _id }: { _id: string }) => {
    navigator(`/list-products/${_id}`)
  }

  return (
    <div style={{ display: 'flex', gap: "0.5rem" }}>
      {breadcrumb?.data.map(({ _id, name }, index) => (
        <span key={_id} style={{ display: 'flex', gap: "0.5rem" }}>
          <Button
            button={{
              text: name,
              type: "link",
              handleClick: () => handleClickBreadcrumb({ _id })
            }}
          />
          {index < breadcrumb.data.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
}

// Interfaz para las props del hook
interface ListProductHook {
  listProduct?: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['listProduct'];
  isLoading: boolean;
  error: ErrorNavigation | null
  isError: boolean;
  BreadcrumbComponent: ReactNode;
}

// Hook personalizado useListProduct
const useListProduct = (): ListProductHook => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    ['list-product', id],
    () => navigationRequest(RouteNavigation.NavigationListProduct).options({ extensionRoute: `?id=${id}&skip=${0}&take=${10}` }),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError(err: ErrorNavigation) {
        return err
      },
    }
  );


  // Propiedades para el componente Breadcrumb
  const breadcrumbProps = {
    breadcrumb: data?.data.breadcrumb,
  };

  return {
    listProduct: data?.data.listProduct,
    isLoading,
    isError,
    error,
    BreadcrumbComponent: <Breadcrumb {...breadcrumbProps} />,
  };
};

export default useListProduct;
