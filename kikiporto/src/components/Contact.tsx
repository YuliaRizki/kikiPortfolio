"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors, animations, cyberGrid } from "../styles/shared";

const Section = styled.section`
  min-height: 100vh;
  position: relative;
  background-color: transparent;
  color: ${colors.neonCyan}; /* Or text-primary */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;

  /* Grid removed */
  /* ${cyberGrid} */

  /* Vignette removed to let global background shine */

  @media (max-width: 768px) {
    padding: 3rem 1rem 8rem 1rem; /* Added extra bottom padding to clear mobile navbar */
    min-height: auto;
  }
`;

const CyberFormContainer = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  background: ${colors.cardBg};
  backdrop-filter: blur(15px);
  border: 1px solid ${colors.neonCyan};
  /* Cyber Shape */
  clip-path: polygon(
    20px 0,
    100% 0,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    0 100%,
    0 20px
  );
  padding: 4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    clip-path: none;
    border-radius: 12px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-orbitron);
  font-size: 3rem;
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  /* Glitch Text Effect */
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    word-break: break-word; /* Prevent overflow if word is too long */
  }

  span {
    color: ${colors.neonCyan};
    text-shadow: 0 0 15px ${colors.neonCyan};
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-share-tech-mono);
  color: #888;
  font-size: 1rem;
  letter-spacing: 2px;
  margin-bottom: 3rem;

  &::before {
    content: "> ";
    color: ${colors.neonGreen};
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  grid-column: ${(props) => (props.$fullWidth ? "span 2" : "span 1")};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  font-family: var(--font-share-tech-mono);
  color: ${colors.neonCyan};
  font-size: 0.8rem;
  letter-spacing: 1px;
  position: absolute;
  top: -10px;
  left: 10px;
  background: ${colors.darkBg}; /* Mask line behind it */
  padding: 0 5px;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: 1px solid var(--text-secondary);
  padding: 1rem 1.5rem;
  color: var(--text-primary);
  font-family: var(--font-share-tech-mono);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  border-radius: 4px;

  &:focus {
    border-color: ${colors.neonCyan};
    background: rgba(0, 243, 255, 0.05);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: 1px solid var(--text-secondary);
  padding: 1rem 1.5rem;
  color: var(--text-primary);
  font-family: var(--font-share-tech-mono);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  min-height: 150px;
  resize: vertical;
  border-radius: 4px;

  &:focus {
    border-color: ${colors.neonCyan};
    background: rgba(0, 243, 255, 0.05);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
  }
`;

const SubmitBtn = styled(motion.button)`
  grid-column: span 2;
  background: ${colors.neonCyan};
  color: #000;
  border: none;
  padding: 1rem;
  font-family: var(--font-orbitron);
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 2px;
  cursor: pointer;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #ff0055; /* Neon Pink */
    color: #fff;
    border: 1px solid #ff0055;
    box-shadow: 0 0 20px #ff0055, 0 0 40px #ff0055;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const MessageStatus = styled(motion.div)`
  margin-top: 1rem;
  padding: 2rem;
  border: 1px solid ${colors.neonGreen};
  background: rgba(0, 255, 159, 0.05);
  color: ${colors.neonGreen};
  font-family: var(--font-share-tech-mono);
  text-align: center;
  width: 100%;

  h3 {
    font-family: var(--font-orbitron);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
`;

const Contact = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/kikiyulia223@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name}`,
          }),
        }
      );

      if (response.ok) {
        setFormState("sent");
      } else {
        alert("Transmission failed. Please try again.");
        setFormState("idle");
      }
    } catch (error) {
      alert("Transmission error.");
      setFormState("idle");
    }
  };

  return (
    <Section id="contact">
      <CyberFormContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title>
          Initialize <span>Uplink</span>
        </Title>
        <Subtitle>Establish secure connection...</Subtitle>

        {formState === "sent" ? (
          <MessageStatus
            initial={{ opacity: 0, zoom: 0.9 }}
            animate={{ opacity: 1, zoom: 1 }}
          >
            <h3>TRANSMISSION SUCCESSFUL</h3>
            <p>Your data packet has been received safely.</p>
            <button
              onClick={() => {
                setFormState("idle");
                setFormData({ name: "", email: "", message: "" });
              }}
              style={{
                background: "transparent",
                border: "1px solid currentColor",
                padding: "0.5rem 1rem",
                color: "inherit",
                marginTop: "1.5rem",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              SEND ANOTHER
            </button>
          </MessageStatus>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>DESIGNATION (NAME)</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
                disabled={formState === "sending"}
              />
            </FormGroup>

            <FormGroup>
              <Label>FREQUENCY (EMAIL)</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                disabled={formState === "sending"}
              />
            </FormGroup>

            <FormGroup $fullWidth>
              <Label>DATA PACKET (MESSAGE)</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Message"
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
                : "ESTABLISH UPLINK >>"}
            </SubmitBtn>
          </Form>
        )}
      </CyberFormContainer>
    </Section>
  );
};

export default Contact;
