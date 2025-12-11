"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { colors } from "../styles/shared";

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid ${colors.neonCyan};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: ${colors.neonCyan};
  }

  /* Crosshair lines */
  &::before {
    width: 2px;
    height: 100%;
  }
  &::after {
    width: 100%;
    height: 2px;
  }
`;

const CyberCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleLinkHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleLinkHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Use event delegation for hover detection
    document.addEventListener("mouseover", handleLinkHoverStart);
    document.addEventListener("mouseout", handleLinkHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleLinkHoverStart);
      document.removeEventListener("mouseout", handleLinkHoverEnd);
    };
  }, [cursorX, cursorY]);

  return (
    <CursorRing
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        rotate: isHovering ? 45 : 0,
        borderColor: isClicking
          ? colors.neonGreen
          : isHovering
          ? colors.neonPurple
          : colors.neonCyan,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        style={{
          width: "4px",
          height: "4px",
          background: colors.neonCyan,
          borderRadius: "50%",
        }}
      />
    </CursorRing>
  );
};

export default CyberCursor;
