import React, { createContext, useState, useEffect } from 'react';

// Import images statically using ES Module syntax
import natureImage from '../assets/images/nature.jpg';
import abstractImage from '../assets/images/abstract.jpg';
import spaceImage from '../assets/images/space.jpg';

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider Component
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');  // Default mode is light

  // Backgrounds object with imported images
  const backgrounds = {
    nature: natureImage,
    abstract: abstractImage,
    space: spaceImage,
  };

  // Apply theme and background based on selected mode
  useEffect(() => {
    // Apply the theme mode (light or dark)
    document.body.setAttribute('data-theme', mode.includes('light') ? 'light' : 'dark');
    
    // Apply background image if mode is set to nature, abstract, or space
    if (backgrounds[mode]) {
      document.body.style.backgroundImage = `url(${backgrounds[mode]})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundImage = ''; // Reset background if it's light or dark mode
    }

    // Apply a smooth transition to the background
    document.body.style.transition = 'background-image 0.3s ease, background-color 0.3s ease';
  }, [mode]);  // Trigger when mode changes

  // Function to change mode (both theme and background)
  const changeMode = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
