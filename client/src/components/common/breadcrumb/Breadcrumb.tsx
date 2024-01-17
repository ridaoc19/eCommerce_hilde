import { Link } from 'react-router-dom';
import { RequestMapNavigation, RouteNavigation } from '../../../services/navigation/navigationRequest';



// Interfaz para las props del componente Breadcrumb
interface BreadcrumbProps {
  breadcrumb: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['breadcrumb'] | undefined;
  // handleClickBreadcrumb: () => void
  viewHome?: boolean;
}

// Componente Breadcrumb
function Breadcrumb({ breadcrumb, viewHome = true }: BreadcrumbProps) {

  const homeObject = {
    name: 'Home',
    name_id: 'home',
    _id: 'home',
  };

  const data = breadcrumb?.data ? viewHome ? [homeObject, ...breadcrumb.data] : breadcrumb.data.filter(e => e.name_id !== 'product') : []

  return (
    <div className='breadcrumb'>
      {data.map(({ _id, name, name_id }, index) => (
        <span key={_id} className='breadcrumb__section'>
          <Link className='link' to={name_id === 'home' ? `/` : `/list-products/${_id}`}>{name}</Link>
          {index < (data.length) - 1 && <span>{' > '}</span>}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;