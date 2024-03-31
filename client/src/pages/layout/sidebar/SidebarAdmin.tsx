import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Svg, { SvgType } from '../../../components/assets/icons/Svg';
import Button from '../../../components/common/button/Button';
import SidebarIcon from '../../../components/common/sidebarIcon/SidebarIcon';
import { CreateContext, IContextData } from '../../../hooks/useContext';
import { PermitsRoles, StateDashboard, TypeDashboard } from '../../../interfaces/user.interface';

export namespace ISidebar {
  export type ItemRole = {
    id: PermitsRoles['id'];
    value: StateDashboard['component'];
    type: string;
    svg: SvgType;
    // roles: PermitsRoles['roles'];
  };
}

const item: ISidebar.ItemRole[] = [
  { id: 'visitant', value: "user", type: "Usuarios", svg: 'user' },
  { id: 'admin', value: "newDeptCatSubProdData", type: "Crear Producto", svg: 'shop' },
  { id: 'admin', value: "adminUser", type: "Administrar Usuarios", svg: 'user' },
];

function SidebarAdmin({ handleOnClick, isOpenMenu }: { handleOnClick: () => void, isOpenMenu: boolean }) {
  const { dashboard: { dispatchDashboard, stateDashboard: { permits, login } } }: IContextData = useContext(CreateContext)!
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { userData } = getUserQueryData()

  return (
    <div className='sidebar__section-left'>
      <div className="sidebar__section-left-header">
        <div className="sidebar__section-left-header-content">
          <SidebarIcon handleOnClick={handleOnClick} isOpenMenu={isOpenMenu} />
          <div>
            <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
          </div>
        </div>
      </div>

      <div className='sidebar__section-left-main'>
        {item.map((e, i) => {
          if (login.user.roles) {
            return permits[e.id] && (
              <Button
              key={i}
              svgRight={{type: e.svg}}
              svgLeft={{ type: "arrowRight" }}
              button={{
                type: "highlighter",
                text: e.type,
                handleClick: () =>{ 
                  dispatchDashboard({ type: TypeDashboard.DASHBOARD_COMPONENTS, payload: e.value })
                  handleOnClick()
                }
              }}
            />
            );
          } else {
            return <React.Fragment key={i} />;
          }
        })}
      </div>

    </div>
  )
}

export default SidebarAdmin;



// function SidebarAdmin() {
//   return (
//     <div>
      
//     </div>
//   );
// }

// export default SidebarAdmin;