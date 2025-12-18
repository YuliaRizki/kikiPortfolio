import type { Metadata } from "next";
import localFont from "next/font/local";
import { Share_Tech_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import GlowEffect from "../components/GlowEffect";
import HologramBackground from "../components/HologramBackground";
import StyledComponentsRegistry from "../lib/registry";
import CyberCursor from "../components/CyberCursor";
import CyberAudio from "../components/CyberAudio";
import KonamiCode from "../components/KonamiCode";
import CyberLoader from "../components/CyberLoader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Yulia Rizki | Software Engineer",
  description: "Cyberpunk Portfolio of Yulia Rizki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shareTechMono.variable} ${orbitron.variable} antialiased glow-container relative min-h-screen`}
      >
        <StyledComponentsRegistry>
          <ClientLayout>
            <CyberLoader />
            <KonamiCode />
            <CyberAudio />
            <CyberCursor />
            <HologramBackground />
            <GlowEffect />
            {children}
          </ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
