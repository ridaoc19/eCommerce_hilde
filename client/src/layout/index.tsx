import { ReactNode } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;