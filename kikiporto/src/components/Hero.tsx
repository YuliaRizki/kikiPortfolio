"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { colors, animations } from "../styles/shared";

// Dynamic import for 3D model
const AvatarParticles = dynamic(() => import("./AvatarParticles"), {
  ssr: false,
  loading: () => null,
});

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.darkBg};
  overflow: hidden;
  perspective: 1000px;

  /* Cyber Grid & Vignette */
  background-image: linear-gradient(${colors.darkBg} 20%, transparent 20%),
    linear-gradient(90deg, ${colors.darkBg} 20%, transparent 20%);
  background-size: 50px 50px;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      transparent 0%,
      var(--bg-primary) 90%
    );
    pointer-events: none;
  }
`;

const BackgroundTitle = styled(motion.h1)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-orbitron);
  font-size: clamp(5rem, 20vw, 15rem);
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03); /* Extremely subtle ghost text */
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 20px;
`;

const RobotWrapper = styled(motion.div)`
  position: relative;
  width: 60vh;
  height: 60vh;
  max-width: 600px;
  z-index: 5;

  &::before {
    /* Glowing Platform */
    content: "";
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%) rotateX(60deg);
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, ${colors.neonCyan} 0%, transparent 60%);
    opacity: 0.2;
    filter: blur(20px);
    z-index: -1;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50vh;
  }
`;

const ForegroundContent = styled.div`
  position: absolute;
  z-index: 10;
  text-align: center;
  width: 100%;
  pointer-events: none; /* Let clicks pass to robot or buttons */
`;

const Name = styled(motion.h2)`
  font-family: var(--font-orbitron);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 900;
  letter-spacing: 10px;
  color: #fff;
  text-shadow: 0 0 30px rgba(0, 255, 159, 0.3);
  margin-top: -50px; /* Overlap nicely */

  span {
    color: ${colors.neonGreen};
  }
`;

const RoleTag = styled(motion.div)`
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonCyan};
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${colors.neonCyan};
  display: inline-block;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  backdrop-filter: blur(5px);
  pointer-events: auto; /* Allow selection */
`;

/* HUD Elements Floating Left and Right */
const HudPanel = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 250px;
  padding: 1.5rem;
  background: rgba(10, 10, 10, 0.6);
  border-left: 2px solid ${colors.neonPurple};
  backdrop-filter: blur(5px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &.left {
    left: 5%;
    text-align: left;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%);
  }

  &.right {
    right: 5%;
    text-align: right;
    border-left: none;
    border-right: 2px solid ${colors.neonPurple};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%);
    align-items: flex-end;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HudLabel = styled.h4`
  color: #888;
  font-family: var(--font-share-tech-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 2px;
`;

const HudValue = styled.p`
  color: #fff;
  font-family: var(--font-orbitron);
  font-size: 1.1rem;
  margin: 0;
  text-shadow: 0 0 5px ${colors.neonPurple};
`;

const CtaButton = styled(motion.a)`
  margin-top: 3rem;
  padding: 1rem 3rem;
  background: transparent;
  color: ${colors.neonCyan};
  border: 1px solid ${colors.neonCyan};
  font-family: var(--font-orbitron);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  pointer-events: auto;
  transition: all 0.3s;

  &:hover {
    background: ${colors.neonCyan};
    color: #000;
    box-shadow: 0 0 30px ${colors.neonCyan};
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 159, 0.5);
  box-shadow: 0 0 10px ${colors.neonGreen};
  animation: scanDown 4s linear infinite;
  z-index: 20;
  pointer-events: none;
  opacity: 0.3;

  @keyframes scanDown {
    0% {
      top: -10%;
    }
    100% {
      top: 110%;
    }
  }
`;

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <HeroSection>
      <ScanLine />

      {/* Huge Background Text */}
      <BackgroundTitle style={{ y: y1 }}>DEVELOPER</BackgroundTitle>

      {/* Centerpiece 3D Model */}
      <RobotWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring" }}
      >
        <AvatarParticles />
      </RobotWrapper>

      {/* Main Foreground Text */}
      <ForegroundContent>
        <Name
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          KIKI <span>YULIA</span>
        </Name>
        <RoleTag
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          Frontend Engineer
        </RoleTag>
        <br />
        <CtaButton
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Initialize Project View
        </CtaButton>
      </ForegroundContent>

      {/* Floating HUD - Left */}
      <HudPanel
        className="left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div>
          <HudLabel>Location</HudLabel>
          <HudValue>Jakarta, ID</HudValue>
        </div>
        <div>
          <HudLabel>Experience</HudLabel>
          <HudValue>1+ YEARS</HudValue>
        </div>
        <div>
          <HudLabel>System Status</HudLabel>
          <HudValue style={{ color: colors.neonGreen }}>ONLINE</HudValue>
        </div>
      </HudPanel>

      {/* Floating HUD - Right */}
      <HudPanel
        className="right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div>
          <HudLabel>Core Stack</HudLabel>
          <HudValue>React / Next.js</HudValue>
        </div>
        <div>
          <HudLabel>Secondary</HudLabel>
          <HudValue>Typescript / Node</HudValue>
        </div>
        <div>
          <HudLabel>Render Engine</HudLabel>
          <HudValue>Three.js / WebGL</HudValue>
        </div>
      </HudPanel>
    </HeroSection>
  );
};

export default Hero;
