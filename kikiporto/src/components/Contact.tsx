"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors, animations, cyberGrid } from "../styles/shared";


const Section = styled.section`
  min-height: 100vh;
  position: relative;
  background-color: ${colors.darkBg};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;

  ${cyberGrid}

  /* Dark Vignette */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      var(--bg-primary) 90%
    );
    pointer-events: none;
  }
`;

const TerminalContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(10, 10, 12, 0.9);
  border: 1px solid ${colors.neonCyan};
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 10;

  /* Decorative Corners */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    width: 20px;
    height: 20px;
    border-top: 2px solid ${colors.neonCyan};
    border-left: 2px solid ${colors.neonCyan};
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid ${colors.neonCyan};
    border-right: 2px solid ${colors.neonCyan};
  }
`;

const HeaderBar = styled.div`
  height: 40px;
  background: rgba(0, 243, 255, 0.1);
  border-bottom: 1px solid ${colors.neonCyan};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-family: var(--font-share-tech-mono), monospace;
  color: ${colors.neonCyan};
  font-size: 0.8rem;
  letter-spacing: 2px;
`;

const StatusBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  span.status {
    width: 8px;
    height: 8px;
    background: ${colors.neonGreen};
    border-radius: 50%;
    box-shadow: 0 0 5px ${colors.neonGreen};
    animation: ${animations.flicker} 2s infinite;
  }
`;

const ContentArea = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-family: var(--font-orbitron);
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 0px ${colors.neonPurple};
  margin: 0;

  span {
    color: ${colors.neonCyan};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonCyan};
  font-size: 0.9rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
  padding: 1rem;
  color: #fff;
  font-family: var(--font-share-tech-mono);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: ${colors.neonCyan};
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
    background: rgba(0, 243, 255, 0.05);
  }
`;

const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
  padding: 1rem;
  color: #fff;
  font-family: var(--font-share-tech-mono);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  min-height: 150px;
  resize: vertical;

  &:focus {
    border-color: ${colors.neonCyan};
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
    background: rgba(0, 243, 255, 0.05);
  }
`;

const SubmitBtn = styled(motion.button)`
  background: transparent;
  border: 1px solid ${colors.neonGreen};
  color: ${colors.neonGreen};
  padding: 1rem 2rem;
  font-family: var(--font-orbitron);
  font-size: 1.1rem;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  margin-top: 1rem;
  align-self: flex-start;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${colors.neonGreen};
    transition: left 0.3s;
    z-index: -1;
  }

  &:hover {
    color: #000;
    box-shadow: 0 0 20px rgba(0, 255, 159, 0.4);

    &::before {
      left: 0;
    }
  }
`;

const MessageStatus = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid ${colors.neonGreen};
  background: rgba(0, 255, 159, 0.1);
  color: ${colors.neonGreen};
  font-family: var(--font-share-tech-mono);
  text-align: center;
`;

const Contact = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormState("sent");
  };

  return (
    <Section id="contact">
      <TerminalContainer
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <HeaderBar>
          <span>NEURAL_UPLINK_V.2.4</span>
          <StatusBar>
            <span>STATUS: ONLINE</span>
            <span className="status"></span>
          </StatusBar>
        </HeaderBar>

        <ContentArea>
          <Title>
            Initialize <span>Connection</span>
          </Title>
          <p
            style={{
              fontFamily: "var(--font-share-tech-mono)",
              color: "#a0a0a0",
            }}
          >
            Transmit your signal. Encryption enabled.
          </p>

          {formState === "sent" ? (
            <MessageStatus
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 style={{ margin: 0 }}>TRANSMISSION COMPLETE</h3>
              <p>Data packet received successfully. Standby for response.</p>
              <button
                onClick={() => setFormState("idle")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  textDecoration: "underline",
                  marginTop: "10px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                SEND_NEW_PACKET
              </button>
            </MessageStatus>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>IDENTIFIER_NAME</Label>
                <Input
                  type="text"
                  placeholder="Enter your designation..."
                  required
                  disabled={formState === "sending"}
                />
              </FormGroup>

              <FormGroup>
                <Label>CONTACT_FREQUENCY (EMAIL)</Label>
                <Input
                  type="email"
                  placeholder="Enter secure channel..."
                  required
                  disabled={formState === "sending"}
                />
              </FormGroup>

              <FormGroup>
                <Label>DATA_PACKET (MESSAGE)</Label>
                <TextArea
                  placeholder="Enter encrypted message data..."
                  required
                  disabled={formState === "sending"}
                />
              </FormGroup>

              <SubmitBtn
                type="submit"
                disabled={formState === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formState === "sending"
                  ? "TRANSMITTING..."
                  : "ESTABLISH UPLINK"}
              </SubmitBtn>
            </Form>
          )}
        </ContentArea>
      </TerminalContainer>
    </Section>
  );
};

export default Contact;
