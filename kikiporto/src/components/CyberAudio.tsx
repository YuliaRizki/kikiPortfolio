"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { colors } from "../styles/shared";

const playTone = (
  freq: number,
  type: OscillatorType,
  duration: number,
  vol: number = 0.1
) => {
  if (typeof window === "undefined") return;

  const AudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
};

const AudioToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
  width: 40px;
  height: 40px;
  border: 1px solid ${colors.neonCyan};
  background: rgba(0, 0, 0, 0.8);
  color: ${colors.neonCyan};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px ${colors.neonCyan};
    transform: scale(1.1);
  }

  &.muted {
    border-color: #555;
    color: #555;
  }
`;

const CyberAudio = () => {
  const [muted, setMuted] = useState(true); 
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (muted) return;

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        playTone(400, "sine", 0.1, 0.05); 
      }
    };

    const handleClick = () => {
      playTone(150, "square", 0.15, 0.1); 
      playTone(600, "sawtooth", 0.05, 0.05); 
    };

    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [muted]);

  const toggleMute = () => {
    setMuted(!muted);
    setHasInteracted(true);
    if (muted) {
      playTone(880, "sine", 0.1);
    }
  };

  return (
    <AudioToggle
      onClick={toggleMute}
      className={muted ? "muted" : ""}
      title={muted ? "Enable Cyber Audio" : "Mute System Audio"}
    >
      {muted ? "🔇" : "🔊"}
    </AudioToggle>
  );
};

export default CyberAudio;
