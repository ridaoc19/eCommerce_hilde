import { useState } from 'react';
import Inventory from './Inventory';
import User from './user';

function Dashboard() {
  const [render, useRender] = useState<"user" | "inventory">("user")
  switch (render) {
    case "user":
      return <User />
    case "inventory":
      return <Inventory />
    default:
      return <>default</>
  }
}

export default Dashboard;