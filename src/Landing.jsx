import React from 'react';
import { 
  LandingContainer, 
  Title, 
  StartButton,
  StyledLink
 } from './styles/LandingStyles';

export default function Landing() {
  return (
    <LandingContainer>
      <Title>Dating CV Prototype</Title>
      <StyledLink href='/interactive'>
        <StartButton>Start Interactive!</StartButton>
      </StyledLink>
    </LandingContainer>
  )
}
