"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../styles/shared";
import CyberEarth from "./CyberEarth";
import { GodModeHUD } from "./GodModeHUD";
import { motion, AnimatePresence } from "framer-motion";

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
  background: #000;
  /* Brutalist raw border */
  border: 1.5rem solid #ff0055;

  /* Grid pattern overlay */
  background-image: linear-gradient(#00f3ff 1px, transparent 1px),
    linear-gradient(90deg, #00f3ff 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center;

  /* Hard vignette */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, transparent 40%, #000 100%);
    pointer-events: none;
  }
`;

const BrutalTitle = styled.h1`
  font-family: "Impact", "Anton", sans-serif;
  text-transform: uppercase;
  font-size: clamp(4rem, 15vw, 12rem);
  line-height: 0.85;
  color: #000;
  background: #ff0055;
  padding: 1rem 4rem;
  transform: skew(-10deg);
  position: relative;
  z-index: 10;
  /* Hard shadow */
  box-shadow: 1.5rem 1.5rem 0px #00f3ff;

  animation: ${glitchAnim} 0.25s infinite steps(2);
  mix-blend-mode: normal;

  &::before {
    content: "WARNING // UNRESTRICTED ACCESS";
    position: absolute;
    top: -2rem;
    left: 0;
    font-size: 1rem;
    color: #ff0055;
    background: #000;
    padding: 0.2rem 1rem;
    transform: skew(10deg);
    font-family: var(--font-share-tech-mono);
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    box-shadow: 10px 10px 0px #00f3ff;
  }
`;

const BrutalSub = styled.div`
  margin-top: 4rem;
  font-family: "Courier New", monospace;
  font-weight: 900;
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #ff0055;
  background: #000;
  border: 2px solid #ff0055;
  padding: 1rem 3rem;
  z-index: 10;
  letter-spacing: 0.5rem;
  position: relative;

  /* Decorative crosshairs */
  &::before,
  &::after {
    content: "+";
    position: absolute;
    color: #00f3ff;
    font-size: 2rem;
  }
  &::before {
    top: -1.5rem;
    left: -1.5rem;
  }
  &::after {
    bottom: -1.5rem;
    right: -1.5rem;
  }
`;

const FilterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  pointer-events: none;
  backdrop-filter: contrast(1.2) saturate(1.2);
  mix-blend-mode: overlay;
`;

const MatrixCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
  filter: hue-rotate(-110deg) brightness(1.5);
`;

const Ripple = styled(motion.div)`
  position: fixed;
  width: 50px;
  height: 50px;
  border: 2px solid #ff0055; /* Default rejection color */
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
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

      ctx.fillStyle = "#0F0";
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
  const [tapCount, setTapCount] = useState(0);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

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
        osc.frequency.value = 440 * Math.pow(2, (i / 12) * 7);

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
      setTimeout(() => setShowMsg(false), 3000);
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
  }, [godMode]);

  useEffect(() => {
    const timer = setTimeout(() => setTapCount(0), 300);
    return () => clearTimeout(timer);
  }, [tapCount]);

  const addRipple = (x: number, y: number) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  };

  useEffect(() => {
    const handleTap = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).tagName === "A"
      ) {
        return;
      }

      addRipple(e.clientX, e.clientY);

      setTapCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 2) {
          activateGodMode();
          return 0;
        }
        return newCount;
      });
    };

    window.addEventListener("click", handleTap as any);

    return () => {
      window.removeEventListener("click", handleTap as any);
    };
  }, [godMode]);

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
      {/* Click Hint Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <Ripple
            key={r.id}
            initial={{
              opacity: 1,
              scale: 0.5,
              left: r.x,
              top: r.y,
              borderColor: "#ff0055",
            }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>

      {godMode && (
        <>
          <FilterOverlay />
          <MatrixRain />
          <CyberEarth />
          <GodModeHUD />
        </>
      )}

      {showMsg && (
        <MessageOverlay>
          <BrutalTitle>GOD MODE</BrutalTitle>
          <BrutalSub>SYSTEM_OVERRIDE</BrutalSub>
        </MessageOverlay>
      )}
    </>
  );
};

export default KonamiCode;
