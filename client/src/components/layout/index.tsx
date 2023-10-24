import { ReactNode } from 'react';
import Footer from './footer';
import Navbar from './navbar';

export namespace ILayout {
  export type LayoutProps = {
    children: ReactNode
  }
}


function Layout({ children }: ILayout.LayoutProps) {
  const pathname = window.location.pathname === "/hilde"
  console.log(pathname);

  return (
    <div className={`main__layout--container ${pathname ? 'remove' : 'add'}`}>
      <div className='main__layout--navbar'>
        <Navbar />
      </div>
      {/* {window.location.pathname === "/hilde/dashboard" &&
        <div className='main__layout--sidebar'>
        </div>} */}
      <div className='main__layout--children'>
        <div>
          {children}
        </div>
      </div>
      <div className='main__layout--footer'>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;