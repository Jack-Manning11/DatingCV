import React, { useState } from 'react';
import { useLocation } from 'wouter';
import photos from './data/consolidated_results.json';
import { InteractiveContainer, PhotoContainer, Photo, YesButton, NoButton, StopButton } from './styles/InteractiveStyles';

const Interactive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');
  const [yesPhotos, setYesPhotos] = useState(() => JSON.parse(localStorage.getItem('yesPhotos')) || []);
  const [noPhotos, setNoPhotos] = useState(() => JSON.parse(localStorage.getItem('noPhotos')) || []);
  const [, setLocation] = useLocation();

  const handleYes = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');

    const newYesPhotos = [...yesPhotos, photos[currentIndex]];
    setYesPhotos(newYesPhotos);
    localStorage.setItem('yesPhotos', JSON.stringify(newYesPhotos));

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsAnimating(false);
      setDirection('');
    }, 500); // Duration of the animation
  };

  const handleNo = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');

    const newNoPhotos = [...noPhotos, photos[currentIndex]];
    setNoPhotos(newNoPhotos);
    localStorage.setItem('noPhotos', JSON.stringify(newNoPhotos));

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsAnimating(false);
      setDirection('');
    }, 500); // Duration of the animation
  };

  const handleStop = () => {
    setLocation('/output');
  };

  return (
    <InteractiveContainer>
      <PhotoContainer className={`${isAnimating ? 'animate' : ''} ${direction}`}>
        <Photo src={require(`./images/${photos[currentIndex].file_name}`)} alt="current photo" />
      </PhotoContainer>
      <YesButton onClick={handleYes}>Yes</YesButton>
      <NoButton onClick={handleNo}>No</NoButton>
      <StopButton onClick={handleStop}>Stop Interaction</StopButton>
    </InteractiveContainer>
  );
};

export default Interactive;
