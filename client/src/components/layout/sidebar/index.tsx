import { useState } from 'react';
import { PermitsRoles } from '../../../interfaces/user.interface';
import SidebarHome from './SidebarHome';

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
    <div className='sidebar__container'>
      <div className={`sidebar__icon-container ${isActive ? 'is-active' : ''}`} onClick={handleOnClick}>
        <div className="_layer -top"></div>
        <div className="_layer -mid"></div>
        <div className="_layer -bottom"></div>
      </div>

      <div className={`sidebar__content ${isActive ? 'is-active' : ''}`} onClick={handleOnClick}>
        <div className='sidebar__main'
          onMouseLeave={() => setSelectedIdBoolean(false)}
          onClick={(e) => e.stopPropagation()}>
          <div className='sidebar__section-container'>
            <SidebarHome isActive={isActive} handleOnSelectedId={() => setSelectedIdBoolean(true)} selectedIdBoolean={selectedIdBoolean} handleOnClick={handleOnClick} />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Sidebar;
