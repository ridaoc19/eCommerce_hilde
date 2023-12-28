import { useState } from 'react';
import SidebarIcon from '../../../components/common/sidebarIcon/SidebarIcon';
import { PermitsRoles } from '../../../interfaces/user.interface';
import SidebarNavigation from './SidebarNavigation';

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
  const [isActive, setIsActive] = useState(false);
  const [selectedIdBoolean, setSelectedIdBoolean] = useState(true)

  const handleOnClick = () => {
    document.body.classList.toggle('body-scroll-locked');
    setIsActive(!isActive);
  }

  return (
    <div className='sidebar'>
      <SidebarIcon handleOnClick={handleOnClick} isActive={isActive} />

      <div className={`sidebar__content ${isActive ? 'is-active' : ''}`} onClick={handleOnClick}>
        <div className='sidebar__main'
          // onMouseLeave={() => setSelectedIdBoolean(false)}
          onClick={(e) => e.stopPropagation()}>
          <div className='sidebar__section'>
            {window.location.pathname === "/hilde/dashboard"
              // ? <SidebarAdmin handleOnClick={handleOnClick} isActive={isActive} />
              // : <SidebarNavigation isActive={isActive} handleOnSelectedId={() => setSelectedIdBoolean(true)} selectedIdBoolean={selectedIdBoolean} handleOnClick={handleOnClick} />
            }
            <SidebarNavigation isActive={isActive} handleOnSelectedId={() => setSelectedIdBoolean(true)} selectedIdBoolean={selectedIdBoolean} handleOnClick={handleOnClick} />
            {/* {<SidebarNavigation handleOnClick={handleOnClick} isActive={isActive} />} */}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Sidebar;


