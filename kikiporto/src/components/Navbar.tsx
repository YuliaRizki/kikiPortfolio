"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// --- Styled Components ---

const SidebarContainer = styled(motion.nav)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 80px;
  background: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 255, 159, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  z-index: 9999;
  transition: width 0.3s ease;
  overflow: hidden;

  /* Cyberpunk decorative line */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      #00ff9f,
      rgba(0, 243, 255, 0) 50%,
      #bc13fe
    );
    box-shadow: 0 0 10px #00ff9f;
  }

  /* Removed hover expansion */
  /* &:hover {
    width: 240px; 
  } */

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    width: 100% !important;
    height: 70px;
    flex-direction: row;
    padding: 0 1rem;
    border-right: none;
    border-top: 1px solid rgba(0, 255, 159, 0.2);
    justify-content: space-around;

    &::before {
      width: 100%;
      height: 2px;
      top: 0;
      background: linear-gradient(
        to right,
        #00ff9f,
        rgba(0, 243, 255, 0) 50%,
        #bc13fe
      );
    }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NeonLogo = styled.div`
  font-family: var(--font-orbitron), sans-serif;
  font-weight: 900;
  color: #fff;
  font-size: 1.5rem;
  text-shadow: 0 0 10px #00ff9f;
  cursor: pointer;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(0, 255, 159, 0.3);
  border-radius: 8px;
  background: rgba(0, 255, 159, 0.05);
  position: relative;

  span {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center; /* Center the nav items */
    gap: 1.5rem; /* Add gap back since we have space now */
    height: 100%;
    width: 100%;
    padding-right: 50px; /* Make room for the absolute toggle */
  }
`;

const NavItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: auto;
    align-items: center;
  }
`;

const NavLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #a0a0a0;
  text-decoration: none;
  font-family: var(--font-share-tech-mono), monospace;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 8px;

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 0 transparent);
  }

  .label {
    position: absolute;
    left: 60px;
    opacity: 0;
    background: #000;
    color: #00ff9f;
    padding: 5px 10px;
    border: 1px solid #00ff9f;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  /* Tooltip logic: Check for hover on item */
  &:hover {
    background: rgba(0, 255, 159, 0.1);
    color: #00ff9f;
    border: 1px solid rgba(0, 255, 159, 0.3);
    box-shadow: 0 0 15px rgba(0, 255, 159, 0.2);

    svg {
      transform: scale(1.1);
      filter: drop-shadow(0 0 5px #00ff9f);
      color: #00ff9f;
    }

    .label {
      opacity: 1;
      top: 50%;
      transform: translateY(-50%);
      left: 60px;
      text-shadow: 0 0 5px rgba(0, 255, 159, 0.5);
    }
  }

  @media (max-width: 768px) {
    width: auto;
    height: 100%;

    .label {
      display: none !important;
    }
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: 1px solid #333;
  color: #a0a0a0;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 1.2rem;

  &:hover {
    border-color: #bc13fe;
    color: #bc13fe;
    box-shadow: 0 0 15px rgba(188, 19, 254, 0.3);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border: none;
  }
`;

const FooterDecor = styled.div`
  margin-top: auto;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: 0.5;
  cursor: help;
  position: relative;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;

    .text {
      color: #ff0055;
      text-shadow: 0 0 5px #ff0055;
    }

    &::after {
      content: "TAP_X2_TO_OVERRIDE";
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: #000;
      color: #ff0055;
      border: 1px solid #ff0055;
      padding: 5px 10px;
      font-size: 0.7rem;
      white-space: nowrap;
      margin-left: 10px;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    }
  }

  .line {
    width: 2px;
    height: 40px;
    background: linear-gradient(to bottom, #333, #00f3ff);
  }

  .text {
    font-size: 0.6rem;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    color: #00f3ff;
    letter-spacing: 2px;
    font-family: var(--font-orbitron);
    transition: color 0.3s;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Icons (Simple SVG paths)
const Icons = {
  Home: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  Work: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  Briefcase: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  About: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Contact: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  Gallery: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
};

const ToolsContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    margin-top: 0;
    width: auto;
    padding-bottom: 0;
    flex-direction: row;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10000;
  }
`;

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LogoContainer>
        <NeonLogo>
          K<span>KIKI</span>
        </NeonLogo>
      </LogoContainer>

      <NavList>
        <NavItem>
          <NavLink href="#">
            <Icons.Home />
            <span className="label">Home</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#projects">
            <Icons.Work />
            <span className="label">Projects</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#about">
            <Icons.About />
            <span className="label">About</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#experience">
            <Icons.Briefcase />
            <span className="label">Experience</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#gallery">
            <Icons.Gallery />
            <span className="label">Gallery</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#contact">
            <Icons.Contact />
            <span className="label">Contact</span>
          </NavLink>
        </NavItem>
      </NavList>

      <ToolsContainer>
        <ThemeToggle onClick={toggleTheme}>
          {theme === "dark" ? "🌙" : "☀️"}
        </ThemeToggle>

        <FooterDecor>
          <span className="text">SYS.V.1.0</span>
          <div className="line" />
        </FooterDecor>
      </ToolsContainer>
    </SidebarContainer>
  );
};

export default Navbar;
