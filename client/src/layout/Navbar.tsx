import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import Svg from '../components/assets/Svg';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUser, selectUserData } from '../redux/reducers/user';

function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserData)

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    dispatch(clearUser());
  }

  return (
    <div>
      <Link to={'/registre'}>registre</Link>{" "}
      <Link to={'/'}>home</Link>{" "}
      <Link to={'/login'}> {Svg({ type: 'user' })}</Link>
      <span>{user?.name}</span>
      {user?.name && <button onClick={handleOnClick}>cerrar sesión</button>}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default Navbar;