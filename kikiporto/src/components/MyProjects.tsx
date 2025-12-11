"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { colors, animations, cyberGrid } from "../styles/shared";

// --- Styled Components ---

const Container = styled.section`
  min-height: 100vh;
  background-color: ${colors.darkBg};
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  font-family: var(--font-share-tech-mono), "Courier New", monospace;

  /* Cyber Grid Background */
  ${cyberGrid}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      transparent 0%,
      ${colors.darkBg} 85%
    );
    pointer-events: none;
  }
  /* Media Queries */
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    padding-bottom: 8rem; /* Extra padding for bottom navbar */
    background-size: 20px 20px;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-family: var(--font-orbitron), sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 6px;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  text-shadow: 2px 0 ${colors.neonPurple}, -2px 0 ${colors.neonCyan};

  &::after {
    content: "SYSTEM_PROJECTS_LOADED";
    display: block;
    font-size: 1rem;
    color: ${colors.neonCyan};
    letter-spacing: 2px;
    margin-top: 0.5rem;
    font-family: var(--font-share-tech-mono), monospace;
    opacity: 0.8;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 2rem;
    padding: 0 1rem;
  }
`;

// Card Styling
const CardWrapper = styled(motion.div)`
  position: relative;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;

  &:hover {
    z-index: 10;
  }
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: ${colors.cardBg};
  border: 1px solid rgba(0, 243, 255, 0.2);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  /* Angled corners (bottom-right cut) */
  clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);

  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  box-shadow: 0 0 15px rgba(0, 243, 255, 0.05);

  ${CardWrapper}:hover & {
    border-color: ${colors.neonCyan};
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
    transform: translateY(-5px);
  }

  &::before {
    /* Scanline overlay */
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 243, 255, 0.05) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 2;
  }
`;

const CardDecor = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    background: #333;
    border-radius: 50%;

    &.active {
      background: ${colors.neonGreen};
      box-shadow: 0 0 5px ${colors.neonGreen};
      animation: ${animations.flicker} 2s infinite;
    }
  }
`;

const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  padding-bottom: 3rem; // Compensate for clip path
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0));
  z-index: 5;
  transform: translateY(20px);
  transition: transform 0.3s ease;

  ${CardWrapper}:hover & {
    transform: translateY(0);
  }
`;

const ProjectName = styled.h3`
  font-family: var(--font-orbitron), sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: ">";
    color: ${colors.neonCyan};
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  ${CardWrapper}:hover &::before {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ProjectDesc = styled.div`
  color: #a0a0a0;
  font-size: 0.9rem;
  line-height: 1.5;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s ease;

  ${CardWrapper}:hover & {
    max-height: 150px;
    opacity: 1;
    margin-top: 1rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const TechBadge = styled.span`
  font-size: 0.7rem;
  color: ${colors.neonCyan};
  border: 1px solid ${colors.neonCyan};
  padding: 2px 6px;
  text-transform: uppercase;
  background: rgba(0, 243, 255, 0.1);
  opacity: 0.8;
`;

const IndexNumber = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  font-family: var(--font-orbitron);
  font-size: 3rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  z-index: 1;
  pointer-events: none;
`;

const MediaContainer = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
  position: relative;
  background: #000;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    transition: all 0.5s ease;
    filter: grayscale(80%) hue-rotate(180deg) brightness(0.8);
  }

  ${CardWrapper}:hover img, ${CardWrapper}:hover video {
    opacity: 1;
    filter: grayscale(0%) hue-rotate(0deg) brightness(1);
    transform: scale(1.1);
  }
`;

// Overlay Modal for Media
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  border: 1px solid ${colors.neonCyan};
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.2);
  background: #000;
  position: relative;

  /* Corner accents */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    width: 20px;
    height: 20px;
    border-top: 2px solid ${colors.neonGreen};
    border-left: 2px solid ${colors.neonGreen};
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid ${colors.neonGreen};
    border-right: 2px solid ${colors.neonGreen};
  }

  img,
  video {
    max-width: 100%;
    max-height: 85vh;
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: ${colors.neonCyan};
  font-family: var(--font-orbitron);
  font-size: 1.2rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    color: #fff;
    text-shadow: 0 0 10px ${colors.neonCyan};
  }
