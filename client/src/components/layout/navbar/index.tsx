import { MouseEventHandler, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import { CreateContext } from '../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../interfaces/hooks/context.interface';
import { permitsRoles } from '../../../interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserData } from '../../../redux/reducers/user';
import Sidebar from '../sidebar';
import Search from '../../common/search/Search';


function Navbar() {
  const dispatch = useAppDispatch();
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!;

  const user = useAppSelector(selectUserData)

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
  }

  useEffect(() => {
    if (user instanceof Object) {
      if (user?.verified) {
        permitsRoles.forEach(acc => {
          if (acc.roles.some(r => r.includes(user.roles))) {
            dispatchContext({ type: ActionTypeDashboard.PERMITS_ROLES, payload: { name: null, value: acc.id } })
          }
        });
      }
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <div className='component__navbar--container'>
      <div className='navbar__sidebar--container'>
        <Sidebar />
      </div>
      <div className='navbar__cart--container'>
        {Svg({ type: "shop", color: "white" })}
      </div>
      <div className='navbar__search--container' >
        <Search />
      </div>
      <div className='navbar__logo--container'>
        <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
      </div>
      <div className='navbar__login--container'>
        <Link to={'/login'}>{Svg({ type: 'user', color: "white" })}</Link>
        {user?.name &&
          <>
            <button onClick={handleOnClick}>cerrar sesión</button>
            <Link to={'/dashboard'}>dashboard</Link>
            <span>{user?.name}</span>
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