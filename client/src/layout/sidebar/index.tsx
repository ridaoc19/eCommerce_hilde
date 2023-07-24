import React, { MouseEventHandler, useContext, useState } from 'react';
import Svg from '../../components/assets/Svg';
import { CreateContext } from '../../components/hooks/useContext';
import { IContextData } from '../../components/utils/interface/context';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/reducers/user';


type Role = "super" | "admin" | "edit" | "visitant";

type Item = {
  id: number;
  value: string;
  type: string;
  svg: any;
  roles: Role[]; // Aquí indicamos que roles es un array de roles permitidos
};
const item: Item[] = [
  { id: 1, value: "user", type: "Usuarios", svg: Svg({ type: "user" }), roles: ["super", "admin", 'edit', 'visitant'] },
  { id: 2, value: "inventory", type: "Inventario", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
  { id: 3, value: "otro", type: "Otro", svg: Svg({ type: "padlock" }), roles: ['visitant'] }
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
        return dispatch({ type: "SELECT_COMPONENT", payload: value })
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
              const roleIncluded = e.roles.includes(dataUser.roles as Role);
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