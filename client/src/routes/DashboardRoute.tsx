import { lazy } from 'react';
import Loadable from '../components/utils/Loadable';
import ProtectedRouteDashboard from './tools/ProtectedRouteDashboard';
import Layout from '../layout';

const Dashboard = Loadable(lazy(() => import('../pages/dashboard')))

const DashboardRoute = {
  path: "/",
  element: <ProtectedRouteDashboard />,
  children: [
    {
      path: "/dashboard",
      element: <Layout> <Dashboard /></Layout>,
    },
  ],
};

export default DashboardRoute;
