import styled, { keyframes } from 'styled-components';

const slideRight = keyframes`
  0% {
    transform: translateX(0) rotate(0);
  }
  100% {
    transform: translateX(150%) rotate(20deg);
  }
`;

const slideLeft = keyframes`
  0% {
    transform: translateX(0) rotate(0);
  }
  100% {
    transform: translateX(-150%) rotate(-20deg);
  }
`;

export const InteractiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const PhotoContainer = styled.div`
  position: relative;
  width: 20%;
  height: 90%;
  overflow: hidden;

  &.animate.right {
    animation: ${slideRight} 0.5s forwards;
  }

  &.animate.left {
    animation: ${slideLeft} 0.5s forwards;
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const YesButton = styled.button`
  position: absolute;
  right: 10%;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #3e6958;
  color: #fff;
`;

export const NoButton = styled.button`
  position: absolute;
  left: 10%;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #b03a48;
  color: #fff;
`;

export const StopButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  background-color: #333;
`;
