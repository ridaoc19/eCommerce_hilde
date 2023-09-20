import { useContext } from 'react';
import Account from './account';
import { IContext } from '../../interfaces/hooks/context.interface';
import { CreateContext } from '../../hooks/useContext';
import NewDeptCatSubProdData from './Inventory/newDeptCatSubProdData';
import ProductEntry from './Inventory/productEntry';

function Dashboard() {
  const { dashboard: { state: { component } } }: IContext.IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <Account />
    case "newDeptCatSubProdData":
      return <NewDeptCatSubProdData />
    case 'productEntry':
      return <ProductEntry />
    default:
      return <></>
  }
}

export default Dashboard;