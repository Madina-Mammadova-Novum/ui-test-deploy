import { Header } from '@/common';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default Layout;
