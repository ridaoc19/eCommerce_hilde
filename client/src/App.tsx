// import InitialAdvertising from './pages/auth/app/InitialAdvertising';
// import InitialMessages from './pages/auth/app/InitialMessages';
// import InitialNavigation from './pages/auth/app/InitialNavigation';
// import InitialUser from './pages/auth/app/InitialUser';
import Routes from './routes';
import './styles/app/App.scss';

function App() {

  return (
    <div className='app'>
      {/* <InitialAdvertising />
      <InitialNavigation />
      <InitialUser />
      <InitialMessages /> */}
      <Routes />
    </div>
  );
}

export default App;
