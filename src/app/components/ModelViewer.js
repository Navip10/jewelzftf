'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useTexture } from '@react-three/drei';

/** Function to load the font based on user selection */
const loadFont = (fontChoice) => {
  switch (fontChoice) {
    case 'helvetiker': return '/fonts/helvetiker_regular.typeface.json';
    case 'optimer': return '/fonts/optimer_regular.typeface.json';
    case 'gentilis': return '/fonts/gentilis_regular.typeface.json';
    case 'droid': return '/fonts/droid_sans_regular.typeface.json';
    default: return '/fonts/helvetiker_regular.typeface.json';
  }
};

/** Component for Swappable Model */
const SwappableModel = ({ partPath, position, scale, color, isVisible, animationRef }) => {
  const { scene } = useGLTF(partPath);
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.visible = isVisible;
      if (animationRef) {
        animationRef.current = meshRef.current;
      }

      // Apply color to all meshes in the scene
      meshRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = child.material.clone();
          child.material.color.set(color);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [isVisible, color]);

  return <primitive object={scene} position={position} scale={scale} ref={meshRef} />;
};

/** Function to create the 3D Text Mesh */
const createTextMesh = (text, fontPath, textColor, textSize, scene, hoveringTextRef) => {
  const loader = new FontLoader();
  loader.load(fontPath, (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: textSize,
      height: 0.01,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 3,
    });

    const textMaterial = new THREE.MeshStandardMaterial({
      color: textColor,
      metalness: 0.6,
      roughness: 0.2,
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);
    hoveringTextRef.current = textMesh;
  });
};

/** Main 3D Component that uses useThree */
const ModelContent = ({
  frameColor,
  lensColor,
  isPlacingText,
  isPlacingDiamond,
  rotateText,
  rotateDiamond,
  triggerLensSwap,
  text,
  textSize,
  textColor,
  fontChoice, // Pass font choice to load the correct font
  diamondSize,
  setIsPlacingText,
  setIsPlacingDiamond
}) => {
  const { camera, scene, gl } = useThree();
  const groupRef = useRef();
  const hoveringTextRef = useRef();
  const hoveringDiamondRef = useRef();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const { scene: diamondScene } = useGLTF('./models/diamond.glb');
  const diamondTexture = useTexture('/Textures/DiamondTexture.jpg');

  useEffect(() => {
    if (isPlacingText && text) {
      const fontPath = loadFont(fontChoice); // Use loadFont to get the correct font path
      createTextMesh(text, fontPath, textColor, textSize, scene, hoveringTextRef);
    }

    if (isPlacingDiamond && diamondScene) {
      const diamondMesh = diamondScene.clone();
      diamondTexture.wrapS = THREE.RepeatWrapping;
      diamondTexture.wrapT = THREE.RepeatWrapping;
      diamondTexture.repeat.set(1, 1);

      diamondMesh.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: diamondTexture,
            transparent: true,
            opacity: 1,
            metalness: 1,
            roughness: 0,
          });
          child.scale.set(diamondSize, diamondSize, diamondSize);
        }
      });

      scene.add(diamondMesh);
      hoveringDiamondRef.current = diamondMesh;
    }

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleMouseClick);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleMouseClick);
    };
  }, [isPlacingText, isPlacingDiamond, text, fontChoice, textColor, textSize, diamondScene, diamondSize, gl.domElement, scene, diamondTexture]);

  const handleMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(groupRef.current, true);

    if (isPlacingText && hoveringTextRef.current && intersects.length > 0) {
      hoveringTextRef.current.position.copy(intersects[0].point);
    }

    if (isPlacingDiamond && hoveringDiamondRef.current && intersects.length > 0) {
      hoveringDiamondRef.current.position.copy(intersects[0].point);
    }
  };

  const handleMouseClick = () => {
    if (isPlacingText && hoveringTextRef.current) setIsPlacingText(false);
    if (isPlacingDiamond && hoveringDiamondRef.current) setIsPlacingDiamond(false);
  };

  useFrame(() => {
    if (rotateText && hoveringTextRef.current) {
      hoveringTextRef.current.rotation.y = Math.PI;
    }
    if (rotateDiamond && hoveringDiamondRef.current) {
      hoveringDiamondRef.current.rotation.x = Math.PI / -2;
    }
    if (triggerLensSwap) {
      // Add lens swap animation logic here
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      {/* Swappable Models */}
      <SwappableModel partPath='./models/Cartier1.glb' position={[1.4, -1.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier2.glb' position={[1.4, -1.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier3.glb' position={[1.4, -1.5, 0]} scale={0.8} color={lensColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier4.glb' position={[1.4, -1.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier5.glb' position={[1.4, -1.5, 0]} scale={0.8} color={lensColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier6.glb' position={[1.4, -1.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier7.glb' position={[1.4, -1.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/heartlenseleft.glb' position={[-100, -3.5, 0]} scale={0.8} color={lensColor} isVisible={true} />
      <SwappableModel partPath='./models/heartlenseright.glb' position={[100, -3.5, 0]} scale={0.8} color={lensColor} isVisible={true} />
    </group>
  );
};

/** Main Viewer */
const ModelViewer = (props) => {
  return (
    <div className="w-screen h-[calc(100vh-100px)] overflow-hidden relative">
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[12, 12, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Environment background files="/models/2.hdr" />
          <ModelContent {...props} />
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
