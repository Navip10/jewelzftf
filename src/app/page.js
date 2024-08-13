'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ModelViewer from './components/ModelViewer';
import Layout from './components/Layout';
import CustomLowBar from './components/CustomLowBar';

const CustomizationPanelNoSSR = dynamic(
  () => import('./components/CustomizationPanel'),
  { ssr: false }
);

export default function Home() {
  const [frameColor, setFrameColor] = useState('#ffffff'); // Default color for frames (Cartier1 and Cartier7)
  const [lensColor, setLensColor] = useState('#ffffff'); // Default color for lenses (Cartier3 and Cartier5)

  const handleFrameColorChange = (color) => {
    setFrameColor(color); // Update frame color for Cartier1 and Cartier7
  };

  const handleLensColorChange = (color) => {
    setLensColor(color); // Update lens color for Cartier3 and Cartier5
  };

  return (
    <Layout>
      <Head>
        <title>Sunglasses Customization App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row w-full h-screen items-center justify-center bg-stone-300">
        <div className='w-full mr-60 md:w-2/3 mb-80'>
          <ModelViewer frameColor={frameColor} lensColor={lensColor} />
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
