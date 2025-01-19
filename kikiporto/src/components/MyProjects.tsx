"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const ProjectsContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #00ff9f;
  padding: 2rem;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Orbitron", sans-serif;
`;

const Timeline = styled.div`
  position: relative;
  width: 2px;
  background: #00ff9f;
  height: 100%;
  margin: 2rem 0;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin: 2rem 0;
  padding-left: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: #00ff9f;
    border-radius: 50%;
  }

  &:hover .project-preview {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ProjectPreview = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  background: #1a1a1a;
  color: #fff;
  border: 2px solid #00ff9f;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: "Orbitron", sans-serif;
  color: #00ff9f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectDescription = styled.p`
  color: #ccc;
`;

const projects = [
  {
    id: 1,
    title: "MediLoop",
    description:
      "MediLoop is a health platform that offers personalized medical and wellness recommendations",
  },
  {
    id: 2,
    title: "Ivory Ella",
    description:
      "A web based e-commerce inspired clothing line called Ivory-Ella. (Ivory-Ella Clone)",
  },
  { id: 3, title: "AI-Interior Design", description: "An interior design platform that transforms vacant room images into personalized designs using user prompts. Built with ReactJS, Redux, and Tailwind CSS, it integrates Google OAuth for login, Multer and Cloudinary for image uploads, and Replicate AI for generating designs. Powered by an Express.js backend with PostgreSQL, it leverages AWS, Vercel, and Framer Motion for seamless performance and interactivity." },
  { id: 4, title: "HackGram", description: "A mobile and web based application (Instagram Clone)" },
  { id: 5, title: "RPS Battle Card Game", description: "A Pokémon-themed rock-paper-scissors game built with ReactJS and Tailwind CSS, featuring real-time multiplayer via Socket.IO, an Express.js backend with PostgreSQL, and secure hosting through AWS and Firebase." },
  { id: 6, title: "Super Vakir", description: "A web app for displaying restaurant menus with a built-in cart, offering smooth CRUD operations and dynamic interactivity using JavaScript DOM. Easily add, update, or remove items for a seamless experience." },
];

const MyProjects = () => {
  function removeChild(overlay: HTMLDivElement) {
    throw new Error("Function not implemented.");
  }

  return (
    <ProjectsContainer>
      <ProjectsTitle>My Projects</ProjectsTitle>
      <Timeline>
        {projects.map((project) => (
          <TimelineItem
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: project.id * 0.2 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectPreview
              className="project-preview"
              style={{
                left: project.id % 2 === 0 ? "2rem" : "calc(-300px - 2rem)", // Alternate sides
              }}
            >
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              {project.id === 1 && (
                <div className="flex flex-wrap gap-2">
                  <img
                    src="/mediloopHome.jpg"
                    alt={project.title}
                    className="w-[48%] h-auto object-cover rounded-lg cursor-pointer"
                    onClick={(e) => {
                      const overlay = document.createElement("div");
                      overlay.style.cssText = `
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0,0,0,0.9);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 1000;
                  cursor: pointer;
                  `;
                      const img = document.createElement("img");
                      img.src = "/mediloopHome.jpg";
                      img.style.cssText =
                        "max-width: 90vw; max-height: 90vh; border-radius: 8px;";
                      overlay.appendChild(img);
                      overlay.onclick = () =>
                        document.body.removeChild(overlay);
                      document.body.appendChild(overlay);
                    }}
                  />
                  <img
                    src="/mediloopHome1.jpg"
                    alt={`${project.title} additional`}
                    className="w-[48%] h-auto object-cover rounded-lg cursor-pointer"
                    onClick={(e) => {
                      const overlay = document.createElement("div");
                      overlay.style.cssText = `
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0,0,0,0.9);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 1000;
                  cursor: pointer;
                  `;
                      const img = document.createElement("img");
                      img.src = "/mediloopHome1.jpg";
                      img.style.cssText =
                        "max-width: 90vw; max-height: 90vh; border-radius: 8px;";
                      overlay.appendChild(img);
                      overlay.onclick = () =>
                        document.body.removeChild(overlay);
                      document.body.appendChild(overlay);
                    }}
                  />
                </div>
              )}
              {project.id === 2 && (
                <video controls className="w-full rounded-lg">
                  <source src="/ivoryEllaDemo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
                {project.id === 3 && (
                  <>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <img
                      src="/roomAI.jpg"
                      alt={project.title}
                      className="w-full h-auto object-cover rounded-lg cursor-pointer mb-4"
                      onClick={(e) => {
                        const overlay = document.createElement("div");
                        overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                        cursor: pointer;
                        `;
                        const img = document.createElement("img");
                        img.src = "/roomAI.jpg";
                        img.style.cssText = "max-width: 90vw; max-height: 90vh; border-radius: 8px;";
                        overlay.appendChild(img);
                        overlay.onclick = () => document.body.removeChild(overlay);
                        document.body.appendChild(overlay);
                  }}
                  />
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </>
                )}
            </ProjectPreview>
          </TimelineItem>
        ))}
      </Timeline>
    </ProjectsContainer>
  );
};

export default MyProjects;
