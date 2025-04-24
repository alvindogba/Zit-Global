import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Building = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      {/* Base */}
      <Box
        ref={meshRef}
        args={[2, 4, 2]}
        position={[0, 2, 0]}
      >
        <meshStandardMaterial
          color="#0ea5e9"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Decorative elements */}
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.2, 16, 16]}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 2,
            i * 1.5,
            Math.sin((i / 5) * Math.PI * 2) * 2,
          ]}
        >
          <meshStandardMaterial
            color="#7dd3fc"
            metalness={0.5}
            roughness={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

export const ArchitectureScene = () => {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 45 }}
      style={{ height: '500px' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
      />
      <Building />
    </Canvas>
  );
};
