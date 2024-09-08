import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const SwappableModel = ({ partPath, position, scale, animationConfig, isVisible }) => {
  const { scene } = useGLTF(partPath);
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.visible = isVisible;
    }
  }, [isVisible]);

  useFrame(() => {
    if (animationConfig && meshRef.current) {
      const { position: targetPosition, progress } = animationConfig;
      meshRef.current.position.lerp(targetPosition, progress);
    }
  });

  return (
    <primitive object={scene} position={position} scale={scale} ref={meshRef} />
  );
};

const AnimatedModel = ({ frameColor, lensColor }) => {
  const { camera } = useThree();
  const groupRef = useRef();

  const [animationProgress, setAnimationProgress] = useState(0);
  const [isOldLensesVisible, setIsOldLensesVisible] = useState(true);
  const [isHeartLensesVisible, setIsHeartLensesVisible] = useState(false);

  const animationDelay = 5;
  const oldLensesHideTime = 3;

  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.5;

      camera.position.set(0, 0, cameraZ);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (elapsedTime < animationDelay) {
      return; 
    }

    const adjustedElapsedTime = elapsedTime - animationDelay;
    const transitionTime = 5;
    const progress = Math.min(adjustedElapsedTime / transitionTime, 1);
    setAnimationProgress(progress);

    if (adjustedElapsedTime > oldLensesHideTime) {
      setIsOldLensesVisible(false);
      setIsHeartLensesVisible(true);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      {/* Original glasses parts */}
      <SwappableModel partPath='./models/Cartier1.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={true} />
      <SwappableModel partPath='./models/Cartier2.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={true} />
      <SwappableModel partPath='./models/Cartier3.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={isOldLensesVisible}
        animationConfig={{ position: new THREE.Vector3(3, 0, 0), progress: animationProgress }} />
      <SwappableModel partPath='./models/Cartier4.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={true} />
      <SwappableModel partPath='./models/Cartier5.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={isOldLensesVisible}
        animationConfig={{ position: new THREE.Vector3(-3, 0, 0), progress: animationProgress }} />
      <SwappableModel partPath='./models/Cartier6.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={true} />
      <SwappableModel partPath='./models/Cartier7.glb' position={[1.4, -3.5, 0]} scale={0.8} isVisible={true} />

      {/* Heart-shaped glasses parts */}
      <SwappableModel partPath='./models/heartlenseright.glb' position={[0, 0, 0]} scale={0.8} isVisible={isHeartLensesVisible}
        animationConfig={{ position: new THREE.Vector3(1.65, -3.5, .05), progress: animationProgress }} />
      <SwappableModel partPath='./models/heartlenseleft.glb' position={[0, 0, 0]} scale={0.8} isVisible={isHeartLensesVisible}
        animationConfig={{ position: new THREE.Vector3(1.15, -3.5, .05), progress: animationProgress }} />
    </group>
  );
};

const ModelViewer = ({ frameColor, lensColor }) => {
  const orbitRef = useRef();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[12, 12, 5]} intensity={1} />
        
        {/* Full-screen HDR environment */}
        <Suspense fallback={null}>
          <Environment background files="/models/2.hdr" />
          <AnimatedModel frameColor={frameColor} lensColor={lensColor} />
        </Suspense>
        
        <OrbitControls ref={orbitRef} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
