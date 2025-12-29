"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { colors, cyberGrid } from "../styles/shared";

// --- Styled Components ---

const Container = styled.section`
  min-height: 100vh;
  background-color: transparent;
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
  font-family: var(--font-share-tech-mono), "Courier New", monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* Grid removed */
  /* ${cyberGrid} */

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
      rgba(0, 0, 0, 0.9) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: auto;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  font-family: var(--font-orbitron), sans-serif;
  font-size: clamp(2rem, 8vw, 5rem);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  position: relative;
  text-align: center;
  max-width: 100%;
  padding: 0 10px;

  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);

  @media (max-width: 1024px) {
    font-size: clamp(1.5rem, 6vw, 3rem); /* Smaller on tablets */
    word-break: break-word; /* Break if necessary */
    overflow-wrap: break-word;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    word-break: break-all; /* Aggressive break on mobile */
  }

  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${colors.neonPurple};
    z-index: -1;
    transform: translate(-4px, 4px);
    opacity: 0.7;
    filter: blur(2px);
  }
`;

const Subtitle = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: ${colors.neonCyan};
  letter-spacing: 4px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before,
  &::after {
    content: "";
    width: 50px;
    height: 1px;
    background: ${colors.neonCyan};
    opacity: 0.5;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
  }
`;

// Card Styling
const CardWrapper = styled(motion.div)`
  position: relative;
  height: 350px;
  cursor: pointer;
  perspective: 1000px;
`;

const CardFrame = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(10, 10, 14, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--card-radius);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);

  /* Modern Clip Path for shape */
  clip-path: polygon(
    20px 0,
    100% 0,
    100% calc(100% - 30px),
    calc(100% - 30px) 100%,
    0 100%,
    0 20px
  );

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  /* Hover State for Frame */
  ${CardWrapper}:hover & {
    transform: translateY(-10px);
    border-color: ${colors.neonCyan};
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.2),
      inset 0 0 20px rgba(0, 243, 255, 0.1);
  }

  &::before {
    /* Corner Accent Top Left */
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-top: 2px solid ${colors.neonCyan};
    border-left: 2px solid ${colors.neonCyan};
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  &::after {
    /* Corner Accent Bottom Right */
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: linear-gradient(
      135deg,
      transparent 50%,
      rgba(0, 243, 255, 0.2) 50%
    );
    transition: all 0.3s ease;
  }

  ${CardWrapper}:hover &::before {
    width: 100%;
    height: 100%;
    opacity: 0.1;
    border: 1px solid ${colors.neonCyan};
    border-bottom: none;
    border-right: none;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.2) brightness(0.8);
    transition: all 0.5s ease;
    transform: scale(1.05);
  }

  /* Scanline Effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${colors.neonCyan};
    box-shadow: 0 0 10px ${colors.neonCyan};
    opacity: 0;
    z-index: 10;
  }

  ${CardWrapper}:hover & {
    img,
    video {
      filter: grayscale(0%) contrast(1) brightness(1);
      transform: scale(1);
    }

    &::after {
      opacity: 0.5;
      animation: scanDown 2s linear infinite;
    }
  }

  @keyframes scanDown {
    0% {
      top: 0%;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      top: 100%;
      opacity: 0;
    }
  }
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(10, 10, 14, 0.9) 90%,
    rgba(10, 10, 14, 1) 100%
  );
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  transition: all 0.4s ease;
`;

const ProjectIndex = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-orbitron);
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  z-index: 5;

  ${CardWrapper}:hover & {
    color: ${colors.neonCyan};
    text-shadow: 0 0 10px ${colors.neonCyan};
  }
`;

const ProjectTitle = styled.h3`
  font-family: var(--font-orbitron);
  font-size: 1.4rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${CardWrapper}:hover & {
    transform: translateY(0);
    color: ${colors.neonCyan};
  }
`;

const ProjectDescription = styled.p`
  color: #aaa;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease 0.1s;
  height: 0;
  overflow: hidden;

  ${CardWrapper}:hover & {
    opacity: 1;
    transform: translateY(0);
    height: auto;
    max-height: 100px; /* Limit height for transition */
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: all 0.4s ease 0.2s;
  opacity: 0.8;

  ${CardWrapper}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Tag = styled.span`
  font-size: 0.75rem;
  color: ${colors.neonCyan};
  border: 1px solid rgba(0, 243, 255, 0.3);
  background: rgba(0, 243, 255, 0.05);
  padding: 4px 10px;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${colors.neonCyan};
    color: #000;
  }
`;

const ActionRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(20px);
  transition: all 0.4s ease 0.3s;

  ${CardWrapper}:hover & {
    height: auto;
    opacity: 1;
    transform: translateY(0);
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.neonPurple};
  color: ${colors.neonPurple};
  padding: 8px 16px;
  font-family: var(--font-share-tech-mono);
  font-size: 0.8rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${colors.neonPurple};
    color: #fff;
    box-shadow: 0 0 15px ${colors.neonPurple};
  }

  &.primary {
    border-color: ${colors.neonCyan};
    color: ${colors.neonCyan};

    &:hover {
      background: ${colors.neonCyan};
      color: #000;
      box-shadow: 0 0 15px ${colors.neonCyan};
    }
  }
