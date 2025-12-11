"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors, animations, cyberGrid } from "../styles/shared";

// --- Styled Components ---

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.darkBg};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  overflow: hidden;

  /* Cyber Grid */
  background-image: linear-gradient(
      rgba(188, 19, 254, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(188, 19, 254, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(188, 19, 254, 0.05) 0%,
      transparent 50%
    );
    animation: ${animations.rotate} 60s linear infinite;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const WindowFrame = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  background: rgba(10, 10, 12, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid ${colors.neonPurple};
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(188, 19, 254, 0.15);

  /* Corner Decor */
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid ${colors.neonCyan};
    transition: all 0.3s ease;
  }

  &::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }

  &:hover {
    box-shadow: 0 0 50px rgba(188, 19, 254, 0.3);
    &::before,
    &::after {
      width: 50px;
      height: 50px;
      box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
    }
  }
`;

const WindowHeader = styled.div`
  height: 50px;
  background: rgba(188, 19, 254, 0.1);
  border-bottom: 1px solid ${colors.neonPurple};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-family: var(--font-share-tech-mono), monospace;
  color: ${colors.neonPurple};
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 8px;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #333;

    &:nth-child(1) {
      background: #ff5f56;
    }
    &:nth-child(2) {
      background: #ffbd2e;
    }
    &:nth-child(3) {
      background: #27c93f;
    }
  }
`;

const WindowTitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "⚡";
    animation: ${animations.pulse} 2s infinite;
  }
`;

const WindowContent = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::after {
    /* Scanline */
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 243, 255, 0.1),
      transparent
    );
    animation: ${animations.scan} 3s linear infinite;
    pointer-events: none;
    z-index: 10;
  }
`;

const ControlPanel = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(188, 19, 254, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const GlitchText = styled.h1`
  font-family: var(--font-orbitron), sans-serif;
  font-size: 2.5rem;
  color: white;
  margin: 0;
  position: relative;
  text-transform: uppercase;

  &:hover {
    animation: ${animations.glitchUser} 0.3s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    color: ${colors.neonCyan};
  }

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }

  &::before {
    color: ${colors.neonPurple};
    z-index: -1;
    transform: translate(-2px, 2px);
  }

  &::after {
    color: ${colors.neonCyan};
    z-index: -2;
    transform: translate(2px, -2px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const CyberButton = styled(motion.a)`
  position: relative;
  padding: 12px 30px;
  background: transparent;
  color: ${colors.neonCyan};
  border: 1px solid ${colors.neonCyan};
  font-family: var(--font-orbitron);
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${colors.neonCyan};
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: #000;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);

    &::before {
      left: 0;
    }
  }

  &.secondary {
    border-color: ${colors.neonPurple};
    color: ${colors.neonPurple};

    &::before {
      background: ${colors.neonPurple};
    }

    &:hover {
      box-shadow: 0 0 20px rgba(188, 19, 254, 0.4);
    }
  }
`;

const PDFViewer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    filter: invert(0.9) hue-rotate(180deg) brightness(0.8) blur(5px);
    transition: filter 0.3s;
  }

  &:hover iframe {
    filter: invert(0) blur(0px);
  }

  /* Overlay text when inverted */
  &::after {
    content: "HOVER_TO_DECRYPT_DATA";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-share-tech-mono);
    color: ${colors.neonCyan};
    background: rgba(0, 0, 0, 0.8);
    padding: 1rem 2rem;
    border: 1px solid ${colors.neonCyan};
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: 0;
  }
`;

const PreviewMyCV = () => {
  return (
    <Container id="cv-section">
      <WindowFrame
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <WindowHeader>
          <TrafficLights>
            <span />
            <span />
            <span />
          </TrafficLights>
          <WindowTitle>PERSONNEL_FILE_V7.2</WindowTitle>
          <div>
            SECURE_CONN: <span style={{ color: "#00f3ff" }}>ESTABLISHED</span>
          </div>
        </WindowHeader>

        <WindowContent>
          <ControlPanel>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-share-tech-mono)",
                  color: "#888",
                  letterSpacing: "2px",
                }}
              >
                // ACCESSING DATABASE...
              </div>
              <GlitchText data-text="PROFILE_DATA">PROFILE_DATA</GlitchText>
            </div>

            <ActionButtons>
              <CyberButton
                href="/Yulia_Rizki_CV.pdf"
                download
                className="secondary"
              >
                Secure_Download
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </CyberButton>
              <CyberButton href="/Yulia_Rizki_CV.pdf" target="_blank">
                Full_Screen
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                  />
                </svg>
              </CyberButton>
            </ActionButtons>
          </ControlPanel>

          <PDFViewer>
            <iframe src="/Yulia_Rizki_CV.pdf" title="CV Preview" />
          </PDFViewer>
        </WindowContent>
      </WindowFrame>
    </Container>
  );
};

export default PreviewMyCV;
