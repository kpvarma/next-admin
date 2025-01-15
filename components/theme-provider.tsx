"use client";

import { useState, useEffect } from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className={theme}>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Toggle Theme
      </button>
      {children}
    </div>
  );
};