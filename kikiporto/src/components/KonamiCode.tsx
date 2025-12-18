"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../styles/shared";
import CyberEarth from "./CyberEarth";

const glitchAnim = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

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
  font-size: 3rem;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.85);
  color: var(--neon-cyan);

  h1 {
    font-family: "Impact", "Anton", sans-serif;
    text-transform: uppercase;
    font-size: 5rem;
    letter-spacing: 10px;
    border: 6px solid var(--neon-cyan); /* Theme color */
    padding: 20px 40px;
    background: #000;
    text-shadow: 4px 4px 0 var(--neon-purple);
    animation: ${glitchAnim} 0.2s infinite;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 2rem;
      padding: 10px 20px;
      letter-spacing: 4px;
      border-width: 3px;
    }
  }

  p {
    font-family: "Fira Code", monospace;
    font-size: 1.5rem;
    color: #fff;
    margin-top: 2rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: var(--neon-purple);
    color: #000;
    padding: 5px 10px;
    font-weight: bold;
  }
`;

const FilterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999; /* Lowered from 9999 to allow important modals, but still high for overlay effect */
  pointer-events: none;
  backdrop-filter: contrast(1.2) saturate(1.2); /* Slightly toned down filter */
  mix-blend-mode: overlay;
`;

const MatrixCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Background level */
  pointer-events: none;
  opacity: 0.6; /* Increased opacity for visibility */
  filter: hue-rotate(-110deg) brightness(1.5); /* Boost brightness */
`;

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Green text base (will be shifted by CSS filter)
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <MatrixCanvas ref={canvasRef} />;
};

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

  const playSound = () => {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();

      // Arpeggio
      [0, 0.1, 0.2, 0.3].forEach((delay, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? "square" : "sawtooth";
        osc.frequency.value = 440 * Math.pow(2, (i / 12) * 7); // Pentatonic-ish climb

        gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + delay + 0.5
        );

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.5);
      });
    }
  };

  const activateGodMode = () => {
    if (godMode) {
      setGodMode(false);
      setShowMsg(false);
    } else {
      playSound();
      setGodMode(true);
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000); // 3 seconds message
    }
  };

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
  }, [godMode]); // Added godMode dependency for safety

  // --- Mobile/Desktop Trigger (2 Taps) ---
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    // Reset tap count if no second tap happens quickly
    const timer = setTimeout(() => setTapCount(0), 300);
    return () => clearTimeout(timer);
  }, [tapCount]);

  useEffect(() => {
    const handleTap = (e: Event) => {
      // Ignore if clicking on interactive elements
      if (
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).tagName === "A"
      ) {
        return;
      }

      setTapCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 2) {
          activateGodMode();
          return 0; // Reset after activation
        }
        return newCount;
      });
    };

    // Attach to click event for broad compatibility (mobile + desktop)
    window.addEventListener("click", handleTap);

    return () => {
      window.removeEventListener("click", handleTap);
    };
  }, [godMode]); // Added godMode dependency to ensure latest state access if needed

  // God Mode Class Injector
  useEffect(() => {
    if (godMode) {
      document.body.classList.add("god-mode");
    } else {
      document.body.classList.remove("god-mode");
    }
  }, [godMode]);

  return (
    <>
      {godMode && (
        <>
          <FilterOverlay />
          <MatrixRain />
          <CyberEarth />
        </>
      )}

      {showMsg && (
        <MessageOverlay>
          <h1>GOD MODE ACTIVATED</h1>
          <p>ROOT_ACCESS_GRANTED</p>
        </MessageOverlay>
      )}
    </>
  );
};

export default KonamiCode;
