import { useRoutes } from "react-router-dom";
import Authenticate from "./Authenticate";
import Main from "./Main";
import DashboardRoute from "./DashboardRoute";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([...Main, Authenticate, DashboardRoute])
  // return useRoutes(Main.concat(Authenticate))
}