import { useContext } from 'react';
import { CreateContext, IContextData } from '../../hooks/useContext';
import Account from './account';
import ProductCreation from './Inventory/ProductCreation/ProductCreation';

function Dashboard() {
  const { dashboard: { stateDashboard: { component } } }: IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <Account />
    case "newDeptCatSubProdData":
      return <ProductCreation />
    default:
      return <Account />
  }
}

export default Dashboard;