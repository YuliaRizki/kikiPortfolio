"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

const THEME_COLORS = {
  dark: "#00f3ff",
  light: "#000000", 
};

function ImageParticles({ url, theme }: { url: string; theme: string }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 200 / img.width;
      canvas.width = 200;
      canvas.height = canvas.width * (img.height / img.width);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const points: number[] = [];
      const threshold = 50;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;

          if (brightness > threshold) {
            const pX = (x - canvas.width / 2) * 0.05;
            const pY = -(y - canvas.height / 2) * 0.05;
            const pZ = (Math.random() - 0.5) * 0.5;

            points.push(pX, pY, pZ);
          }
        }
      }

      setPositions(new Float32Array(points));
    };
  }, [url]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  if (!positions) return null;

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        blending={
          theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending
        }
        color={theme === "light" ? THEME_COLORS.light : THEME_COLORS.dark}
        size={theme === "light" ? 0.025 : 0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={theme === "light" ? 1.0 : 0.8}
      />
    </Points>
  );
}

export default function AvatarParticles() {
  const { theme } = useTheme();

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <ImageParticles url="/avatar_sketch.jpg" theme={theme} />
    </Canvas>
  );
}
