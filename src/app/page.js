'use client';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Layout from './components/Layout';

// Dynamically import the ModelViewer and CustomizationPanel without SSR
const ModelViewerNoSSR = dynamic(() => import('./components/ModelViewer'), { ssr: false });
const CustomizationPanelNoSSR = dynamic(() => import('./components/CustomizationPanel'), { ssr: false });

export default function Home() {
  const [frameColor, setFrameColor] = useState('#ffffff');
  const [lensColor, setLensColor] = useState('#ffffff');
  
  // State for handling text input and diamond customization
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(1);
  const [diamondSize, setDiamondSize] = useState(1);
  const [fontChoice, setFontChoice] = useState('helvetiker');

  // States for controlling text/diamond placement
  const [isPlacingText, setIsPlacingText] = useState(false);
  const [isPlacingDiamond, setIsPlacingDiamond] = useState(false);
  const [rotateText, setRotateText] = useState(false);
  const [rotateDiamond, setRotateDiamond] = useState(false);

  const handleAddText = () => {
    setIsPlacingText(true); // Trigger text placement in ModelViewer
  };

  const handleRotateText = () => {
    setRotateText((prev) => !prev); // Toggle text rotation in ModelViewer
  };

  const handleAddDiamond = () => {
    setIsPlacingDiamond(true); // Trigger diamond placement in ModelViewer
  };

  const handleRotateDiamond = () => {
    setRotateDiamond((prev) => !prev); // Toggle diamond rotation in ModelViewer
  };

  const handleLensSwap = () => {
    console.log('Lens swapped');
    // Logic to swap lenses
  };

  return (
    <Layout>
      <Head>
        <title>Sunglasses Customization App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Pass states and handlers to ModelViewer */}
      <ModelViewerNoSSR 
        frameColor={frameColor} 
        lensColor={lensColor} 
        text={text} 
        textColor={textColor} 
        textSize={textSize} 
        fontChoice={fontChoice} 
        diamondSize={diamondSize}
        isPlacingText={isPlacingText}
        isPlacingDiamond={isPlacingDiamond}
        setIsPlacingText={setIsPlacingText} // To reset after placing
        setIsPlacingDiamond={setIsPlacingDiamond} // To reset after placing
        rotateText={rotateText}
        rotateDiamond={rotateDiamond}
      />

      {/* Pass state and handlers to CustomizationPanel */}
      <CustomizationPanelNoSSR 
        onFrameColorSelect={(color) => setFrameColor(color)}
        onLensColorSelect={(color) => setLensColor(color)}
        text={text}
        setText={setText}
        textColor={textColor}
        setTextColor={setTextColor}
        textSize={textSize}
        setTextSize={setTextSize}
        diamondSize={diamondSize}
        setDiamondSize={setDiamondSize}
        fontChoice={fontChoice}
        setFontChoice={setFontChoice}
        handleAddText={handleAddText}
        handleRotateText={handleRotateText}
        handleAddDiamond={handleAddDiamond}
        handleRotateDiamond={handleRotateDiamond}
        handleLensSwap={handleLensSwap}
      />
    </Layout>
  );
}
