import React, { MouseEventHandler, useContext, useState } from 'react';
import Svg from '../../../assets/icons/Svg';
import { CreateContext } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dashboard/reducer';
import { ISidebar } from '../../../interfaces/components/layout/layout.interface';
import { IContextData } from '../../../interfaces/hooks/context.interface';
import { IUser } from '../../../interfaces/sections/user.interface';
import { useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../../redux/reducers/user';

const item: ISidebar.ItemRole[] = [
  { id: 1, value: "user", type: "Usuarios", svg: Svg({ type: "user" }), roles: ["super", "admin", 'edit', 'visitant'] },
  { id: 2, value: "inventory", type: "Inventario", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
  { id: 3, value: "otro", type: "Otro", svg: Svg({ type: "padlock" }), roles: ['visitant', "super", 'admin'] }
];


function Sidebar() {
  const { dashboard: { state: { component }, dispatch } }: IContextData = useContext(CreateContext)!
  const dataUser = useAppSelector(selectUserData)

  const [expanded, setExpanded] = useState(false);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { name, value } = event.target as HTMLFormElement;
    switch (name) {
      case "toggle":
        return setExpanded(!expanded);
      case "items":
        setExpanded(!expanded)
        return dispatch({ type: ActionTypeDashboard.SELECT_COMPONENT, payload: value })
      default:
        break;
    }

  };

  return (
    <div className={`component__sidebar--container sidebar ${expanded ? 'expanded' : ''}`}>

      {/* <div className="sidebar__header--container">
        <h2>Sidebar</h2>
        <button name='toggle' onClick={handleOnClick}>
          {expanded ? 'Cerrar' : 'Abrir'}
        </button>
      </div> */}

      <div className='sidebar__items--container'>
        {['item-logo', 'item-text'].map((u, i) => <ul key={i} className={u}>
          {item.map((e, i) => {
            if (dataUser?.roles) {
              const roleIncluded = e.roles.includes(dataUser.roles as IUser.UserData["roles"]);
              return roleIncluded && (
                <li key={i}>
                  {u === "item-logo" ? <button name='toggle' onClick={handleOnClick} className={component === e.value ? `item__select-item` : ""}>
                    {e.svg}
                  </button> : <button name='items' value={e.value} onClick={handleOnClick}>{e.type}</button>
                  }
                </li>
              );
            } else {
              return <React.Fragment key={i} />;
            }
          })}
        </ul>)}
      </div>

    </div>
  )
}

export default Sidebar;