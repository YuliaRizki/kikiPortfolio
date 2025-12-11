"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/shared";
import CyberEarth from "./CyberEarth";

const MessageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Courier New", monospace;
  font-size: 2rem;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.8);
  color: ${colors.neonGreen};
`;

const FilterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  backdrop-filter: hue-rotate(90deg) contrast(1.2);
`;

const KonamiCode = () => {
  const [input, setInput] = useState<string[]>([]);
  const [godMode, setGodMode] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  // Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const sequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKey = e.code;

      setInput((prev) => {
        const updated = [...prev, newKey];
        if (updated.length > sequence.length) updated.shift();

        if (JSON.stringify(updated) === JSON.stringify(sequence)) {
          activateGodMode();
          return [];
        }
        return updated;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activateGodMode = () => {
    if (godMode) {
      // Toggle off if already on? Or just re-trigger?
      // Let's allow toggling off
      setGodMode(false);
      return;
    }

    setGodMode(true);
    setShowMsg(true);

    // Play sound
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.frequency.value = 880;
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        osc2.frequency.value = 1760;
        osc2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.5);
      }, 150);
    }

    setTimeout(() => setShowMsg(false), 3000);
  };

  return (
    <>
      {godMode && (
        <>
          <FilterOverlay />
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10000,
              pointerEvents: "none",
            }}
          >
            <CyberEarth />
          </div>
        </>
      )}
      {showMsg && (
        <MessageOverlay>
          <h1 style={{ textShadow: "0 0 20px #0f0" }}>GOD MODE ACTIVATED</h1>
          <p>System Privileges: ESCALATED</p>
        </MessageOverlay>
      )}
    </>
  );
};

export default KonamiCode;
