import { useRoutes } from "react-router-dom";
import Feature from "./content/Feature";

export default function Routes() {

  return useRoutes([...Feature])
}