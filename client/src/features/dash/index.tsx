import { useContext } from 'react';
import Inventory from './Inventory';
import Account from './account';
import { IContext } from '../../interfaces/hooks/context.interface';
import { CreateContext } from '../../hooks/useContext';

function Dashboard() {
  const { dashboard: { state: { component } } }: IContext.IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <Account />
    case "inventory":
      return <Inventory />
    default:
      return <></>
  }
}

export default Dashboard;