"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (navRef.current) {
      animate(
        navRef.current.querySelectorAll('.nav-item') as any,
        { 
          opacity: [0, 1],
          translateY: [-20, 0]
        },
        {
          duration: 0.8,
          delay: stagger(0.1)
        }
      );
    }
  }, []);

  return (
    <div ref={navRef} className="navbar sticky top-0 left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 font-geist-sans hologram-background">
      <div className="flex-1">
        <a className="nav-item btn btn-ghost text-xl sm:text-2xl font-bold tracking-tight hover:scale-105 transition-transform">
          {/* YULIA */}
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-2 sm:gap-4">
          {['Work', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <a className="nav-item btn btn-ghost text-base sm:text-lg hover:scale-105 transition-transform">
                {item}
              </a>
            </li>
          ))}
          <li>
            <button 
              onClick={toggleTheme}
              className="nav-item btn btn-ghost text-base sm:text-lg hover:scale-105 transition-transform"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
