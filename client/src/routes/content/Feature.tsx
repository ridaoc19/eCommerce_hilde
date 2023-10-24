import { lazy } from 'react';
import Layout from '../../components/layout';
import Loadable from '../_tools/Loadable';
import Ensayo from '../../features/Ensayo';

function NotFoundPage() {
  return <h1>404 Not Found</h1>;
}

const Home = Loadable(lazy(() => import("../../features/home")))



const Feature = [
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: 'ensayo',
    element: <Ensayo />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]

export default Feature;