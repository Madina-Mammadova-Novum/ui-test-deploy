import { Header } from '@/common';

const Layout = ({ children }) => {
  return (
    <div id="portal">
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
