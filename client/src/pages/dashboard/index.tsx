import { useContext } from 'react';
import { CreateContext } from '../../components/hooks/useContext';
import { IContextData } from '../../components/utils/interface/context';
import Inventory from './Inventory';
import User from './user';

function Dashboard() {
  const { dashboard: { state: { component } } }: IContextData = useContext(CreateContext)!

  switch (component) {
    case "user":
      return <User />
    case "inventory":
      return <Inventory />
    default:
      return <></>
  }
}

export default Dashboard;