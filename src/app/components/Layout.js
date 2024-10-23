import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="w-full h-full flex justify-center items-center">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;