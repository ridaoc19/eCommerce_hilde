import { lazy } from "react";
import Loadable from "../_tools/Loadable";


function NotFoundPage() {
  return <div>no found</div>
}

const Home = Loadable(lazy(() => import("../../pages/navigation/home/Home")))

const Navigation = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]

export default Navigation;