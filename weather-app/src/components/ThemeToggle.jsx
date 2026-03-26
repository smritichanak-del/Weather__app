import { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
}

export default ThemeToggle;