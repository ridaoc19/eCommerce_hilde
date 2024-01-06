import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/button/Button';
import { RequestMapNavigation, RouteNavigation } from '../../services/navigationRequest';



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

export default Breadcrumb;