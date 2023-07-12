import Layout from '../layout';
import Home from '../pages/home';

function NotFoundPage() {
  return <h1>404 Not Found</h1>;
}


// const Main = {
//   path: '/',
//   element: <Layout><Home /></Layout>,
//   children: [
//     {
//       path: '*',
//       element: <NotFoundPage />
//     },
//   ]
// };

// const Main = [
//   {
//     path: '/',
//     element: <Layout><Home /></Layout>,
//     // exact: true,
//   },
//   // {
//   //   path: '/about',
//   //   element: AboutPage,
//   //   exact: true,
//   // },
//   {
//     element: NotFoundPage,
//   },
// ]

// const Main = [
//   {
//     path: '/',
//     element: <Layout><Home /></Layout>,
//     // exact: true,
//   },
//   // {
//   //   path: '/about',
//   //   element: AboutPage,
//   //   exact: true,
//   // },
//   {
//     element: NotFoundPage,
//   },
// ]

const Main = [
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '*',
    element: <h1>404 Not Found</h1>
  },
]

export default Main;