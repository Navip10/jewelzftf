
 //Header.js
 
 
 const Header = ({ children }) => {
    const handleBackClick = () => {
        window.location.href = "https://www.jewelzfortheface.com/";
      };
    return (
    <>
          <header className="flex justify-between items-center bg-stone-300 shadow-md ">
          {/* Left arrow Unicode character for "Back" */}
          <div
            onClick={handleBackClick}
            className="font-extrabold text-6x1 hover:cursor-pointer hover:text-xl"
          >
            ←
          </div>
          <img
            src="https://www.jewelzfortheface.com/cdn/shop/files/jewelz1.png?v=1678293729&width=500"
            alt="Jewelz For The Face"
            className="w-64 h-auto"
          />
          {/* Shopping bag Unicode character for "Bag/Cart" */}
          <div className="font-extrabold text-black text-6x1 hover:cursor-pointer pr-28">🛍</div>
        </header>
          <main>{children}</main>
      
    
 
    </>
  );
 };
 
export default Header;
 