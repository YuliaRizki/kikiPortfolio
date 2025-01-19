"use client";
import React, { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  color: #00ff9f;
  font-family: 'Roboto', sans-serif;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroContent = styled.div`
  text-align: center;
  padding: 0 1rem;
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #00ff9f, #ff00ff);
  -webkit-background-clip: text;
  color: transparent;
  font-family: 'Orbitron', sans-serif;
  animation: ${fadeIn} 1.5s ease-out;
`;

const HeroText = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: ${fadeIn} 2s ease-out;
`;

const HeroButton = styled.button`
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 255, 159, 0.5);
  }
`;

const PrimaryButton = styled(HeroButton)`
  background: linear-gradient(to right, #00ff9f, #ff00ff);
  color: #fff;
`;

const OutlineButton = styled(HeroButton)`
  background: transparent;
  border: 2px solid #00ff9f;
  color: #00ff9f;
  &:hover {
    background: #00ff9f;
    color: #0a0a0a;
  }
`;

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(
        containerRef.current.querySelectorAll('.animate-item'),
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: stagger(0.2) }
      );
    }
  }, []);

  return (
    <HeroContainer ref={containerRef}>
      <HeroContent>
        <HeroTitle className="animate-item">Hello there 👋</HeroTitle>
        <HeroText className="animate-item">
          Welcome to my creative space. I'm passionate about crafting beautiful 
          digital experiences that combine innovative design with cutting-edge technology.
        </HeroText>
        <div className="animate-item">
            <PrimaryButton onClick={() => window.location.href = '/projects'}>View My Work</PrimaryButton>
          <OutlineButton>Contact Me</OutlineButton>
        </div>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
