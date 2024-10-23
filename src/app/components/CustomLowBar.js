const CustomLowBar = ({ onLensSwap }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 p-6 shadow-lg flex items-center justify-around">
      <button className="p-2 rounded-full border-2 border-gray-400 hover:bg-gray-200">
        1. Full View
      </button>
      <button className="p-2 rounded-full border-2 border-gray-400 hover:bg-gray-200" onClick={onLensSwap}>
        2. Lens
      </button>
      <button className="p-2 rounded-full border-2 border-gray-400 hover:bg-gray-200">
        3. Frames
      </button>
      <button className="p-2 rounded-lg border-2 border-black bg-red-100 w-24">
        Favorite
      </button>
      <button className="p-2 rounded-lg border-2 border-black bg-black text-white w-24">
        Next
      </button>
    </div>
  );
};

export default CustomLowBar;