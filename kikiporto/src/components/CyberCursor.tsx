"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { colors } from "../styles/shared";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
  mix-blend-mode: difference;
`;

const Scope = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid ${colors.neonCyan};
  border-radius: 50%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%); /* Center on cursor */

  /* Crosshair lines */
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: ${colors.neonCyan};
  }

  &::before {
    width: 100%;
    height: 1px;
  }

  &::after {
    width: 1px;
    height: 100%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const DataLabel = styled(motion.div)`
  position: absolute;
  top: -40px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${colors.neonGreen};
  padding: 5px 10px;
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonGreen};
  font-size: 0.7rem;
  white-space: nowrap;
  pointer-events: none;
`;

const LockOnRing = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px dashed ${colors.neonPurple};
  border-radius: 50%;
  opacity: 0.8;
  pointer-events: none;
`;

const CyberCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetLabel, setTargetLabel] = useState("");

  // Smooth spring animation for cursor
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check for hover targets
      const target = e.target as HTMLElement;
      const clickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea");

      if (clickable) {
        setIsHovering(true);
        const tagName = clickable.tagName.toLowerCase();
        setTargetLabel(tagName === "a" ? "LINK_DETECTED" : "INTERACTABLE");
      } else {
        setIsHovering(false);
        setTargetLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <Container>
      <Scope
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isHovering ? 1.5 : 1, rotate: isHovering ? 45 : 0 }}
      >
        {isHovering && (
          <LockOnRing
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{
              rotate: { repeat: Infinity, duration: 4, ease: "linear" },
              scale: { repeat: Infinity, duration: 1 },
            }}
          />
        )}
      </Scope>
      {isHovering && (
        <DataLabel
          style={{ x: cursorX, y: cursorY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          TARGET: {targetLabel}
          <br />
          X:{Math.round(mousePosition.x)} Y:{Math.round(mousePosition.y)}
        </DataLabel>
      )}
    </Container>
  );
};

export default CyberCursor;
