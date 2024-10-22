'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useTexture } from '@react-three/drei'; // Ensure this is imported at the top

/** Component for Swappable Model */
const SwappableModel = ({ partPath, position, scale, color, isVisible }) => {
  const { scene } = useGLTF(partPath);
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.visible = isVisible;

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

/** Text Mesh Creation */
const createTextMesh = (text, fontPath, textColor, textSize, scene, hoveringTextRef) => {
  const loader = new FontLoader();
  loader.load(fontPath, (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: textSize,
      height: 0.001,
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

/** Main 3D Animation Component */
const AnimatedModel = (props) => {
  const {
    frameColor,
    lensColor,
    text,
    fontPath,
    textColor,
    textSize,
    diamondSize, // Added for diamond size
    isPlacingText,
    isPlacingDiamond,
    setIsPlacingText,
    setIsPlacingDiamond,
    rotateText,
    rotateDiamond,
  } = props;

  const { camera, scene, gl } = useThree();
  const groupRef = useRef();
  const hoveringTextRef = useRef();
  const hoveringDiamondRef = useRef();

  const { scene: diamondScene } = useGLTF('./models/diamond.glb');
  const diamondTexture = useTexture('/Textures/DiamondTexture.jpg'); // Load the diamond texture
  useEffect(() => {
    console.log('Diamond Texture Loaded:', diamondTexture); // Log the loaded texture
  }, [diamondTexture]);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

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

  useEffect(() => {
    if (isPlacingText && text) {
      createTextMesh(text, fontPath, textColor, textSize, scene, hoveringTextRef);
    }

    if (isPlacingDiamond && diamondScene) {
      const diamondMesh = diamondScene.clone();
      diamondTexture.wrapS = THREE.RepeatWrapping; // Enable horizontal tiling
      diamondTexture.wrapT = THREE.RepeatWrapping; // Enable vertical tiling
      diamondTexture.repeat.set(1, 1); // Set the number of times the texture repeats

      diamondMesh.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: diamondTexture,
            transparent: true,
            opacity: 1,
            metalness: 1,
            roughness: 0,
          });
          // Adjust diamond size based on the slider
          child.scale.set(diamondSize, diamondSize, diamondSize);
        }
      });

      scene.add(diamondMesh);
      hoveringDiamondRef.current = diamondMesh; // Update the reference
    }

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleMouseClick);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleMouseClick);
    };
  }, [isPlacingText, isPlacingDiamond, text, fontPath, textColor, textSize, diamondScene, diamondSize]);

  useFrame(() => {
    if (rotateText && hoveringTextRef.current) {
      hoveringTextRef.current.rotation.y = Math.PI; // Rotate text 180 degrees
    } 
    if (rotateDiamond && hoveringDiamondRef.current) {
      hoveringDiamondRef.current.rotation.x = Math.PI / -2; // Lock diamond rotation at 90 degrees
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      <SwappableModel partPath='./models/Cartier1.glb' position={[1.4, -3.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier2.glb' position={[1.4, -3.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier3.glb' position={[1.4, -3.5, 0]} scale={0.8} color={lensColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier4.glb' position={[1.4, -3.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier5.glb' position={[1.4, -3.5, 0]} scale={0.8} color={lensColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier6.glb' position={[1.4, -3.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
      <SwappableModel partPath='./models/Cartier7.glb' position={[1.4, -3.5, 0]} scale={0.8} color={frameColor} isVisible={true} />
    </group>
  );
};

/** Main Viewer */
const ModelViewer = ({ frameColor, lensColor }) => {
  const [text, setText] = useState('');
  const [fontChoice, setFontChoice] = useState('helvetiker');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(0.1);
  const [diamondSize, setDiamondSize] = useState(1); // Add state for diamond size
  const [isPlacingText, setIsPlacingText] = useState(false);
  const [isPlacingDiamond, setIsPlacingDiamond] = useState(false);
  const [rotateText, setRotateText] = useState(false);
  const [rotateDiamond, setRotateDiamond] = useState(false);

  const handleAddText = () => setIsPlacingText(true);
  const handleAddDiamond = () => setIsPlacingDiamond(true);
  const handleRotateText = () => setRotateText(!rotateText);
  const handleRotateDiamond = () => setRotateDiamond(!rotateDiamond);

  return (
    <div className="relative w-full h-screen">
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <directionalLight position={[12, 12, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Environment background files="/models/2.hdr" />
          <AnimatedModel
            frameColor={frameColor}
            lensColor={lensColor}
            text={text}
            fontPath={loadFont(fontChoice)}
            textColor={textColor}
            textSize={textSize}
            diamondSize={diamondSize} // Pass diamond size to AnimatedModel
            isPlacingText={isPlacingText}
            isPlacingDiamond={isPlacingDiamond}
            setIsPlacingText={setIsPlacingText}
            setIsPlacingDiamond={setIsPlacingDiamond}
            rotateText={rotateText}
            rotateDiamond={rotateDiamond}
          />
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>

{/* Luxurious Bottom Menu */}
<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-6 flex items-center justify-around shadow-lg">
  {/* Custom Text Input */}
  <div className="w-1/5">
    <label className="block text-md font-light text-gray-300">Custom Text</label>
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="p-2 bg-transparent border border-gray-400 text-gray-100 rounded w-full mb-3"
      placeholder="Enter custom text"
    />
    <button onClick={handleAddText} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full">
      Place Text
    </button>
    <button onClick={handleRotateText} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full mt-2">
      Rotate Text
    </button>
  </div>

  {/* Font Selector */}
  <div className="w-1/5">
    <label className="block text-md font-light text-gray-300">Font</label>
    <select
      value={fontChoice}
      onChange={(e) => setFontChoice(e.target.value)}
      className="p-2 bg-transparent border border-gray-400 text-gray-100 rounded w-full"
    >
      <option value="helvetiker">Helvetiker</option>
      <option value="optimer">Optimer</option>
      <option value="gentilis">Gentilis</option>
      <option value="droid">Droid Sans</option>
    </select>
  </div>

  {/* Text Color */}
  <div className="w-1/5">
    <label className="block text-md font-light text-gray-300">Text Color</label>
    <input
      type="color"
      value={textColor}
      onChange={(e) => setTextColor(e.target.value)}
      className="p-2 w-full rounded-full"
    />
  </div>

  {/* Place Diamond Button */}
  <div className="w-1/5 text-center">
    <button onClick={handleAddDiamond} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full">
      Place Diamond
    </button>
    <button onClick={handleRotateDiamond} className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 w-full mt-2">
      Rotate Diamond
    </button>
  </div>

  {/* Diamond Size Slider */}
  <div className="w-1/5">
    <label className="block text-md font-light text-gray-300">Diamond Size</label>
    <input
      type="range"
      min="0.1"
      max="2"
      step="0.1"
      value={diamondSize}
      onChange={(e) => setDiamondSize(e.target.value)}
      className="w-full"
    />
  </div>

  {/* Text Size Slider */}
  <div className="w-1/5">
    <label className="block text-md font-light text-gray-300">Text Size</label>
    <input
      type="range"
      min="0.1"
      max="2"
      step="0.1"
      value={textSize}
      onChange={(e) => setTextSize(e.target.value)}
      className="w-full"
    />
  </div>
</div>

    </div>
  );
};

/** Font Loader */
const loadFont = (fontChoice) => {
  switch (fontChoice) {
    case 'helvetiker': return '/fonts/helvetiker_regular.typeface.json';
    case 'optimer': return '/fonts/optimer_regular.typeface.json';
    case 'gentilis': return '/fonts/gentilis_regular.typeface.json';
    case 'droid': return '/fonts/droid_sans_regular.typeface.json';
    default: return '/fonts/helvetiker_regular.typeface.json';
  }
};

export default ModelViewer;