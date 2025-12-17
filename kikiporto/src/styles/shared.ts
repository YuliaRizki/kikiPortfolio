import { keyframes, css } from "styled-components";

export const colors = {
  neonCyan: "var(--neon-cyan)",
  neonPurple: "var(--neon-purple)",
  neonGreen: "var(--neon-green)",
  darkBg: "var(--bg-primary)",
  cardBg: "var(--card-bg)",
};

export const animations = {
  float: keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `,
  scan: keyframes`
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  `,
  glitchUser: keyframes`
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  `,
  flicker: keyframes`
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      text-shadow: 0 0 4px ${colors.neonGreen}, 0 0 10px ${colors.neonGreen}, 0 0 20px ${colors.neonGreen};
      opacity: 1;
    }
    20%, 24%, 55% {
      text-shadow: none;
      opacity: 0.5;
    }
  `,
  pulse: keyframes`
    0% { box-shadow: 0 0 0 0 var(--neon-purple); }
    70% { box-shadow: 0 0 0 20px rgba(188, 19, 254, 0); }
    100% { box-shadow: 0 0 0 0 rgba(188, 19, 254, 0); }
  `,
  typing: keyframes`
    from { width: 0 }
    to { width: 100% }
  `,
  blinkCursor: keyframes`
    from, to { border-color: transparent }
    50% { border-color: var(--neon-green) }
  `,
  rotate: keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `,
  slideIn: keyframes`
    from { width: 0; }
  `,
};

// --- Mixins ---
export const cyberGrid = css`
  /* Grid removed as per user request */
  background-image: none;
`;

export const glassEffect = css`
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid ${colors.neonPurple};
`;
