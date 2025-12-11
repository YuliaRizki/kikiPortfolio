"use client";

import React, { useState } from "react";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { colors, cyberGrid } from "../styles/shared";

const Section = styled.section`
  min-height: 80vh;
  position: relative;
  background-color: ${colors.darkBg};
  color: #fff;
  padding: 8rem 1rem; /* Increased top padding */
  overflow: hidden;
  ${cyberGrid}
  perspective: 1000px;

  /* Vignette */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      ${colors.darkBg} 90%
    );
    pointer-events: none;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem; /* Increased margin */
  position: relative;
  z-index: 20; /* Higher z-index */
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-family: var(--font-orbitron);
  font-size: clamp(2rem, 5vw, 3rem);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 10px ${colors.neonCyan};
  line-height: 1.2;
  white-space: normal; /* Allow wrap */
  word-wrap: break-word;

  span {
    color: ${colors.neonPurple};
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px; /* Increased height */
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  z-index: 5;
`;

const CarouselTrack = styled(motion.div)`
  position: relative;
  width: 380px; /* Increased width */
  height: 520px; /* Increased height */
  transform-style: preserve-3d;
`;

const Card = styled(motion.div)<{ $index: number; $total: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid ${colors.neonCyan};
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transform-origin: center center;
  cursor: pointer;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: ${colors.neonGreen};
    box-shadow: 0 0 30px rgba(0, 255, 159, 0.4);
    z-index: 100 !important; /* Bring to front on hover */
  }

  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
    filter: grayscale(0.8) contrast(1.2);
    transition: all 0.5s;
  }

  &:hover img {
    filter: grayscale(0) contrast(1);
  }

  h4 {
    color: #fff;
    font-family: var(--font-orbitron);
    margin: 0;
    font-size: 1rem;
    text-align: center;
  }

  p {
    color: ${colors.neonCyan};
    font-family: var(--font-share-tech-mono);
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
  z-index: 10;
  position: relative;
`;

const ControlBtn = styled.button`
  background: transparent;
  border: 1px solid ${colors.neonCyan};
  color: ${colors.neonCyan};
  padding: 1rem 2rem;
  font-family: var(--font-orbitron);
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover {
    background: ${colors.neonCyan};
    color: #000;
    box-shadow: 0 0 20px ${colors.neonCyan};
  }
`;

// Placeholder images from Picsum or colors
const photos = [
  {
    id: 1,
    title: "PREDATOR_V.1",
    desc: "Great White Shark '19",
    src: "/gallery/shark.jpg",
    color: "#ff0055",
  },
  {
    id: 2,
    title: "SHELL_PROTECT",
    desc: "Sea Turtle '19",
    src: "/gallery/turtle.jpg",
    color: "#00ccff",
  },
  {
    id: 3,
    title: "FLORA_SEQ_01",
    desc: "Tulip Sketch '21",
    src: "/gallery/tulips.jpg",
    color: "#cc00ff",
  },
  {
    id: 4,
    title: "BLOOM_CORE",
    desc: "Lotus Study '21",
    src: "/gallery/lotus.jpg",
    color: "#00ff99",
  },
  {
    id: 5,
    title: "ROYAL_BEAST",
    desc: "Lion Portrait '20",
    src: "/gallery/lion.jpg",
    color: "#ffff00",
  },
  {
    id: 6,
    title: "REMOTE_OUTPOST",
    desc: "Unfinished Hut '21",
    src: "/gallery/cabin.jpg",
    color: "#ffaa00",
  },
  {
    id: 7,
    title: "CHAR_STUDY_01",
    desc: "Portrait Sketch '21",
    src: "/gallery/woman_sketch.jpg",
    color: "#ff00aa",
  },
];

// Add SwipeHint styled component
const SwipeHint = styled(motion.div)`
  margin-top: 2rem;
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonCyan};
  font-size: 0.9rem;
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before,
  &::after {
    content: "< >";
    letter-spacing: -2px;
  }
`;

const IntroText = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonGreen};
  font-size: 1.2rem;
  cursor: help;

  span {
    background: ${colors.neonGreen};
    color: #000;
    padding: 2px 8px;
    margin-right: 10px;
  }
`;

const CyberGallery = () => {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 40, damping: 20 });

  const onDragEnd = (event: any, info: any) => {
    const threshold = 20;
    const currentRot = rotation.get();
    const angle = 360 / photos.length;

    if (info.offset.x > threshold) {
      rotation.set(currentRot - angle);
    } else if (info.offset.x < -threshold) {
      rotation.set(currentRot + angle);
    }
  };

  // Handle touch-pad / mouse wheel scroll
  const handleWheel = (e: React.WheelEvent) => {
    // Only capture horizontal scroll to avoid trapping vertical page scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const currentRot = rotation.get();
      rotation.set(currentRot - e.deltaX * 1.5);
    }
  };

  return (
    <Section id="gallery">
      <Header>
        <Title>
          VISUAL <span>LOGS</span>
        </Title>
      </Header>

      <IntroText
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.05, textShadow: `0 0 8px ${colors.neonGreen}` }}
      >
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ display: "inline-block" }}
        >
          <span>SYSTEM_MSG:</span>
        </motion.div>
        "Art is my spirit." (I draw too!)
      </IntroText>

      <div
        onWheel={handleWheel}
        style={{
          perspective: "1200px",
          overflow: "hidden",
          padding: "50px 0",
          cursor: "grab",
        }}
      >
        <CarouselContainer>
          <CarouselTrack
            // Use style for performant motion value animation
            style={{ rotateY: smoothRotation, z: -650 }}
            // Enable dragging
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05} // Stiff elastic feeling
            onDragEnd={onDragEnd}
            whileTap={{ cursor: "grabbing" }}
          >
            {photos.map((photo, index) => {
              const angle = (360 / photos.length) * index;
              return (
                <Card
                  key={photo.id}
                  $index={index}
                  $total={photos.length}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(650px)`, // Increased radius
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#111",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Scanline effect over image */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))",
                        backgroundSize: "100% 2px, 3px 100%",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <h4>{photo.title}</h4>
                  <p>{photo.desc}</p>
                </Card>
              );
            })}
          </CarouselTrack>
        </CarouselContainer>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <SwipeHint
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          SCROLL / DRAG_TO_NAVIGATE
        </SwipeHint>
      </div>
    </Section>
  );
};

export default CyberGallery;
