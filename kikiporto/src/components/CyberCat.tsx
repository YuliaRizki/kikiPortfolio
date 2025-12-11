"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../styles/shared";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const tailWag = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

// --- Styled Components ---
const CatWrapper = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  z-index: 999;
  cursor: pointer;
  pointer-events: auto;

  @media (max-width: 768px) {
    display: none; /* Hide on mobile to save screen space */
  }
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  bottom: 110px;
  right: 0;
  background: rgba(10, 10, 12, 0.9);
  border: 1px solid ${colors.neonGreen};
  padding: 10px 15px;
  border-radius: 8px 8px 0 8px;
  color: ${colors.neonGreen};
  font-family: var(--font-share-tech-mono), monospace;
  font-size: 0.8rem;
  white-space: nowrap;
  box-shadow: 0 0 10px rgba(0, 255, 159, 0.2);

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    right: 10px;
    width: 10px;
    height: 10px;
    background: inherit;
    border-right: 1px solid ${colors.neonGreen};
    border-bottom: 1px solid ${colors.neonGreen};
    transform: rotate(45deg);
  }
`;

const CatSVG = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 5px ${colors.neonPurple});
  overflow: visible;

  .body {
    fill: rgba(15, 15, 20, 0.9);
    stroke: ${colors.neonPurple};
    stroke-width: 2;
  }

  .eyes {
    fill: ${colors.neonCyan};
    animation: blink 4s infinite;
  }

  .tail {
    stroke: ${colors.neonPurple};
    stroke-width: 2;
    fill: none;
    transform-origin: bottom left;
    animation: ${tailWag} 3s ease-in-out infinite;
  }

  @keyframes blink {
    0%,
    96%,
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
    98% {
      opacity: 0.5;
      transform: scaleY(0.1);
    }
  }
`;

const CyberCat = () => {
  const [message, setMessage] = useState("");
  const [isInteracting, setIsInteracting] = useState(false);

  // Random idle messages
  const idleMessages = [
    "Scanning parameters...",
    "Purr_otocol initiated.",
    "Hunting digital bugs...",
    "System warmth: 100%",
    "Meow.exe running...",
    "Need cyber-treats.",
    "Watching you code...",
  ];

  // Random interaction messages
  const clickMessages = [
    "Prrr... Data saving...",
    "Don't touch the wires!",
    "System: HAPPY",
    "Tail_Wag.js executed",
    "Access granted: Headpat",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteracting) {
        // 20% chance to speak every 8 seconds
        if (Math.random() > 0.7) {
          const randomMsg =
            idleMessages[Math.floor(Math.random() * idleMessages.length)];
          setMessage(randomMsg);
          setTimeout(() => setMessage(""), 3000);
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isInteracting]);

  const handleClick = () => {
    setIsInteracting(true);
    const randomMsg =
      clickMessages[Math.floor(Math.random() * clickMessages.length)];
    setMessage(randomMsg);

    // Reset interaction state
    setTimeout(() => {
      setMessage("");
      setIsInteracting(false);
    }, 2500);
  };

  return (
    <CatWrapper
      drag
      dragConstraints={{ left: -300, right: 0, top: -500, bottom: 0 }}
      whileHover={{ scale: 1.1 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      onClick={handleClick}
    >
      <AnimatePresence>
        {message && (
          <SpeechBubble
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
          >
            {message}
          </SpeechBubble>
        )}
      </AnimatePresence>

      <CatSVG viewBox="0 0 100 100">
        {/* Simple Cyber Cat Design */}
        {/* Tail */}
        <path className="tail" d="M80 80 Q95 50 85 30" />

        {/* Body */}
        <path
          className="body"
          d="M20 90 L80 90 L85 60 L70 40 L30 40 L15 60 Z"
        />

        {/* Head */}
        <path
          className="body"
          d="M30 45 L70 45 L80 25 L65 20 L50 30 L35 20 L20 25 Z"
        />

        {/* Ears (accented) */}
        <path
          d="M20 25 L30 10 L40 25"
          fill="none"
          stroke={colors.neonCyan}
          strokeWidth="2"
        />
        <path
          d="M60 25 L70 10 L80 25"
          fill="none"
          stroke={colors.neonCyan}
          strokeWidth="2"
        />

        {/* Eyes */}
        <rect className="eyes" x="35" y="30" width="8" height="6" rx="2" />
        <rect className="eyes" x="57" y="30" width="8" height="6" rx="2" />

        {/* Whiskers */}
        <path
          d="M25 50 L10 45 M25 55 L10 55 M25 60 L10 65"
          stroke={colors.neonGreen}
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M75 50 L90 45 M75 55 L90 55 M75 60 L90 65"
          stroke={colors.neonGreen}
          strokeWidth="1"
          opacity="0.6"
        />
      </CatSVG>
    </CatWrapper>
  );
};

export default CyberCat;
