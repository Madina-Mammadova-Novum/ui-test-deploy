const Layout = ({ children }) => {
  return (
    <div id="portal">
      <header>header</header>
      {children}
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
