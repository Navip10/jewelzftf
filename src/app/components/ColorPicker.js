import { useState } from 'react';

const ColorPicker = ({ colors, onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color); // Directly apply color without needing a model identifier
  };

  return (
    <div className="flex gap-1.5 p-4 bg-stone-200 w-90 rounded-full">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
