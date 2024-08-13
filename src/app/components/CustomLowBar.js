
 //CustomLowBar.js
 //creates the customization with description lens and frames
 
 const CustomLowBar = ({ children }) => {
    return (
    <>
          <div className="flex-col text-black items-center mb-8 w-1/3 ml-44 ">
            <h1 className="text-black items-center w-40  mb-.5 text-5xl">customize</h1>
            <sub className="text-black text-lg"> Customize your glasses according to our selections of materials.</sub>
          </div> 
          <div className="p-4 flex flex-col md:flex-row justify-between items-center ml-40 mb-96 mx-5 rounded-xl bg-white shadow-md">
            <div className="flex gap-24">
              <button className="hover:bg-black hover:text-white p-2 rounded">1. Full View</button> 
              <button className="hover:bg-black hover:text-white p-2 rounded">2. Lens</button>
              <button className="hover:bg-black hover:text-white p-2 rounded">3. Frames</button>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg border-2 border-black bg-red-100 w-24">Favorite</button>
              <button className="p-2 rounded-lg border-2 border-black bg-black text-white w-24">Next</button>
            </div>
         </div>

          <main>{children}</main>
      
    </>
  );
 }
 
 
export default CustomLowBar;
 