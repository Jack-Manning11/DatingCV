import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #0A0E36;
`;

export const MainBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;  
  flex-direction: column;
  background-color: #0A0E36;
  font-size: 24px;
`;

export const TitleBox = styled.div`
  width: 80%;
  text-align: center;
  color: #FCFCFD;
  background-color: #4D2787;
  opacity: 80%;

`

export const IconBox = styled.div`
  width: 30%;
  height: auto;
  background-color: #05E7E9;
`

export const SoftBox = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 15%;
  background-color: #4D2787;
  opacity: 60%;
  border-radius: 10px;
`

export const Summary = styled.div`
  margin-top: 20px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 25px;
`;

export const ProgressBar = styled.div`
  width: ${props => props.width}%;
  background-color: ${props => (props.gender === 'male' ? '#007bff' : '#ff69b4')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
`;
