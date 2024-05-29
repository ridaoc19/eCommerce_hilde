import { useRoutes } from "react-router-dom";
import Navigation from "./content/Navigation";

export default function Routes() {

  return useRoutes([...Navigation])
}