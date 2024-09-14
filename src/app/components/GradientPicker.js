import { useState, useEffect } from 'react';

const GradientPicker = ({ gradients = [], onSelectGradient }) => {
  const [selectedGradient, setSelectedGradient] = useState(gradients[0] || '');

  useEffect(() => {
    if (gradients.length > 0) {
      setSelectedGradient(gradients[0]);
    }
  }, [gradients]);

  const handleGradientClick = (gradient) => {
    setSelectedGradient(gradient);
    onSelectGradient(gradient); // Call the parent handler to update the gradient
  };

  return (
    <div className="flex gap-2 p-4 bg-stone-200 w-90 rounded-full">
      {gradients.map((gradient, index) => (
        <button
          key={index}
          className={`w-8 h-8 rounded-full cursor-pointer ${selectedGradient === gradient ? 'ring-2 ring-white' : ''}`}
          style={{ backgroundImage: gradient }} // Apply the gradient as a background
          onClick={() => handleGradientClick(gradient)}
        />
      ))}
    </div>
  );
};

export default GradientPicker;
