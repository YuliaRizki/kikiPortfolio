"use client";

import { useEffect, useState } from 'react';

const GlowEffect = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let frameId: number;
    let currentX = -100;
    let currentY = -100;
    
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = e.clientX;
      const targetY = e.clientY;
      
      const updatePosition = () => {
        // More subtle interpolation
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        
        setPosition({ x: currentX, y: currentY });
        
        frameId = requestAnimationFrame(updatePosition);
      };
      
      frameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="glow-effect"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default GlowEffect;