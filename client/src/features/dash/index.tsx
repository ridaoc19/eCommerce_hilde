import { useContext } from 'react';
import { CreateContext } from '../../hooks/useContext';
import { IContext } from '../../interfaces/hooks/context.interface';
import ProductCreation from './Inventory/productCreation';
import ProductEntry from './Inventory/productEntry';
import Account from './account';

function Dashboard() {
  const { dashboard: { state: { component } } }: IContext.IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <Account />
    case "newDeptCatSubProdData":
      return <ProductCreation />
      // return <NewDeptCatSubProdData />
    case 'productEntry':
      return <ProductEntry />
    default:
      return <></>
  }
}

export default Dashboard;