import { useState } from 'react';
import SidebarIcon from '../../../components/common/sidebarIcon/SidebarIcon';
import { PermitsRoles } from '../../../interfaces/user.interface';
import SidebarNavigation from './SidebarNavigation';
import SidebarAdmin from './SidebarAdmin';
import { useLocation } from 'react-router-dom';

export namespace ISidebar {
  export type ItemRole = {
    id: PermitsRoles['id'];
    value: string;
    type: string;
    svg: any;
    roles: PermitsRoles['roles'];
  };
}

function Sidebar() {
  const { pathname } = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [selectedIdBoolean, setSelectedIdBoolean] = useState(true)

  const handleOnClick = () => {
    document.body.classList.toggle('body-scroll-locked');
    setIsOpenMenu(!isOpenMenu);
  }

  return (
    <div className='sidebar'>
      {/* icono menu hamburguesa */}
      <SidebarIcon handleOnClick={handleOnClick} isOpenMenu={isOpenMenu} />

      <div className={`sidebar__content ${isOpenMenu ? 'is-active' : ''}`} onClick={handleOnClick}>
        <div className='sidebar__main'
          onMouseLeave={() => setSelectedIdBoolean(false)}
          onClick={(e) => e.stopPropagation()}>
          <div className='sidebar__section'>
            {pathname === "/dashboard"
              ? <SidebarAdmin handleOnClick={handleOnClick} isOpenMenu={isOpenMenu} />
              : <SidebarNavigation isOpenMenu={isOpenMenu} handleOnSelectedId={() => setSelectedIdBoolean(true)} selectedIdBoolean={selectedIdBoolean} handleOnClick={handleOnClick} />
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Sidebar;


