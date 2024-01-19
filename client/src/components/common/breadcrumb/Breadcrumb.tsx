import { useNavigate } from 'react-router-dom';
import { RequestMapNavigation, RouteNavigation } from '../../../services/navigation/navigationRequest';
import { HandleClick } from '../../../interfaces/global.interface';



// Interfaz para las props del componente Breadcrumb
interface BreadcrumbProps {
  breadcrumb: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['breadcrumb'] | undefined;
  handleOnClick?: HandleClick
  viewHome?: boolean;
}

// Componente Breadcrumb
function Breadcrumb({ breadcrumb, viewHome = true, handleOnClick }: BreadcrumbProps) {
  const navigate = useNavigate()
  const homeObject = {
    name: 'Home',
    name_id: 'home',
    _id: 'home',
  };

  const data = breadcrumb?.data ? viewHome ? [homeObject, ...breadcrumb.data] : breadcrumb.data.filter(e => e.name_id !== 'product') : []

  const handleBreadcrumbClick = (e: React.MouseEvent<HTMLButtonElement>, name_id: string, _id: string) => {
    e.stopPropagation();
    navigate(name_id === 'home' ? `/` : `/list-products/${_id}`);
    if (handleOnClick) {
      handleOnClick(e);
    }
  };

  return (
    <div className='breadcrumb'>
      {data.map(({ _id, name, name_id }, index) => (
        <span key={_id} className='breadcrumb__section'>
          <button className='link' onClick={(e) => handleBreadcrumbClick(e, name_id, _id)}>
            {name}
          </button>
          {index < (data.length) - 1 && <div>{' > '}</div>}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;