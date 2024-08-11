import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ModelViewer = ({ cartier3Color, cartier5Color }) => {
  const { scene: scene3 } = useGLTF('./models/Cartier3.glb');
  const { scene: scene5 } = useGLTF('./models/Cartier5.glb');
  const orbitRef = useRef();

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.target.set(0, 0, 0);
      orbitRef.current.object.position.set(0, 0, 2);
      orbitRef.current.update();
    }
  }, []);

  useEffect(() => {
    scene3.traverse((child) => {
      if (child.isMesh && child.name === 'Lenses') {
        child.material.color.set(cartier3Color);
      }
    });
    scene5.traverse((child) => {
      if (child.isMesh && child.name === 'Lenses') {
        child.material.color.set(cartier5Color);
      }
    });
  }, [cartier3Color, cartier5Color, scene3, scene5]);

  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[12, 12, 5]} intensity={1} />
        <Suspense fallback={null}>
          <primitive object={scene3} scale={0.7} position={[1, -2, 0]} />
          <primitive object={scene5} scale={0.7} position={[1, -2, 0]} />
        </Suspense>
        <OrbitControls ref={orbitRef} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
