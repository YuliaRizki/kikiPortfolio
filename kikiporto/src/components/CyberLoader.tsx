"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { colors, animations } from "../styles/shared";
import { motion, AnimatePresence } from "framer-motion";

// --- Keyframes ---
const progressAnim = keyframes`
  0% { width: 0%; }
  10%, 20% { width: 15%; }
  35%, 45% { width: 45%; }
  60% { width: 60%; }
  70% { width: 75%; }
  100% { width: 100%; }
`;

const scanlineAnim = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

// --- Styled Components ---

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg-primary); /* Adapts to light/dark */
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: var(--font-share-tech-mono), monospace;
  color: var(--neon-cyan);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      transparent 0,
      transparent 2px,
      rgba(0, 243, 255, 0.05) 3px
    );
    pointer-events: none;
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(0, 255, 159, 0.4);
  box-shadow: 0 0 10px ${colors.neonGreen};
  animation: ${scanlineAnim} 2s linear infinite;
  opacity: 0.5;
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 400px;
  position: relative;
  z-index: 10;
`;

const TerminalText = styled.div`
  font-family: var(--font-share-tech-mono);
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  min-height: 1.5em;
  text-transform: uppercase;
  letter-spacing: 2px;

  span {
    color: ${colors.neonPurple};
    font-weight: bold;
    margin-right: 10px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background: #111;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--text-secondary);
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${colors.neonCyan};
  box-shadow: 0 0 10px ${colors.neonCyan};
  animation: ${progressAnim} 2.5s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
`;

const SystemStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.8;
`;

// --- Component ---

const CyberLoader = () => {
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "INITIALIZING KERNEL...",
    "LOADING NEURAL NETWORKS...",
    "ESTABLISHING UPLINK...",
    "DECRYPTING PROFILE...",
    "ACCESS GRANTED",
  ];

  useEffect(() => {
    // Text rotation
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) return prev + 1;
        return prev;
      });
    }, 500); // Change text every 500ms

    // Loading completion
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 2800); // Total load time (slightly longer than bar animation)

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadTimer);
    };
  }, [texts.length]);

  return (
    <AnimatePresence>
      {loading && (
        <LoaderContainer
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.5, ease: "anticipate" },
          }}
        >
          <ScanLine />

          <ContentWrapper>
            <TerminalText>
              <span>{">"}</span>
              {texts[textIndex]}
            </TerminalText>

            <ProgressBarContainer>
              <ProgressBar />
            </ProgressBarContainer>

            <SystemStatus>
              <span>MEM: 64TB OK</span>
              <span>SYS: V.1.0</span>
            </SystemStatus>
          </ContentWrapper>
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
};

export default CyberLoader;
