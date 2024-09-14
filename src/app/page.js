'use client';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Layout from './components/Layout';
import CustomLowBar from './components/CustomLowBar';

// Dynamically import the ModelViewer without server-side rendering (SSR)
const ModelViewerNoSSR = dynamic(() => import('./components/ModelViewer'), { ssr: false });
const CustomizationPanelNoSSR = dynamic(() => import('./components/CustomizationPanel'), { ssr: false });

export default function Home() {
  // State to manage the color of the frames and lenses
  const [frameColor, setFrameColor] = useState('#ffffff'); // Default color for frames (Cartier1 and Cartier7)
  const [lensColor, setLensColor] = useState('#ffffff'); // Default color for lenses (Cartier3 and Cartier5)

  // Handler to update the frame color
  const handleFrameColorChange = (color) => {
    setFrameColor(color); // Update frame color for Cartier1 and Cartier7
  };

  // Handler to update the lens color
  const handleLensColorChange = (color) => {
    setLensColor(color); // Update lens color for Cartier3 and Cartier5
  };

  return (
    <Layout>
      <Head>
        <title>Sunglasses Customization App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Full-Screen ModelViewer as a background */}
      <ModelViewerNoSSR frameColor={frameColor} lensColor={lensColor} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-screen items-center justify-center bg-stone-300">
        <div className="w-full mr-60 md:w-2/3 mb-80">
          <CustomLowBar />
        </div>
        <div className="flex w-full md:w-1/3 p-4 h-screen items-center justify-center">
          <CustomizationPanelNoSSR 
            onFrameColorSelect={handleFrameColorChange} 
            onLensColorSelect={handleLensColorChange} 
          />
        </div>
      </div>
    </Layout>
  );
}
