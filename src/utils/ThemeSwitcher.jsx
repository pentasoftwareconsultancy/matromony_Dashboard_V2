import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeSwitcher() {
  const { theme, toggleTheme, customTheme, updateCustomTheme } = useContext(ThemeContext);

  const [backgroundColor, setBackgroundColor] = useState(customTheme.backgroundColor);
  const [textColor, setTextColor] = useState(customTheme.textColor);

  const handleThemeChange = (newTheme) => {
    toggleTheme(newTheme);
  };

  const handleCustomThemeChange = () => {
    updateCustomTheme({ backgroundColor, textColor });
  };

  return (
    <div>
      <h3>Current Theme: {theme}</h3>

      {/* Light/Dark Theme Switcher */}
      <button onClick={() => handleThemeChange('light')}>Light Theme</button>
      <button onClick={() => handleThemeChange('dark')}>Dark Theme</button>
      <button onClick={() => handleThemeChange('blue')}>Blue Theme</button>
      <button onClick={() => handleThemeChange('green')}>Green Theme</button>
      <button onClick={() => handleThemeChange('red')}>Red Theme</button>

      <h3>Custom Theme</h3>
      <div>
        <label>Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <div>
        <label>Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>
      <button onClick={handleCustomThemeChange}>Apply Custom Theme</button>
    </div>
  );
}

export default ThemeSwitcher;
