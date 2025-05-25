import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// This is a simplified placeholder - in a real app, we would have actual 3D models
const ProductModel = ({ category }: { category: string }) => {
  const group = useRef<THREE.Group>(null!);
  
  // Map category to color
  const categoryColors: Record<string, string> = {
    gadgets: '#3b82f6',
    watches: '#ef4444',
    phones: '#8b5cf6',
    laptops: '#10b981',
    accessories: '#f97316'
  };
  
  const color = categoryColors[category] || '#3b82f6';
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 2) / 4 + Math.PI / 4, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t) / 10, 0.05);
  });

  // Render different shapes based on category
  const renderModel = () => {
    switch (category) {
      case 'watches':
        return (
          <>
            {/* Watch body */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Watch face */}
            <mesh castShadow receiveShadow position={[0, 0, 0.16]}>
              <cylinderGeometry args={[1, 1, 0.05, 32]} />
              <meshStandardMaterial color="#111" emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Watch band */}
            <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
              <boxGeometry args={[0.5, 2, 0.2]} />
              <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, -1.2, 0]}>
              <boxGeometry args={[0.5, 2, 0.2]} />
              <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>
          </>
        );
        
      case 'phones':
        return (
          <>
            {/* Phone body */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <boxGeometry args={[2, 4, 0.2]} />
              <meshStandardMaterial color="#111" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* Phone screen */}
            <mesh castShadow receiveShadow position={[0, 0, 0.11]}>
              <boxGeometry args={[1.8, 3.8, 0.01]} />
              <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={0.4} />
            </mesh>
            {/* Camera bump */}
            <mesh castShadow receiveShadow position={[0.6, 1.5, 0.15]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.1} />
            </mesh>
          </>
        );
        
      case 'laptops':
        return (
          <>
            {/* Base */}
            <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
              <boxGeometry args={[4, 0.2, 3]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Screen */}
            <mesh castShadow receiveShadow position={[0, 1, -0.5]} rotation={[Math.PI / 6, 0, 0]}>
              <boxGeometry args={[4, 2.5, 0.1]} />
              <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Screen display */}
            <mesh castShadow receiveShadow position={[0, 1, -0.45]} rotation={[Math.PI / 6, 0, 0]}>
              <boxGeometry args={[3.8, 2.3, 0.01]} />
              <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Keyboard */}
            <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
              <boxGeometry args={[3.8, 0.05, 2.5]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </>
        );
        
      case 'accessories':
        return (
          <>
            {/* Earbuds case */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <capsuleGeometry args={[1, 1.5, 2, 16]} />
              <meshStandardMaterial color="#f8f8f8" metalness={0.2} roughness={0.3} />
            </mesh>
            {/* Case lid line */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <torusGeometry args={[1, 0.05, 16, 32, Math.PI]} />
              <meshStandardMaterial color="#ddd" />
            </mesh>
            {/* LED indicator */}
            <mesh castShadow receiveShadow position={[0, 0.8, 0.8]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
            </mesh>
          </>
        );
        
      // Default: gadgets - show a smart device
      default:
        return (
          <>
            {/* Device body */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
              <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Top surface */}
            <mesh castShadow receiveShadow position={[0, 0.26, 0]}>
              <cylinderGeometry args={[1.4, 1.4, 0.05, 32]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Center button/display */}
            <mesh castShadow receiveShadow position={[0, 0.29, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.02, 32]} />
              <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={0.8} />
            </mesh>
            {/* Light indicator */}
            <mesh castShadow receiveShadow position={[0.8, 0.29, 0.8]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
            </mesh>
          </>
        );
    }
  };

  return (
    <group ref={group} dispose={null}>
      {renderModel()}
    </group>
  );
};

const ProductThreeView = ({ category }: { category: string }) => {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
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
          <ProductModel category={category} />
        </PresentationControls>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductThreeView;