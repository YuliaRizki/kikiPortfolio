"use client"
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import './globals.css';

const GetToKnowMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Camera position
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white">
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">Get to Know Me</h1>
        <p className="mt-4 text-lg text-center">
          Welcome to my CV page! Here you will find all the information about my professional background, skills, and experiences.
        </p>
        <div className="mt-8">
          <div className="flex flex-col items-center gap-4">
            <Link href="/PreviewMyCV" className="px-6 py-3 text-lg font-semibold text-black bg-white rounded-md hover:bg-gray-300">
              Preview My CV
            </Link>
            {/* <iframe
              src="/Yulia_Rizki_CV.pdf"
              className="w-full max-w-2xl h-[500px] rounded-lg border-2 border-white"
              title="CV Preview"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetToKnowMe;