import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import { CreateContext } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../interfaces/hooks/context.interface';
import { PermitsRoles } from '../../../interfaces/user.interface';
import { useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../../redux/reducers/user';

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
  { id: 'sidebar_user', value: "user", type: "Usuarios", svg: Svg({ type: "user" }), roles: ["super", "admin", 'edit', 'visitant'] },
  { id: 'sidebar_newDeptCatSubProdData', value: "newDeptCatSubProdData", type: "Crear Producto", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
  { id: 'sidebar_productEntry', value: "productEntry", type: "Ingresar Producto", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
  { id: 'sidebar_otro', value: "otro", type: "Otro", svg: Svg({ type: "padlock" }), roles: ['visitant', "super", 'admin'] }
];

function SidebarAdmin({ handleOnClick }: { handleOnClick: () => void }) {
  const { dashboard: { state: { permits }, dispatch } }: IContext.IContextData = useContext(CreateContext)!
  const dataUser = useAppSelector(selectUserData)

  return (
    <div className='section__main-left'>
      <div className="main__left-header">
        <div>
          <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
        </div>
      </div>
      <div className='main__left-content'>
        {item.map((e, i) => {
          if (dataUser?.roles) {
            return permits[e.id] && (
              <div key={i} onClick={() => {
                dispatch({ type: ActionTypeDashboard.SELECT_COMPONENT, payload: { name: null, value: e.value } })
                handleOnClick()
              }}>{e.type} <span>{`>`}</span></div>
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