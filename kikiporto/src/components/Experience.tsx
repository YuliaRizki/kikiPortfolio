"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors, cyberGrid } from "../styles/shared";

const Section = styled.section`
  min-height: 100vh;
  position: relative;
  background-color: transparent;
  color: var(--text-primary);
  padding: 6rem 2rem;
  overflow: hidden;
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
      rgba(0, 0, 0, 0.8) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    min-height: auto;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  font-family: var(--font-orbitron);
  font-size: 3rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 10px ${colors.neonPurple};
  margin-bottom: 1rem;
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  /* The central line */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${colors.neonCyan},
      ${colors.neonPurple},
      transparent
    );
    box-shadow: 0 0 15px ${colors.neonCyan};
    opacity: 0.5;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 40px;
    margin-bottom: 2rem;
  }

  /* Dot on the line */
  &::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: ${colors.darkBg};
    border: 2px solid ${colors.neonGreen};
    border-radius: 50%;
    z-index: 5;
    box-shadow: 0 0 10px ${colors.neonGreen}, inset 0 0 5px ${colors.neonGreen};
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      left: 20px;
    }
  }

  &:hover::after {
    background: ${colors.neonGreen};
    box-shadow: 0 0 20px ${colors.neonGreen}, 0 0 40px ${colors.neonGreen};
    transform: translateX(-50%) scale(1.2);
  }

  /* Alternating layout props handled in child components */
`;

const ContentBox = styled(motion.div)<{ position: "left" | "right" }>`
  width: 45%;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neon-cyan);
  padding: 1.5rem;
  position: relative;
  margin-left: ${(props) => (props.position === "right" ? "auto" : "0")};
  margin-right: ${(props) => (props.position === "left" ? "auto" : "0")};

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }

  /* Connector Line */
  &::before {
    content: "";
    position: absolute;
    top: 28px;
    ${(props) => (props.position === "left" ? "right: -11%;" : "left: -11%;")}
    width: 11%;
    height: 1px;
    background: ${colors.neonCyan};
    opacity: 0.5;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    border-color: ${colors.neonCyan};
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);

    &::before {
      opacity: 1;
      background: ${colors.neonGreen};
    }
  }
`;

const DateBadge = styled.div`
  display: inline-block;
  font-family: var(--font-share-tech-mono);
  font-size: 0.9rem;
  color: ${colors.neonGreen};
  border: 1px solid ${colors.neonGreen};
  padding: 4px 8px;
  margin-bottom: 1rem;
  background: rgba(39, 201, 63, 0.1);
`;

const JobTitle = styled.h3`
  font-family: var(--font-orbitron);
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Company = styled.div`
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonCyan};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: ">";
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Description = styled.ul`
  list-style: none;
  padding: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;

    &::before {
      content: "•";
      color: ${colors.neonPurple};
      position: absolute;
      left: 0;
    }
  }
`;

const experiences = [
  {
    id: 1,
    date: "JUNE 2025 – AUGUST 2025",
    title: "Program Manager",
    company: "PT Japi Edutech Indonesia (Hybrid)",
    points: [
      "Oversaw delivery of AI-based English learning programs across 9 vocational schools in Bekasi.",
      "Prepared progress reports and consolidated updates for educational authorities.",
      "Created learning materials and presented updates for students and teachers.",
      "Recruited and interviewed Program Quality Inspectors and English Teachers.",
      "Tracked deliverables using Notion and recommended workflow improvements.",
    ],
  },
  {
    id: 2,
    date: "FEB 2025 - JUNE 2025",
    title: "Full Stack Developer",
    company: "PT Applimetis Parama Solusi (Bekasi)",
    points: [
      "Developed a doctor-focused web app for RSCM Hospital using Next.js and NestJS.",
      "Implemented responsive UI components, integrated APIs, and optimized performance.",
      "Ensured consistent data flow between Next.js frontend and NestJS backend.",
      "Collaborated with cross-functional teams to translate medical requirements into secure features.",
    ],
  },
  {
    id: 3,
    date: "JULY 2022 - MAY 2024",
    title: "Strategy Analyst",
    company: "PT Prospect Motor (Cikarang)",
    points: [
      "Audited 14 dealerships across Eastern Indonesia to enforce Honda’s sales strategy.",
      "Analyzed market conditions, competitor movements, and pricing strategies.",
      "Applied PDCA cycle to monitor plan execution and strategic alignment.",
      "Coordinated dealer-level event strategies and set sales targets.",
      "Supported dealer managers to improve event performance and retail results.",
    ],
  },
  {
    id: 4,
    date: "MARCH 2022 - JUNE 2022",
    title: "HR Intern",
    company: "PT SGMW Motors Indonesia (Cikarang)",
    points: [
      "Assisted in developing employee training programs and competency dictionaries.",
      "Supported HR operations, documentation, and project coordination.",
    ],
  },
  {
    id: 5,
    date: "JULY 2021 - JAN 2022",
    title: "HR Intern",
    company: "JW Marriott Hotel Jakarta",
    points: [
      "Supported recruitment, trainee data management, and staff evaluation.",
      "Assisted in developing training materials and HR operational flow.",
    ],
  },
];

const Experience = () => {
  return (
    <Section id="experience">
      <Header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Title>Mission Logs</Title>
      </Header>

      <TimelineContainer>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ContentBox position={index % 2 === 0 ? "left" : "right"}>
              <DateBadge>{exp.date}</DateBadge>
              <JobTitle>{exp.title}</JobTitle>
              <Company>{exp.company}</Company>
              <Description>
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </Description>
            </ContentBox>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Section>
  );
};

export default Experience;
