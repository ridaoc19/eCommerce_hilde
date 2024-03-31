import { lazy } from "react";
import VerifyEmail from "../../pages/dash/account/verifyEmail/VerifyEmail";
import Layout from "../../pages/layout/Layout";
import Loadable from "../_tools/Loadable";
import Ensayo from "../../pages/ensayo/Ensayo";
import NotFound from "../../components/common/NotFound/NotFound";


function NotFoundPage() {
  return <NotFound />;
}

const Home = Loadable(lazy(() => import("../../pages/navigation/home/Home")))
const ListProducts = Loadable(lazy(() => import("../../pages/navigation/listProducts/ListProducts")))
const ProductDetail = Loadable(lazy(() => import("../../pages/navigation/productDetail/ProductDetail")))

const Feature = [
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/list-products/:id',
    element: <Layout><ListProducts /></Layout>
  },
  {
    path: '/product-detail/:id',
    element: <Layout><ProductDetail /></Layout>
  },
  {
    path: '/verify/:id',
    element: <VerifyEmail />
  },
  {
    path: '/ensayo',
    element: <Ensayo />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]

export default Feature;