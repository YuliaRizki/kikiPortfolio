import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const HUDContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #ff0055;
  color: #ff0055;
  font-family: "Share Tech Mono", monospace;
  z-index: 10001; /* Above almost everything but alerts */
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 5px 5px 0px #00f3ff;

  /* Corner Clip */
  clip-path: polygon(0 0, 100% 0, 100% 90%, 92% 100%, 0 100%);

  /* Scanline */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent 50%, rgba(255, 0, 85, 0.05) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ff0055;
  padding-bottom: 5px;
  margin-bottom: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div<{ value: number }>`
  width: 100px;
  height: 6px;
  background: #330011;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.value}%;
    background: #00f3ff;
    transition: width 0.2s ease;
  }
`;

const LogContainer = styled.div`
  height: 80px;
  overflow: hidden;
  font-size: 0.7rem;
  color: #00f3ff;
  border-top: 1px dotted #330011;
  padding-top: 5px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LogLine = styled.div`
  white-space: nowrap;
  opacity: 0.8;
`;

const ClickRipple = styled(motion.div)`
  position: fixed;
  border: 2px solid #ff0055;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
`;

export const GodModeHUD = () => {
  const [cpu, setCpu] = useState(30);
  const [ram, setRam] = useState(45);
  const [logs, setLogs] = useState<string[]>([]);

  // Fake data tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(20 + Math.random() * 60));
      setRam(Math.floor(40 + Math.random() * 20));

      const newLog = `> [SYSTEM] Process ${Math.floor(
        Math.random() * 9999
      )} OK`;
      setLogs((prev) => [...prev.slice(-4), newLog]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HUDContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Header>
        <span>ADMIN_PANEL v1.0</span>
        <span>ONLINE</span>
      </Header>

      <StatRow>
        <span>CPU_LOAD</span>
        <ProgressBar value={cpu} />
        <span>{cpu}%</span>
      </StatRow>

      <StatRow>
        <span>MEM_ALLOC</span>
        <ProgressBar value={ram} />
        <span>{ram}%</span>
      </StatRow>

      <StatRow>
        <span>NET_UPLINK</span>
        <span style={{ color: "#00f3ff" }}>SECURE</span>
      </StatRow>

      <LogContainer>
        {logs.map((log, i) => (
          <LogLine key={i}>{log}</LogLine>
        ))}
      </LogContainer>
    </HUDContainer>
  );
};
