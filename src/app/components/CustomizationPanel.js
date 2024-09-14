'use client';

import ColorPicker from './ColorPicker';

const CustomizationPanel = ({ onFrameColorSelect, onLensColorSelect }) => {
  const colors = [
    '#FF99C8', '#FCF6BD', '#F3FFE3', '#FFBF69', // Soft pastel palette
    '#A7C5EB', '#FF6B6B', '#6BCB77', '#4D96FF', // Bright and vibrant
    '#FFD700', '#C0C0C0', '#8B5E3C', '#2B2D42', // Gold, silver, earthy, dark
    '#00A896', '#6A0572', '#F4A261', '#3D405B'  // Exotic and deep shades
  ];

  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-60 h-50 mb-56 mr-64">
      <h2 className="text-xl font-semibold my-4 text-gray-500">Frame Color:</h2>
      <ColorPicker colors={colors} onSelectColor={onFrameColorSelect} />
      <h2 className="text-xl font-semibold my-4 text-gray-500">Lens Color:</h2>
      <ColorPicker colors={colors} onSelectColor={onLensColorSelect} />
    </div>
  );
};

export default CustomizationPanel;