import { useRoutes } from "react-router-dom";
import Authenticate from "./Authenticate";
import Main from "./Main";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([Main, Authenticate])
}