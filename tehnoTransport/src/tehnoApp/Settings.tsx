import { useEffect, useState } from "react";

export default function Settings() {
  // Set the initial theme based on localStorage, defaulting to "light" if not found
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Apply the theme class to the document body
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // Store the theme in localStorage for future reference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="settings p-4">
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded"
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}
