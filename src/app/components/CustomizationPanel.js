'use client';

import ColorPicker from './ColorPicker';

const CustomizationPanel = ({ onFrameColorSelect, onLensColorSelect }) => {
  // Specific colors for frames (luxury and metallic shades)
  const frameColors = [
    '#050505', '#FFD700', '#C0C0C0', '#8B5E3C', // Black, Gold, Silver, Earthy Brown
    '#2B2D42', '#D4AF37', '#B76E79', '#F5F5F5', // Dark Blue, Champagne Gold, Rose Gold, Ivory
    '#1C1F3F', '#046307' // Midnight Blue, Emerald Green
  ];

  // Specific colors for lenses (tints and reflective shades)
  const lensColors = [
    '#4F4F4F', '#A67B5B', '#D4D4D4', '#E3B778', // Smoke Gray, Brown, Silver, Bronze Gold
    '#4363E6', '#2D4A22', '#FFBF00', '#82CFFD', // Blue, Green, Amber, Ice Blue
    '#F4C2C2', '#343F4A' // Rose, Graphite
  ];

  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-60 h-50 mb-56 mr-64">
      {/* Frame Color Picker */}
      <h2 className="text-xl font-semibold my-4 text-gray-500">Frame Color:</h2>
      <ColorPicker colors={frameColors} onSelectColor={onFrameColorSelect} />

      {/* Lens Color Picker */}
      <h2 className="text-xl font-semibold my-4 text-gray-500">Lens Color:</h2>
      <ColorPicker colors={lensColors} onSelectColor={onLensColorSelect} />
    </div>
  );
};

export default CustomizationPanel;