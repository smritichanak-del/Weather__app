import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (dark) {
      document.body.style.background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
    } else {
      document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(!dark)}
      title={dark ? "Light Mode" : "Dark Mode"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}