`;

// Media Modal
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  max-width: 95vw;
  max-height: 90vh;
  position: relative;
  border: 1px solid ${colors.neonCyan};
  background: #000;
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.1);

  img,
  video {
    max-width: 100%;
    max-height: 85vh;
    display: block;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-family: var(--font-orbitron);
  letter-spacing: 2px;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    color: ${colors.neonCyan};
    text-shadow: 0 0 10px ${colors.neonCyan};
  }
`;

// Data
const projects = [
  {
    id: 1,
    title: "Experience East Lombok",
    description:
      "Local Government Hospitality Website of East Lombok, Indonesia.",
    tags: ["Nextjs", "Tailwind", "TypeScript", "Tourism"],
    mediaType: "video",
    src: "/screen.mp4",
  },
  {
    id: 2,
    title: "MediLoop",
    description:
      "AI-driven health analysis platform delivering personalized medical and wellness recommendations.",
    tags: ["React", "AI", "Health"],
    mediaType: "image",
    thumbnails: ["/mediloopHome.jpg", "/mediloopHome1.jpg"],
  },
  {
    id: 3,
    title: "Ivory Ella",
    description:
      "Premium e-commerce clothing line clone with dynamic galleries and seamless checkout.",
    tags: ["E-Commerce", "Web", "Clone"],
    mediaType: "video",
    src: "/ivoryEllaDemo.mp4",
  },
  {
    id: 4,
    title: "AI-Interior",
    description:
      "Transform vacant spaces into designed rooms using Generative AI and Replicate API.",
    tags: ["Gen AI", "Redux", "SaaS"],
    mediaType: "image",
    thumbnails: ["/roomAI.jpg"],
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
        <Title data-text="SYSTEM_PROJECTS">SYSTEM_PROJECTS</Title>
        <Subtitle>
          <span>{"//"} DEPLOYED_MODULES</span>
        </Subtitle>
      </Header>

      <Grid>
        {projects.map((project, index) => (
          <CardWrapper
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <CardFrame>
              <ProjectIndex>0{index + 1}</ProjectIndex>

              <ImageContainer>
                {project.mediaType === "video" && project.src ? (
                  <video autoPlay loop muted playsInline>
                    <source src={project.src} type="video/mp4" />
                  </video>
                ) : project.mediaType === "image" && project.thumbnails ? (
                  <img src={project.thumbnails[0]} alt={project.title} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#0a0a0a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      color: "#333",
                    }}
                  >
                    <span style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                      ⚠️
                    </span>
                    <span
                      style={{ fontFamily: "monospace", letterSpacing: "2px" }}
                    >
                      NO_SIGNAL
                    </span>
                  </div>
                )}
              </ImageContainer>

              <ContentOverlay>
                <ProjectTitle>{project.title}</ProjectTitle>
                <TagsContainer>
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsContainer>

                <ProjectDescription>{project.description}</ProjectDescription>

                {(project.mediaType !== "none" || project.thumbnails) && (
                  <ActionRow>
                    {project.mediaType === "video" && (
                      <ActionButton
                        className="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(project.src || null);
                        }}
                      >
                        ▶ Initialize Demo
                      </ActionButton>
                    )}
                    {project.thumbnails && (
                      <ActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(project.thumbnails?.[0] || null);
                        }}
                      >
                        View Schematics
                      </ActionButton>
                    )}
                  </ActionRow>
                )}
              </ContentOverlay>
            </CardFrame>
          </CardWrapper>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedMedia && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalClose onClick={() => setSelectedMedia(null)}>
                [ DISCONNECT_TERMINAL ]
              </ModalClose>
              {selectedMedia.endsWith(".mp4") ? (
                <video
                  controls
                  autoPlay
                  src={selectedMedia}
                  style={{ width: "100%" }}
                />
              ) : (
                <img src={selectedMedia} alt="Project Preview" />
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default MyProjects;
