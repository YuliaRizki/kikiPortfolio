"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { useTheme } from "@/context/ThemeContext";

function CoreLoop({ themeColors }: { themeColors: any }) {
  const ref = useRef<any>();
  const torusRef = useRef<any>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.5;
      torusRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group>
      {/* Inner Distorted Sphere */}
      <Sphere ref={ref} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color={themeColors.cyan}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          thickness={0.1}
          transparent
          opacity={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Outer Rotating Ring */}
      <Torus
        ref={torusRef}
        args={[2.5, 0.1, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={themeColors.purple}
          emissive={themeColors.purple}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Torus>
    </group>
  );
}

export default function HoloCore() {
  const { theme } = useTheme();

  const themeColors =
    theme === "light"
      ? {
          cyan: "#ff5d8f", // Industrial Pink
          purple: "#8e85a0", // Muted Lavender
        }
      : {
          cyan: "#00f3ff",
          purple: "#bc13fe",
        };

  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[10, 10, 10]}
        intensity={1}
        color={themeColors.cyan}
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color={themeColors.purple}
      />

      <CoreLoop themeColors={themeColors} />
    </Canvas>
  );
}
