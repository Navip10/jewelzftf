'use client';

import { useState } from 'react';
import ColorPicker from './ColorPicker';

const CustomizationPanel = ({ onFrameColorSelect, onLensColorSelect }) => {
  const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'];

  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-60 h-80">
      <h2 className="text-xl font-semibold my-4 text-gray-500">Frame Color:</h2>
      <ColorPicker colors={colors} onSelectColor={onFrameColorSelect} />
      <h2 className="text-xl font-semibold my-4 text-gray-500">Lens Color:</h2>
      <ColorPicker colors={colors} onSelectColor={onLensColorSelect} />
    </div>
  );
};

export default CustomizationPanel;
