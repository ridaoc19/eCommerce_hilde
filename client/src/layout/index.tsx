import { ReactNode } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {

  return (
    <div className='main__layout--container'>
      <div className='main__layout--navbar'>
        <Navbar />
      </div>
      {window.location.pathname === "/hilde/dashboard" &&
        <div className='main__layout--sidebar'>
          <Sidebar />
        </div>}
      <div className='main__layout--children'>
        {children}
      </div>
      <div className='main__layout--footer'>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;