import { useRoutes } from "react-router-dom";
import Auth from "./content/Auth";
import Dash from "./content/Dash";
import Feature from "./content/Feature";

export default function Routes() {

  return useRoutes([...Feature, Auth, Dash])
}