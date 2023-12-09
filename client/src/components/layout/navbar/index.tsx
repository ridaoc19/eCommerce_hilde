import { MouseEventHandler, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import { CreateContext } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dash/reducer';
import useMutationUser from '../../../hooks/useMutationUser';
import { IContext } from '../../../interfaces/hooks/context.interface';
import { permitsRoles } from '../../../interfaces/user.interface';
import Search from '../../common/search/Search';
import Sidebar from '../sidebar';


function Navbar() {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;
  const { data: { getUserQueryData }, tools: { removeQuery } } = useMutationUser()
  const { userData, isFetchingUser } = getUserQueryData()

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    removeQuery()
    dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
  }

  useEffect(() => {
    if (userData) {
      if (userData.verified) {
        permitsRoles.forEach(acc => {
          if (acc.roles.some(r => r.includes(userData.roles))) {
            dispatchContext({ type: ActionTypeDashboard.PERMITS_ROLES, payload: { name: null, value: acc.id } })
          }
        });
      }
    }
    // eslint-disable-next-line
  }, [isFetchingUser])

  return (
    <div className='component__navbar--container'>
      <div className='navbar__sidebar--container'>
        <Sidebar />
      </div>
      <div className='navbar__logo--container'>
        <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
      </div>
      {/* <div className='navbar__cart--container'>
        {Svg({ type: "shop", color: "white" })}
      </div> */}
      <div className='navbar__search--container' >
        <Search />
      </div>
      <div className='navbar__login--container'>
        <Link to={'/login'}>{Svg({ type: 'user', color: "white" })}</Link>
        {userData?.name &&
          <>
            <button onClick={handleOnClick}>cerrar sesión</button>
            <Link to={'/dashboard'}>dashboard</Link>
            <span>{userData.name}</span>
          </>}
      </div>
    </div>
  );
  // }
  // return (
  //   <nav className="navbar">
  //     <div className="navbar-logo">
  //       <div className="card">
  //         <img src="http://localhost:3000/favicon.ico" alt="Imagen del producto" width={100}/>
  //           <h3>Nombre del producto</h3>
  //           <p>Descripción del producto</p>
  //       </div>

  //     </div>
  //     <ul className="navbar-menu">
  //       <li>Inicio</li>
  //       <li>Productos</li>
  //       <li>Carrito</li>
  //       <li>Mi Cuenta</li>
  //     </ul>
  //   </nav>
  // );
};
export default Navbar;