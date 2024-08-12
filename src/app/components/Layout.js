// Layout.js
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-stone-300 shadow-md ">
        <button className="font-semibold">Back</button>
        {/* <h1 className="text-xl font-bold text-center flex-grow">Jewelz for the Face</h1> */}
        <img src="https://www.jewelzfortheface.com/cdn/shop/files/jewelz1.png?v=1678293729&width=500" alt="Jewelz For The Face" className="w-64 h-auto"/>
        
        <div className="font-semibold">Bag/Cart</div>
      </header>

      <main>{children}</main>

      
    </>
  );
};

export default Layout;
