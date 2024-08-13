import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ModelViewer = ({ frameColor, lensColor }) => {
  // Load all relevant models
  const { scene: scene1 } = useGLTF('./models/Cartier1.glb');  // Frame
  const { scene: scene2 } = useGLTF('./models/Cartier2.glb');  // Non-changing
  const { scene: scene3 } = useGLTF('./models/Cartier3.glb');  // Lens
  const { scene: scene4 } = useGLTF('./models/Cartier4.glb');  // Non-changing
  const { scene: scene5 } = useGLTF('./models/Cartier5.glb');  // Lens
  const { scene: scene6 } = useGLTF('./models/Cartier6.glb');  // Non-changing
  const { scene: scene7 } = useGLTF('./models/Cartier7.glb');  // Frame

  const orbitRef = useRef();

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.target.set(0, 0, 0);
      orbitRef.current.object.position.set(0, 0, 2);
      orbitRef.current.update();
    }
  }, []);

  // Function to apply color to the relevant meshes in a scene
  const applyColorToMeshes = (scene, meshNames, color) => {
    scene.traverse((child) => {
      if (child.isMesh && meshNames.includes(child.name)) {
        console.log('Inspecting Material for:', child.name);
        console.log('Material:', child.material);

        // Clone and adjust material
        const material = child.material.clone();
        material.color.set(color);
        material.map = null;
        material.emissiveMap = null;
        material.alphaMap = null;
        material.envMap = null;
        material.metalness = 0.1;
        material.roughness = 0.7;
        material.needsUpdate = true;

        child.material = material;

        console.log(`Applied color to ${child.name}`);
      }
    });
  };

  // Apply frame color to Cartier1 and Cartier7 models
  useEffect(() => {
    if (scene1) applyColorToMeshes(scene1, ['Mesh016_1'], frameColor); // Replace 'Mesh016_1' with actual mesh name in Cartier1
    if (scene7) applyColorToMeshes(scene7, ['Mesh036_1'], frameColor); // Replace 'Mesh036_1' with actual mesh name in Cartier7
  }, [frameColor, scene1, scene7]);

  // Apply lens color to Cartier3 and Cartier5 models
  useEffect(() => {
    if (scene3) applyColorToMeshes(scene3, ['glasses023'], lensColor); // Replace 'glasses023' with actual mesh name in Cartier3
    if (scene5) applyColorToMeshes(scene5, ['glasses025'], lensColor); // Replace 'glasses025' with actual mesh name in Cartier5
  }, [lensColor, scene3, scene5]);

  return (
    <div className="w-full h-screen ml-20 mr-20">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[12, 12, 5]} intensity={1} />
        <Suspense fallback={null}>
          <primitive object={scene1} scale={0.8} position={[1.4, -3.5, 0]} />
          <primitive object={scene2} scale={0.8} position={[1.4, -3.5, 0]} /> {/* Non-changing */}
          <primitive object={scene3} scale={0.8} position={[1.4, -3.5, 0]} />
          <primitive object={scene4} scale={0.8} position={[1.4, -3.5, 0]} /> {/* Non-changing */}
          <primitive object={scene5} scale={0.8} position={[1.4, -3.5, 0]} />
          <primitive object={scene6} scale={0.8} position={[1.4, -3.5, 0]} /> {/* Non-changing */}
          <primitive object={scene7} scale={0.8} position={[1.4, -3.5, 0]} />
        </Suspense>
        <OrbitControls ref={orbitRef} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
