
import Header from "./Header";
const Layout = ({ children }) => {

    return (
      <div className="w-screen h-screen bg-stone-300 justify-center items-center">
            <Header />
        <main>{children}</main>
      </div>
    );
  };
  
  export default Layout;
  