"use client";

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 20, 0.9), rgba(0, 10, 30, 0.95));
  color: #00ff9f;
  font-family: 'Roboto', sans-serif;
  position: relative;
  overflow: hidden;
`;

const Box = styled.div`
  background: rgba(10, 10, 20, 0.8);
  border: 2px solid #00ff9f;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  transition: transform 0.3s;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 10px;
`;

const PreviewMyCV = () => {
  return (
    <Container>
      <Box>
        <Title>Preview My CV</Title>
        <Iframe src="/Yulia_Rizki_CV.pdf" title="CV Preview" />
      </Box>
    </Container>
  );
};

export default PreviewMyCV;
