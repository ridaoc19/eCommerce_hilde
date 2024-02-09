import { useContext } from 'react';
import { CreateContext, IContextData } from '../../hooks/useContext';
// import ProductCreation from './Inventory/productCreation';
// import ProductEntry from './Inventory/productEntry';
import Account from './account';
import ProductCreation from './Inventory/ProductCreation/ProductCreation';
import ProductEntry from './Inventory/ProductEntry/ProductEntry';

function Dashboard() {
  const { dashboard: { state: { component } } }: IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <Account />
    case "newDeptCatSubProdData":
      return <ProductCreation />
    // return <NewDeptCatSubProdData />
    // return <></>
    case 'productEntry':
      return <ProductEntry />
    // return <></>
    default:
      return <></>
  }
}

export default Dashboard;