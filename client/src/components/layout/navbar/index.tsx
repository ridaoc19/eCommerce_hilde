import { Link } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import Login from '../../common/login/Login';
import Sidebar from '../sidebar';

export type HandleClickDiv = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;

function Navbar() {

  return (
    <div className='navbar'>

      <div className='navbar__sidebar'>
        <Sidebar />
      </div>

      <div className='navbar__logo'>
        <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
      </div>
      {/* <div className='navbar__cart--container'>
        {Svg({ type: "shop", color: "white" })}
      </div> */}
      <div className='navbar__login'>
        <Login />
      </div>
    </div>
  );

};
export default Navbar;