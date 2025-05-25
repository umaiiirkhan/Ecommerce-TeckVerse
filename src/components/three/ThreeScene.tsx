import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
// Simplified Smartphone model
extend({ RoundedBoxGeometry });
const SmartphoneModel = ({ theme }: { theme: string }) => {
  const group = useRef<THREE.Group>(null!);
  
  // Map theme to color
  const themeColors: Record<string, string> = {
    default: '#0ea5e9',
    gadgets: '#3b82f6',
    watches: '#ef4444',
    phones: '#8b5cf6',
    laptops: '#10b981',
    accessories: '#f97316'
  };
  
  const color = themeColors[theme] || '#0ea5e9';
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 2) / 8, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t) / 8, 0.05);
  });

  return (
    <group ref={group} dispose={null}>
      {/* Phone Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <roundedBoxGeometry args={[2, 4, 0.2, 0.1, 5]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Screen */}
      <mesh castShadow receiveShadow position={[0, 0, 0.11]}>
        <roundedBoxGeometry args={[1.85, 3.8, 0.01, 0.05, 2]} />
        <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={0.4} roughness={0.3} />
      </mesh>
      
      {/* Camera */}
      <mesh castShadow receiveShadow position={[0.6, 1.6, 0.15]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Camera Lens */}
      <mesh castShadow receiveShadow position={[0.6, 1.6, 0.21]}>
        <cylinderGeometry args={[0.15, 0.15, 0.01, 32]} />
        <meshStandardMaterial color="#000" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
};

// Fix TypeScript roundedBoxGeometry error
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'roundedBoxGeometry': any;
    }
  }
}

const ThreeScene = () => {
  const { theme } = useTheme();
  
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }} className="canvas-container">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        config={{ mass: 2, tension: 400 }}
        snap
      >
        <SmartphoneModel theme={theme} />
      </PresentationControls>
      
      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ThreeScene;