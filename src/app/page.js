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
  const [cartier3Color, setCartier3Color] = useState('#ffffff');
  const [cartier5Color, setCartier5Color] = useState('#ffffff');

  const handleColorChange = (color, modelIdentifier) => {
    if (modelIdentifier === 'Cartier3') {
      setCartier3Color(color);
    } else if (modelIdentifier === 'Cartier5') {
      setCartier5Color(color);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto bg-stone-300">
        <Head>
          <title>Sunglasses Customization App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-screen w-screen py-16 flex items-center justify-center bg-stone-300">
          <div className="flex w-screen items-center justify-center bg-stone-300">
            <ModelViewer cartier3Color={cartier3Color} cartier5Color={cartier5Color} />
            <div className="mr-60 flex items-center justify-center bg-stone-300">
              <CustomizationPanelNoSSR onSelectColor={handleColorChange} />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
