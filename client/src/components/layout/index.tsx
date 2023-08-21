import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';
import { ReactNode } from 'react';

export namespace ILayout {
  export type LayoutProps = {
    children: ReactNode
  }
}


function Layout({ children }: ILayout.LayoutProps) {

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