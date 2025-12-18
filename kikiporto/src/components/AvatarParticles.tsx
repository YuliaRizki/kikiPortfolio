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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        // Optimize: Reduced from 150 to 64 for significant perf boost
        const targetWidth = 64;
        const scale = targetWidth / img.width;
        canvas.width = targetWidth;
        canvas.height = Math.floor(canvas.width * (img.height / img.width));

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const points: number[] = [];
        const threshold = 60;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;

            if (brightness > threshold) {
              // Adjust scale to maintain visual size with lower resolution
              // 0.09 was for 100px. For 64px, we need larger spacing multiplier.
              // 100 * 0.09 = 9. 64 * 0.14 ~= 9.
              const pX = (x - canvas.width / 2) * 0.14;
              const pY = -(y - canvas.height / 2) * 0.14;
              const pZ = (Math.random() - 0.5) * 0.5;

              points.push(pX, pY, pZ);
            }
          }
        }

        setPositions(new Float32Array(points));
        setLoading(false);
      } catch (err) {
        console.error("Error processing avatar particles:", err);
        setLoading(false);
      }
    };

    img.onerror = (err) => {
      console.error("Failed to load avatar image:", err);
      setLoading(false);
    };

    img.src = url;
  }, [url]);

  // Target opacity based on theme
  const targetOpacity = theme === "light" ? 1.0 : 0.8;

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;

      // Smooth fade-in
      const material = pointsRef.current.material as THREE.PointsMaterial;
      if (material) {
        material.opacity = THREE.MathUtils.lerp(
          material.opacity,
          targetOpacity,
          delta * 4
        );
      }
    }
  });

  if (loading || !positions) {
    // Return a subtle placeholder instead of null to prevent layout shifts/empty space
    return (
      <mesh scale={0.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={theme === "light" ? THEME_COLORS.light : THEME_COLORS.dark}
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    );
  }

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
        size={theme === "light" ? 0.05 : 0.06} // Larger points for fewer count
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.1} // Start visible, fade in via useFrame
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
