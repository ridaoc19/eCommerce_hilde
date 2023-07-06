import { Link } from 'react-router-dom';
import logo from '../logo.svg'
import Svg from '../components/assets/Svg';

function Navbar() {
  return (
    <div>
      <Link to={'/registre'}>registre</Link>{" "}
      <Link to={'/'}>home</Link>{" "}
      <Link to={'/login'}> {Svg({type: 'user'})}</Link>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default Navbar;