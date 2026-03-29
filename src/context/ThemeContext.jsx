import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // LocalStorage se purana mode uthao ya default 'light' rakho
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('azeems_theme');
    return savedTheme === 'dark';
  });

  // Jab bhi darkMode change ho, HTML tag par 'dark' class lagao
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('azeems_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('azeems_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);