"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

function EarthPoints() {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(8000), { radius: 2 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta / 10;
      ref.current.rotation.x += delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff9f" 
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none !important;
`;

export default function CyberEarth() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <EarthPoints />
      </Canvas>
    </CanvasContainer>
  );
}