`;

// Data
const projects = [
  {
    id: 1,
    title: "MediLoop",
    description:
      "Health platform offering personalized medical and wellness recommendations through AI-driven analysis.",
    tags: ["React", "AI", "Health"],
    mediaType: "image",
    thumbnails: ["/mediloopHome.jpg", "/mediloopHome1.jpg"],
  },
  {
    id: 2,
    title: "Ivory Ella",
    description:
      "E-commerce inspired clothing line clone. Features dynamic product galleries and seamless checkout flow.",
    tags: ["E-Commerce", "Web", "Clone"],
    mediaType: "video",
    src: "/ivoryEllaDemo.mp4",
  },
  {
    id: 3,
    title: "AI-Interior",
    description:
      "Transforms vacant room images into personalized designs using Replicate AI. Built with ReactJS, Redux, and Tailwind CSS.",
    tags: ["Generative AI", "Redux", "SaaS"],
    mediaType: "image",
    thumbnails: ["/roomAI.jpg"],
  },
  {
    id: 4,
    title: "HackGram",
    description:
      "Full-featured Instagram clone for mobile and web. Includes story sharing, filters, and real-time messaging.",
    tags: ["Social", "Mobile", "Web"],
    mediaType: "none", // Placeholder
  },
  {
    id: 5,
    title: "RPS Battle",
    description:
      "Pokémon-themed multiplayer rock-paper-scissors game. Real-time sockets, PostgreSQL backend, and AWS hosting.",
    tags: ["GameDev", "Socket.IO", "AWS"],
    mediaType: "none",
  },
  {
    id: 6,
    title: "Super Vakir",
    description:
      "Interactive restaurant menu with cart functionality. Pure Vanilla JS DOM manipulation showcase.",
    tags: ["Vanilla JS", "DOM", "CRUD"],
    mediaType: "none",
  },
];

const MyProjects = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  return (
    <Container id="projects">
      <Header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Title>Projects Pool</Title>
      </Header>

      <Grid>
        {projects.map((project, index) => (
          <CardWrapper
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CardContent>
              <CardDecor>
                <span />
                <span className="active" />
                <span />
              </CardDecor>

              <IndexNumber>{`0${index + 1}`}</IndexNumber>

              <MediaContainer>
                {project.mediaType === "video" && (
                  <video autoPlay loop muted playsInline>
                    <source src={project.src} type="video/mp4" />
                  </video>
                )}
                {project.mediaType === "image" && project.thumbnails && (
                  // Show first image as preview
                  <img src={project.thumbnails[0]} alt={project.title} />
                )}
                {project.mediaType === "none" && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(45deg, #111, #222)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#333",
                      fontFamily: "monospace",
                    }}
                  >
                    [NO_SIGNAL]
                  </div>
                )}
              </MediaContainer>

              <ProjectInfo>
                <ProjectName>{project.title}</ProjectName>

                <TechStack>
                  {project.tags.map((tag) => (
                    <TechBadge key={tag}>{tag}</TechBadge>
                  ))}
                </TechStack>

                <ProjectDesc>
                  {project.description}

                  {/* Action Buttons for Media */}
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    {project.mediaType === "video" && (
                      <TechBadge
                        as="button"
                        style={{
                          cursor: "pointer",
                          background: colors.neonPurple,
                          color: "#fff",
                          border: "none",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(project.src || "");
                        }}
                      >
                        WATCH DEMO
                      </TechBadge>
                    )}
                    {project.thumbnails?.map((src, i) => (
                      <TechBadge
                        as="button"
                        key={i}
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          borderColor: colors.neonGreen,
                          color: colors.neonGreen,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(src);
                        }}
                      >
                        VIEW IMG {i + 1}
                      </TechBadge>
                    ))}
                  </div>
                </ProjectDesc>
              </ProjectInfo>
            </CardContent>
          </CardWrapper>
        ))}
      </Grid>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedMedia(null)}>
                [CLOSE TERMINAL]
              </CloseButton>
              {selectedMedia.endsWith(".mp4") ? (
                <video
                  controls
                  autoPlay
                  src={selectedMedia}
                  style={{ width: "100%" }}
                />
              ) : (
                <img src={selectedMedia} alt="Preview" />
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default MyProjects;
