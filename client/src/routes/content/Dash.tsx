import { lazy } from 'react';
import Layout from '../../components/layout';
import Loadable from '../_tools/Loadable';
import ProtectedRouteDash from '../_tools/ProtectedRouteDash';

const Dashboard = Loadable(lazy(() => import('../../features/dash')))

const Dash = {
  path: "/",
  element: <ProtectedRouteDash />,
  children: [
    {
      path: "/dashboard",
      element: <Layout> <Dashboard /></Layout>,
    },
  ],
};

export default Dash;
