import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PermitsRoles } from '../../../interfaces/user.interface';
import Svg from '../../../components/assets/icons/Svg';
import SidebarIcon from '../../../components/common/sidebarIcon/SidebarIcon';
import { useMutationUser } from '../../auth/login';
import { CreateContext, IContextData } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dash/reducer';
import Button from '../../../components/common/button/Button';

export namespace ISidebar {
  export type ItemRole = {
    id: PermitsRoles['id'];
    value: string;
    type: string;
    svg: any;
    roles: PermitsRoles['roles'];
  };
}

const item: ISidebar.ItemRole[] = [
  { id: 'visitant', value: "user", type: "Usuarios", svg: Svg({ type: "user" }), roles: ["super", "admin", 'edit', 'visitant'] },
  { id: 'admin', value: "newDeptCatSubProdData", type: "Crear Producto", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
  { id: 'edit', value: "productEntry", type: "Ingresar Producto", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
  { id: 'visitant', value: "otro", type: "Otro", svg: Svg({ type: "padlock" }), roles: ['visitant', "super", 'admin'] }
];

function SidebarAdmin({ handleOnClick, isOpenMenu }: { handleOnClick: () => void, isOpenMenu: boolean }) {
  const { dashboard: { state: { permits }, dispatch } }: IContextData = useContext(CreateContext)!
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

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
          if (userData?.roles) {
            return permits[e.id] && (
              // <div key={i} onClick={() => {
              //   dispatch({ type: ActionTypeDashboard.SELECT_COMPONENT, payload: { name: null, value: e.value } })
              //   handleOnClick()
              // }}>{e.type} <span>{`>`}</span></div>
              <Button
              key={i}
              svgLeft={{ type: "arrowRight" }}
              button={{
                type: "highlighter",
                text: e.type,
                handleClick: () =>{ 
                  dispatch({ type: ActionTypeDashboard.SELECT_COMPONENT, payload: { name: null, value: e.value } })
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