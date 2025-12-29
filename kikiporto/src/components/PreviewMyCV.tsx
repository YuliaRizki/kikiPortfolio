import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../styles/shared";

// --- Local Animations ---
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const scan = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
`;
const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 4px ${colors.neonGreen}, 0 0 10px ${colors.neonGreen}, 0 0 20px ${colors.neonGreen};
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.5;
  }
`;
const laserScan = keyframes`
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

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
  /* Cyber Grid Removed */
  background-image: none;

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(188, 19, 254, 0.03) 0%,
      transparent 60%
    );
    animation: ${rotate} 120s linear infinite;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HoloFrame = styled.div`
  width: 95%;
  max-width: 1200px;
  height: 85vh;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-cyan);
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  clip-path: polygon(
    20px 0,
    100% 0,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    0 100%,
    0 20px
  );

  /* Tech Corners */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
          135deg,
          ${colors.neonCyan} 10px,
          transparent 10px
        )
        0 0,
      linear-gradient(225deg, ${colors.neonCyan} 10px, transparent 10px) 100% 0,
      linear-gradient(315deg, ${colors.neonCyan} 10px, transparent 10px) 100%
        100%,
      linear-gradient(45deg, ${colors.neonCyan} 10px, transparent 10px) 0 100%;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 2;
    opacity: 0.8;
  }

  transition: all 0.3s;
  &:hover {
    border-color: ${colors.neonCyan};
    box-shadow: 0 0 40px rgba(0, 243, 255, 0.1);
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 80vh;
  }
`;

const TechHeader = styled.div`
  height: 60px;
  background: var(--grid-color);
  border-bottom: 1px solid var(--neon-cyan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  font-family: var(--font-orbitron);
  color: ${colors.neonCyan};
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
    font-size: 0.8rem;
  }

  /* Decoding Text Animation */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${colors.neonCyan},
      transparent
    );
    animation: ${scan} 4s linear infinite;
  }
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  border: 1px solid ${colors.neonCyan};
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(0, 243, 255, 0.1);

  span.dot {
    width: 6px;
    height: 6px;
    background: ${colors.neonGreen};
    border-radius: 50%;
    box-shadow: 0 0 5px ${colors.neonGreen};
    animation: ${flicker} 1.5s infinite;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const SideDecor = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(180deg);
  font-family: var(--font-share-tech-mono);
  font-size: 0.7rem;
  color: rgba(0, 243, 255, 0.3);
  writing-mode: vertical-rl;
  letter-spacing: 4px;
  pointer-events: none;
  z-index: 10;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: var(--card-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-family: var(--font-orbitron);
  color: var(--text-primary);
  font-size: 1.5rem;
  text-transform: uppercase;

  span {
    color: ${colors.neonPurple};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 500px) {
    flex-direction: column;
    width: 100%;
  }
`;

const HexButton = styled.a`
  background: transparent;
  color: ${colors.neonCyan};
  border: 1px solid ${colors.neonCyan};
  padding: 10px 24px;
  font-family: var(--font-share-tech-mono);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );

  @media (max-width: 500px) {
    width: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${colors.neonCyan};
    transition: all 0.3s;
    z-index: -1;
  }

  &:hover {
    color: #000;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
    &::before {
      left: 0;
    }
  }

  &.download {
    border-color: ${colors.neonGreen};
    color: ${colors.neonGreen};

    &::before {
      background: ${colors.neonGreen};
    }

    &:hover {
      box-shadow: 0 0 15px rgba(0, 255, 159, 0.3);
    }
  }
`;

const PDFContainer = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  background: #000;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    /* Cyber Encryption Look: Inverted & Blurred by default */
    filter: invert(0.9) hue-rotate(180deg) contrast(1.2) brightness(0.8)
      blur(4px);
    transition: all 0.5s ease;
    opacity: 0.7;
  }

  /* Reveal on Hover */
  &:hover iframe {
    filter: invert(0) hue-rotate(0deg) contrast(1) brightness(1) blur(0px);
    opacity: 1;
  }

  /* Laser Scan Animation */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${colors.neonCyan};
    box-shadow: 0 0 20px ${colors.neonCyan}, 0 0 10px #fff;
    opacity: 1;
    animation: ${laserScan} 3s linear infinite;
    pointer-events: none;
  }

  &:hover::after {
    display: none; /* laser stops on reveal */
  }

  /* Overlay Text */
  .overlay-msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${colors.neonCyan};
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid ${colors.neonCyan};
    padding: 1rem 2rem;
    font-family: var(--font-share-tech-mono);
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: 5;
    text-align: center;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
    p {
      margin: 0;
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }

  &:hover .overlay-msg {
    opacity: 0;
  }
`;

const PreviewMyCV = () => {
  return (
    <Container id="cv-section">
      <HoloFrame
      // initial={{ opacity: 0, scale: 0.95 }}
      // whileInView={{ opacity: 1, scale: 1 }}
      // viewport={{ once: true }}
      // transition={{ duration: 0.6 }}
      >
        <TechHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.2rem" }}>⟁</span>
            <span>PERSONNEL_RECORD_734</span>
          </div>
          <StatusBadge>
            <span className="dot" />
            SECURE_ACCESS
          </StatusBadge>
        </TechHeader>

        <ContentWrapper>
          <SideDecor>SYST_34 // ENCRYPTED // VIEW_ONLY</SideDecor>

          <ControlBar>
            <div>
              <Title>
                Kiki Yulia <span>{"//"} PROFILE</span>
              </Title>
              <div
                style={{
                  fontFamily: "var(--font-share-tech-mono)",
                  color: "#666",
                  fontSize: "0.8rem",
                  marginTop: "5px",
                }}
              >
                ID: YR-2025-DEV_OPS | CLEARANCE: LEVEL_4
              </div>
            </div>

            <ButtonGroup>
              <HexButton
                href="/Yulia_Rizki_CV.pdf"
                download
                className="download"
              >
                Download_Data
              </HexButton>
              <HexButton href="/Yulia_Rizki_CV.pdf" target="_blank">
                Full_Screen_View
              </HexButton>
            </ButtonGroup>
          </ControlBar>

          <PDFContainer>
            <iframe src="/Yulia_Rizki_CV.pdf" title="CV Preview" />
            <div className="overlay-msg">
              <h3>Restricted Data</h3>
              <p>HOVER_TO_DECRYPT</p>
            </div>
          </PDFContainer>
        </ContentWrapper>
      </HoloFrame>
    </Container>
  );
};

export default PreviewMyCV;
