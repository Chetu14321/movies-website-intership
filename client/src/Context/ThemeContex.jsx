import React, { createContext, useState, useContext } from "react";

// Create a ThemeContext to hold the current theme and a function to toggle it
const ThemeContext = createContext();

// Create a Provider to manage the theme state
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
