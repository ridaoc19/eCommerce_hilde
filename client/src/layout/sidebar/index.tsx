import { MouseEventHandler, useContext, useState } from 'react';
import Svg from '../../components/assets/Svg';
import { CreateContext } from '../../components/hooks/useContext';
import { IContextData } from '../../components/hooks/useContext/interfaceContext';


type Item = {
  id: string
  type: string;
  svg: any
};

const item: Item[] = [
  { id: "user", type: "Usuarios", svg: Svg({ type: "user" }) },
  { id: "Inventory", type: "Inventario", svg: Svg({ type: "shop" }) }
];


function Sidebar() {
  const { dashboard: { state: { component }, dispatch } }: IContextData = useContext(CreateContext)!
  console.log(component);

  const [expanded, setExpanded] = useState(false);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { name, value } = event.target as HTMLFormElement;
    console.log(name, value)
    switch (name) {
      case "toggle":
        return setExpanded(!expanded);
      case "items":
        return dispatch()
      default:
        break;
    }

  };


  return (
    <div className={`component__sidebar--container sidebar ${expanded ? 'expanded' : ''}`}>

      <div className="sidebar__header--container">
        {/* <h2>Sidebar</h2> */}
        <button name='toggle' onClick={handleOnClick}>
          {expanded ? 'Cerrar' : 'Abrir'}
        </button>
      </div>

      <div className='sidebar__items--container'>
        <ul className='item-logo'>
          {item.map((e, i) => <li key={i} >
            <button name='toggle' onClick={handleOnClick} >{e.svg}</button>
          </li>)}
        </ul>
        <ul className='item-text'>
          {item.map((e, i) => <li key={i} >
            <button name='items' value={e.id} onClick={handleOnClick}>{e.type}</button>
          </li>)}
        </ul>
      </div>

    </div>
  )

  // return (
  // <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
  //   <div className="sidebar-header">
  //     <h2>Sidebar</h2>
  //     <button onClick={toggleSidebar}>
  //       {expanded ? 'Cerrar' : 'Abrir'}
  //     </button>
  //   </div>
  //   <ul>
  //     <li>Item 1</li>
  //     <li>Item 2</li>
  //     <li>Item 3</li>
  //   </ul>
  // </div>
  // );
}

export default Sidebar;