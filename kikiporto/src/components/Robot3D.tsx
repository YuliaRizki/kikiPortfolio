"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Environment,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

function RobotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/robot_hero.png");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (-state.mouse.y * Math.PI) / 10,
        0.1
      );
    }
  });

  return (
    <Float speed={4} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <planeGeometry args={[6, 4, 256, 256]} />
        <meshStandardMaterial
          map={texture}
          displacementMap={texture}
          displacementScale={0.5}
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

export default function Robot3D() {
  return (
    <div className="w-full h-full absolute inset-0 will-change-transform z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={1.5} />
        <pointLight
          position={[10, 5, 5]}
          intensity={50}
          color="#00ff9f"
          distance={20}
        />
        <pointLight
          position={[-10, 5, 5]}
          intensity={50}
          color="#ff00ff"
          distance={20}
        />
        <pointLight
          position={[0, 0, 5]}
          intensity={20}
          color="#ffffff"
          distance={10}
        />

        <React.Suspense fallback={null}>
          <RobotMesh />
          <Environment preset="night" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
