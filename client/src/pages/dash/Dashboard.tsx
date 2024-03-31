import { useContext } from 'react';
import NotFound from '../../components/common/NotFound/NotFound';
import { CreateContext, IContextData } from '../../hooks/useContext';
import Account from './account/Account';
import ProductCreation from './Inventory/ProductCreation/ProductCreation';
import AdminUser from './AdminUser/AdminUser';

function Dashboard() {
  const { dashboard: { stateDashboard: { component } } }: IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <Account />
    case "newDeptCatSubProdData":
      return <ProductCreation />
    case "adminUser":
      return <AdminUser />
    default:
      return <NotFound text={component} />
  }
}

export default Dashboard;