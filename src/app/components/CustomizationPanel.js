'use client';

import { useState } from 'react';
import ColorPicker from './ColorPicker'; // Assuming you have a ColorPicker component

const CustomizationPanel = ({
  text,
  setText,
  textColor,
  setTextColor,
  textSize,
  setTextSize,
  diamondSize,
  setDiamondSize,
  fontChoice,
  setFontChoice,
  handleAddText, // Passed down handler from parent
  handleRotateText, // Passed down handler from parent
  handleAddDiamond, // Passed down handler from parent
  handleRotateDiamond, // Passed down handler from parent
  onFrameColorSelect,
  onLensColorSelect,
  frameColor,
  lensColor,
  handleLensShape1, // Handler for first lens shape
  handleLensShape2  // Handler for second lens shape
}) => {
  // State to track which section is active: 0 = Color Picker, 1 = Text/Diamond controls
  const [activeSection, setActiveSection] = useState(0);

  // Sample color options for frame and lens
  const frameColors = [
    '#050505', '#FFD700', '#C0C0C0', '#8B5E3C', '#2B2D42', '#D4AF37', '#B76E79', '#F5F5F5', '#1C1F3F', '#046307'
  ];
  const lensColors = [
    '#4F4F4F', '#A67B5B', '#D4D4D4', '#E3B778', '#4363E6', '#2D4A22', '#FFBF00', '#82CFFD', '#F4C2C2', '#343F4A'
  ];

  const handleLeftArrowClick = () => {
    setActiveSection((prevSection) => (prevSection > 0 ? prevSection - 1 : 1));
  };

  const handleRightArrowClick = () => {
    setActiveSection((prevSection) => (prevSection < 1 ? prevSection + 1 : 0));
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-6 flex items-center justify-between shadow-lg">
      {/* Left Arrow Button */}
      <button onClick={handleLeftArrowClick} className="text-white text-2xl p-2">
        ←
      </button>

      {/* Conditional Rendering based on the active section */}
      {activeSection === 0 && (
        <div className="flex justify-center w-full flex-col">
          {/* Lens Shape Section */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleLensShape1}
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 mx-2"
            >
              Hearts Lens
            </button>
            <button
              onClick={handleLensShape2}
              className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 mx-2"
            >
              Norway Lens
            </button>
          </div>

          {/* Frame Color Picker */}
          <div className="flex justify-center">
            <div className="w-1/3">
              <label className="block text-md font-light text-gray-300">Frame Color</label>
              <ColorPicker colors={frameColors} onSelectColor={onFrameColorSelect} selectedColor={frameColor} />
            </div>

            {/* Lens Color Picker */}
            <div className="w-1/3">
              <label className="block text-md font-light text-gray-300">Lens Color</label>
              <ColorPicker colors={lensColors} onSelectColor={onLensColorSelect} selectedColor={lensColor} />
            </div>
          </div>
        </div>
      )}

      {activeSection === 1 && (
        <div className="flex justify-center w-full">
          {/* Custom Text Input */}
          <div className="w-1/5">
            <label className="block text-md font-light text-gray-300">Custom Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-2 bg-transparent border border-gray-400 text-gray-100 rounded w-full mb-3"
              placeholder="Enter custom text"
            />
            <button onClick={handleAddText} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full">
              Place Text
            </button>
            <button onClick={handleRotateText} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full mt-2">
              Rotate Text
            </button>
          </div>

          {/* Font Selector */}
          <div className="w-1/5">
            <label className="block text-md font-light text-gray-300">Font</label>
            <select
              value={fontChoice}
              onChange={(e) => setFontChoice(e.target.value)}
              className="p-2 bg-transparent border border-gray-400 text-gray-100 rounded w-full"
            >
              <option value="helvetiker">Helvetiker</option>
              <option value="optimer">Optimer</option>
              <option value="gentilis">Gentilis</option>
              <option value="droid">Droid Sans</option>
            </select>
          </div>

          {/* Text Color Picker */}
          <div className="w-1/5">
            <label className="block text-md font-light text-gray-300">Text Color</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="p-2 w-full rounded-full"
            />
          </div>

          {/* Place Diamond Button */}
          <div className="w-1/5 text-center">
            <button onClick={handleAddDiamond} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full">
              Place Diamond
            </button>
            <button onClick={handleRotateDiamond} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full mt-2">
              Rotate Diamond
            </button>
          </div>

          {/* Diamond Size Slider */}
          <div className="w-1/5">
            <label className="block text-md font-light text-gray-300">Diamond Size</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={diamondSize}
              onChange={(e) => setDiamondSize(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Text Size Slider */}
          <div className="w-1/5">
            <label className="block text-md font-light text-gray-300">Text Size</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Right Arrow Button */}
      <button onClick={handleRightArrowClick} className="text-white text-2xl p-2">
        →
      </button>
    </div>
  );
};

export default CustomizationPanel;
