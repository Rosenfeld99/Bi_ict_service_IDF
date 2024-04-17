import React, { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("MODE") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("MODE", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("MODE", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return [theme, toggleTheme];
};

export default useTheme;
