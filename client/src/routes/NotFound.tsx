import Layout from '../layout';
import Home from '../pages/home';

function NotFoundPage() {
  return <h1>404 Not Found</h1>;
}


const NotFound = {
  path: '*',
  element: <NotFoundPage />
};

export default NotFound;