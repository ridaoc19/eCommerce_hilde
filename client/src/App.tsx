import { Link } from 'react-router-dom';
import './App.scss';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/login'}>login</Link>
        <Link to={'/registre'}>registre</Link>
        <Link to={'/'}>home</Link>
        <Routes />
      </header>
    </div>
  );
}

export default App;
