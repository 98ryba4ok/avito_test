import React, { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    return saved ?? "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button className={styles.switcher} onClick={toggleTheme}>
      {theme === "light" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeSwitcher;
