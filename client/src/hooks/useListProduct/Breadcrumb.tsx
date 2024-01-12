import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/button/Button';
import { RequestMapNavigation, RouteNavigation } from '../../services/navigation/navigationRequest';



// Interfaz para las props del componente Breadcrumb
interface BreadcrumbProps {
  breadcrumb: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['breadcrumb'] | undefined;
  // handleClickBreadcrumb: () => void
  viewHome?: boolean;
}

// Componente Breadcrumb
function Breadcrumb({ breadcrumb, viewHome = true }: BreadcrumbProps) {
  const navigator = useNavigate();

  const homeObject = {
    name: 'Home',
    name_id: 'home',
    _id: 'home',
  };

  const data = breadcrumb?.data ? viewHome ? [homeObject, ...breadcrumb.data] : breadcrumb.data.filter(e => e.name_id !== 'product') : []

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {data.map(({ _id, name, name_id }, index) => (
        // {breadcrumb?.data && [homeObject, ...breadcrumb.data].map(({ _id, name, name_id }, index) => (
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
          {index < (data.length) - 1 && ' > '}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;