import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Icon, Switch } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
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
      <h1 className="text-xl font-bold mb-4">Settings:</h1>
      <Switch.Root colorPalette="blue" size="lg">
        <Switch.HiddenInput />
        <Switch.Control onClick={toggleTheme}>
          <Switch.Thumb />
          <Switch.Indicator fallback={<Icon as={FaMoon} color="gray.400" />}>
            <Icon as={FaSun} color="yellow.400" />
          </Switch.Indicator>
        </Switch.Control>
        <Switch.Label>Switch {theme} mode</Switch.Label>
      </Switch.Root>
    </div>
  );
}
