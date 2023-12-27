import { lazy } from "react";
import Layout from "../../pages/layout/Layout";
import Loadable from "../_tools/Loadable";


function NotFoundPage() {
  return <h1>404 Not Found</h1>;
}

const Home = Loadable(lazy(() => import("../../pages/navigation/home/Home")))
// const ListProducts = Loadable(lazy(() => import('../../features/navigation/listProducts')))
// const ProductDetail = Loadable(lazy(() => import('../../features/navigation/productDetail')))



const Feature = [
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  // {
  //   path: '/list-products/:id',
  //   element: <Layout><ListProducts /></Layout>
  // },
  // {
  //   path: '/product-detail/:id',
  //   element: <Layout><ProductDetail /></Layout>
  // },
  // {
  //   path: '/verify/:id',
  //   element: <VerifyEmail />
  // },
  {
    path: '*',
    element: <NotFoundPage />
  },
]

export default Feature;