// Layout.js
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-stone-300 shadow-md ">
        <button className="font-semibold">Back</button>
        <h1 className="text-xl font-bold text-center flex-grow">Jewelz for the Face</h1>
        <div className="font-semibold">Bag/Cart</div>
      </header>

      <main>{children}</main>

      <footer className="flex justify-between items-center p-4 mb-10 mr-5 ml-5 rounded-xl w-4/5 bg-white shadow-md">
        <div className="flex gap-4 ml-10">
          <button className="hover:bg-black hover:text-white p-2 rounded">1. Description</button>
          <button className="hover:bg-black hover:text-white p-2 rounded">2. Customize</button>
          <button className="hover:bg-black hover:text-white p-2 rounded">3. Lens</button>
        </div>
        <div className="flex gap-1 mr-52">
          <button className="p-2 rounded border-2 border-black">Favorite</button>
          <button className="p-2 rounded border-2 border-black bg-black text-white">Next</button>
        </div>
      </footer>
    </>
  );
};

export default Layout;
