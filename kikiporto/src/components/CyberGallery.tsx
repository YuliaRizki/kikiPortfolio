"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import { colors, cyberGrid } from "../styles/shared";

const Section = styled.section`
  min-height: 100vh;
  position: relative;
  background-color: transparent;
  color: #fff;
  padding: 8rem 1rem;
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

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    min-height: auto;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
  z-index: 20;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
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
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  z-index: 5;

  /* Define radius variable */
  --carousel-radius: 650px;

  @media (max-width: 768px) {
    height: 400px;
    --carousel-radius: 260px; /* Smaller radius for mobile */
  }
`;

const CarouselTrack = styled(motion.div)`
  position: relative;
  width: 380px;
  height: 520px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
  }
`;

const Card = styled.div<{ $index: number; $total: number }>`
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

const SwipeHint = styled.div`
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

const IntroText = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
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

const SwipeWrapper = styled(motion.div)`
  perspective: 1200px;
  width: 100%;
  height: 600px;
  position: relative;
  cursor: grab;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    height: 400px; /* Reduced height to remove unused space */
    padding-bottom: 2rem;
  }
`;

const SwipeHintContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: -2rem;
  }
`;

const CyberGallery = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate effect (Continuous)
  useAnimationFrame((time, delta) => {
    if (!autoplay) return;
    const current = rotation.get();
    // 10 degrees per second
    rotation.set(current - (delta / 1000) * 10);
  });

  const onDragStart = () => {
    setAutoplay(false);
  };

  const onDragEnd = () => {
    setAutoplay(true);
  };

  const handleDrag = (_: any, info: any) => {
    const current = rotation.get();
    // Adjust sensitivity as needed
    rotation.set(current + info.delta.x * 0.4);
  };

  if (!isMounted) return null;

  return (
    <Section id="gallery">
      <Header>
        <Title>
          VISUAL <span>LOGS</span>
        </Title>
      </Header>

      <IntroText>
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
        &quot;Art is my spirit.&quot; (I draw too!)
      </IntroText>

      {/* Swipe Area */}
      <SwipeWrapper
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
        onPan={(event, info) => {
          // Manually update rotation based on pan delta
          const current = rotation.get();
          rotation.set(current + info.delta.x * 0.6); // Slightly improved sensitivity
        }}
        onWheel={(e) => {
          // Allow trackpad horizontal scrolling to rotate carousel
          // Check if scrolling horizontally largely
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            const current = rotation.get();
            // Invert deltaX for natural feel (swipe left to move right) or standard (swipe left to move left)
            // Usually e.deltaX > 0 means scrolling right.
            rotation.set(current - e.deltaX * 0.5);
          }
        }}
        onPanStart={() => setAutoplay(false)}
        onPanEnd={() => setAutoplay(true)}
      >
        <CarouselContainer style={{ pointerEvents: "none" }}>
          {" "}
          {/* Container ignores clicks, passes to parent */}
          <div
            style={{
              transform: "translateZ(calc(-1 * var(--carousel-radius)))",
              transformStyle: "preserve-3d",
              pointerEvents: "auto", // Re-enable pointer events for children if needed (e.g. clicking a card)
            }}
          >
            <CarouselTrack style={{ rotateY: smoothRotation }}>
              {photos.map((photo, index) => {
                const angle = (360 / photos.length) * index;
                return (
                  <Card
                    key={photo.id}
                    $index={index}
                    $total={photos.length}
                    onClick={(e) => {
                      e.stopPropagation(); // Allow clicking card without triggering pan issues if needed
                    }}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius))`,
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
                        draggable={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          userSelect: "none", // Prevent selection
                          pointerEvents: "none", // Allow clicks to pass through to Card or parent
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
          </div>
        </CarouselContainer>
      </SwipeWrapper>

      <SwipeHintContainer>
        <SwipeHint>SCROLL / DRAG_TO_NAVIGATE</SwipeHint>
      </SwipeHintContainer>
    </Section>
  );
};

export default CyberGallery;
