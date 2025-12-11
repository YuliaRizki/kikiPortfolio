"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { colors, animations, cyberGrid } from "../styles/shared";

// --- Styled Components ---

const Section = styled.section`
  min-height: 100vh;
  position: relative;
  background-color: ${colors.darkBg};
  color: #fff;
  overflow: hidden;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Grid Background */
  ${cyberGrid}
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  z-index: 10;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column-reverse; /* Stack with text on top/bottom as preferred */
    gap: 2rem;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  font-family: var(--font-share-tech-mono), monospace;
`;

const GlitchHeader = styled.h2`
  font-family: var(--font-orbitron), sans-serif;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  position: relative;
  color: #fff;
  text-shadow: 2px 2px 0px ${colors.neonPurple};

  &::before {
    content: "IDENTITY_VERIFIED";
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 0.8rem;
    color: ${colors.neonGreen};
    letter-spacing: 2px;
    font-family: var(--font-share-tech-mono);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TerminalText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #a0a0a0;
  margin-bottom: 2rem;
  border-left: 2px solid ${colors.neonCyan};
  padding-left: 1rem;
  background: linear-gradient(
    90deg,
    rgba(0, 243, 255, 0.05) 0%,
    transparent 100%
  );
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.span`
  color: ${colors.neonCyan};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProgressBar = styled.div<{ width: string }>`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.width || "0%"};
    background: ${colors.neonPurple};
    box-shadow: 0 0 10px ${colors.neonPurple};
    animation: ${animations.slideIn} 1.5s ease-out forwards;
  }
`;

const AvatarContainer = styled.div`
  flex: 1;
  height: 500px;
  width: 100%;
  position: relative;

  /* Hologram Effect Container */
  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 20px;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 255, 159, 0.4) 0%,
      transparent 70%
    );
    filter: blur(5px);
  }
`;

// --- 3D Particle Cloud Component ---
function ParticleCloud() {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff9f"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

const GetToKnowMe = () => {
  return (
    <Section id="about">
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <TextContainer>
          <GlitchHeader>Neural Link_Established</GlitchHeader>
          <TerminalText>
            Initializing bio-data scan... Subject identified as Yulia Rizki.
            <br />
            <br />
            Experienced Frontend Engineer specialized in building immersive web
            interfaces. Currently upgrading neural pathways with Next.js,
            Three.js, and GenAI technologies. My mission is to bridge the gap
            between human intent and digital execution.
          </TerminalText>

          <StatsGrid>
            <StatItem>
              <StatLabel>Frontend Architecture</StatLabel>
              <ProgressBar width="95%" />
            </StatItem>
            <StatItem>
              <StatLabel>UI / UX Engineering</StatLabel>
              <ProgressBar width="88%" />
            </StatItem>
            <StatItem>
              <StatLabel>React / Next.js</StatLabel>
              <ProgressBar width="92%" />
            </StatItem>
            <StatItem>
              <StatLabel>Cyber-Security Awareness</StatLabel>
              <ProgressBar width="75%" />
            </StatItem>
          </StatsGrid>
        </TextContainer>

        <AvatarContainer>
          {/* 3D Canvas for Holographic Head/Cloud */}
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ParticleCloud />
          </Canvas>

          {/* Absolute positioned overlay text or decorative elements can go here */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "rgba(0, 255, 159, 0.5)",
              fontFamily: "var(--font-orbitron)",
              fontSize: "4rem",
              opacity: 0.1,
              pointerEvents: "none",
              zIndex: -1,
            }}
          >
            AI_CORE
          </div>
        </AvatarContainer>
      </ContentWrapper>
    </Section>
  );
};

export default GetToKnowMe;
