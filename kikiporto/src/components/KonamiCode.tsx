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
  color: ${colors.neonGreen};

  h1 {
    text-shadow: 0 0 20px ${colors.neonGreen}, 0 0 40px ${colors.neonGreen};
    animation: ${glitchAnim} 0.2s infinite;
  }

  p {
    font-size: 1.5rem;
    color: #fff;
    margin-top: 1rem;
    letter-spacing: 4px;
  }
`;

const FilterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  backdrop-filter: hue-rotate(90deg) contrast(1.2); /* Removed brightness dimming */
  mix-blend-mode: overlay; /* Blend nicely with content */
`;

const MatrixCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998; /* Behind the filter overlay layer for style */
  pointer-events: none;
  opacity: 0.15; /* Subtle code rain */
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

      ctx.fillStyle = "#0F0"; // Green text
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
      return;
    }

    setGodMode(true);
    setShowMsg(true);
    playSound();

    setTimeout(() => setShowMsg(false), 3000);
  };

  return (
    <>
      {godMode && (
        <>
          <FilterOverlay />
          <MatrixRain />
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
