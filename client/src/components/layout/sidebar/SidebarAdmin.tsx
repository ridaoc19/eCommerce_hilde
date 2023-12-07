import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import { CreateContext } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dash/reducer';
import useMutationUser from '../../../hooks/useMutationUser';
import { IContext } from '../../../interfaces/hooks/context.interface';
import { PermitsRoles } from '../../../interfaces/user.interface';

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

function SidebarAdmin({ handleOnClick }: { handleOnClick: () => void }) {
  const { dashboard: { state: { permits }, dispatch } }: IContext.IContextData = useContext(CreateContext)!
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

  return (
    <div className='section__main-left'>
      <div className="main__left-header">
        <div>
          <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
        </div>
      </div>
      <div className='main__left-content'>
        {item.map((e, i) => {
          if (userData?.roles) {
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