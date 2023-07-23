import { MouseEventHandler, useContext, useState } from 'react';
import Svg from '../../components/assets/Svg';
import { CreateContext } from '../../components/hooks/useContext';
import { IContextData } from '../../interface';
// import { IContextData, IDashboard } from '../../components/hooks/useContext/interfaceContext';


type Item = {
  id: number;
  value: string;
  type: string;
  svg: any
};

const item: Item[] = [
  { id: 1, value: "user", type: "Usuarios", svg: Svg({ type: "user" }) },
  { id: 2, value: "inventory", type: "Inventario", svg: Svg({ type: "shop" }) },
  { id: 3, value: "otro", type: "Otro", svg: Svg({ type: "padlock" }) }
];


function Sidebar() {
  const { dashboard: { state: { component }, dispatch } }: IContextData = useContext(CreateContext)!
  console.log(component);

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
        <ul className='item-logo'>
          {item.map((e, i) => <li key={i} >
            <button name='toggle' onClick={handleOnClick} 
            className={component === e.value? `item__select-item` :""} >{e.svg}</button>
          </li>)}
        </ul>
        <ul className='item-text'>
          {item.map((e, i) => <li key={i} >
            <button name='items' value={e.value} onClick={handleOnClick}>{e.type}</button>
          </li>)}
        </ul>
      </div>

    </div>
  )
}

export default Sidebar;