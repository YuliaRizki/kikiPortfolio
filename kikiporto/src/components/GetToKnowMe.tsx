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
  background-color: transparent;
  color: var(--text-primary);
  overflow: hidden;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Grid Background */
  /* Grid removed */
  /* ${cyberGrid} */
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
    flex-direction: column-reverse;
    gap: 3rem;
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
  color: var(--text-primary);
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
  color: var(--text-secondary);
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
  background: var(--grid-color);
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

  @media (max-width: 768px) {
    height: 300px;
    order: -1; /* Show avatar above text on mobile if flexibility allows, or just size adjustment */
  }

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

// --- Scramble Text Component ---
const ScrambleText = ({
  text,
  speed = 50,
  delay = 0,
  reveal = false, // If true, reveal immediately
  hoverResult = "", // If set, text changes to this on hover
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  reveal?: boolean;
  hoverResult?: string;
  className?: string;
}) => {
  const [display, setDisplay] = React.useState(text);
  const [isHovering, setIsHovering] = React.useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  React.useEffect(() => {
    let interval: any;
    let timer: any;

    // Target text depends on hover state
    const target = isHovering && hoverResult ? hoverResult : text;

    const startScramble = () => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return target[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= target.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    if (reveal || isHovering) {
      timer = setTimeout(startScramble, delay);
    } else {
      // If not revealing, just show static (or could be scrambled initial state)
      // For this usage, we assume we want to show it eventually or on hover
      setDisplay(target);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [reveal, isHovering, hoverResult, text, delay]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {display}
    </span>
  );
};

// --- New Styled Components for Fun Section ---
const FunFactBox = styled(motion.div)`
  margin-top: 3rem;
  padding: 1.5rem;
  border: 1px dashed ${colors.neonCyan};
  background: var(--grid-color);
  position: relative;
  cursor: help;
  overflow: hidden;

  &::before {
    content: "CLASSIFIED_INFO // HOVER_TO_DECRYPT";
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.6rem;
    color: ${colors.neonPurple};
    opacity: 0.7;
  }

  &:hover {
    background: rgba(0, 243, 255, 0.1);
    border-style: solid;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
  }
`;

const FunFactTitle = styled.h4`
  color: ${colors.neonGreen};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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
          <GlitchHeader>
            <ScrambleText text="Neural Link_Established" reveal delay={100} />
          </GlitchHeader>

          <TerminalText>
            <ScrambleText
              text="Initializing bio-data scan... Subject identified as Yulia Rizki."
              reveal
              delay={500}
            />
            <br />
            <br />
            <span style={{ opacity: 0.9 }}>
              Experienced Frontend Engineer specialized in building immersive
              web interfaces. Currently upgrading neural pathways with Next.js,
              Three.js, and GenAI technologies. My mission is to bridge the gap
              between human intent and digital execution.
            </span>
          </TerminalText>

          <StatsGrid>
            <StatItem>
              <StatLabel>Frontend Architecture</StatLabel>
              <ProgressBar width="95%" />
            </StatItem>
            <StatItem>
              <StatLabel>React / Next.js</StatLabel>
              <ProgressBar width="92%" />
            </StatItem>
          </StatsGrid>

          <FunFactBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <FunFactTitle>
              <span style={{ fontSize: "1.2rem" }}>⚡</span>
              BONUS_DATA_PACK
            </FunFactTitle>
            <div
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
            >
              <ScrambleText
                text="Encrypting data... Hover to view."
                hoverResult="Fun Fact: My body is consists of Half Coffee and Half Code LoL."
                reveal={false}
              />
            </div>
          </FunFactBox>
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
          </div>
        </AvatarContainer>
      </ContentWrapper>
    </Section>
  );
};

export default GetToKnowMe;
