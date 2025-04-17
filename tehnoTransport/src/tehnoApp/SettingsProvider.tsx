import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Define the context shape
interface SettingsContextType {
  theme: string;
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

// Create Context
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// Create Provider Component
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "bg"
  );

  // Apply theme changes
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply language changes
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, language, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use SettingsContext
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};
