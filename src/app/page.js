'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import ModelViewer from './components/ModelViewer';
import Layout from './components/Layout';

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
      <div className="flex flex-col md:flex-row w-full items-center justify-center bg-stone-300">
        <div className='w-full md:w-2/3'>
          <ModelViewer frameColor={frameColor} lensColor={lensColor} />
          <footer className="p-4 flex flex-col md:flex-row justify-between items-center ml-40 mb-96 mx-5 rounded-xl bg-white shadow-md">
            <div className="flex gap-24">
              <button className="hover:bg-black hover:text-white p-2 rounded">1. Description</button>
              <button className="hover:bg-black hover:text-white p-2 rounded">2. Customize</button>
              <button className="hover:bg-black hover:text-white p-2 rounded">3. Lens</button>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg border-2 border-black bg-red-100 w-24">Favorite</button>
              <button className="p-2 rounded-lg border-2 border-black bg-black text-white w-24">Next</button>
            </div>
          </footer>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <CustomizationPanelNoSSR 
            onFrameColorSelect={handleFrameColorChange} 
            onLensColorSelect={handleLensColorChange} 
          />
        </div>
      </div>
    </Layout>
  );
}
