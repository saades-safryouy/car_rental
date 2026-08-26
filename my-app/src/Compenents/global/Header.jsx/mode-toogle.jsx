// src/components/global/mode-toggle.jsx
import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeContext } from "../../../App"; // Ajustez le chemin selon votre structure

export function ModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="relative h-10 w-10 rounded-full border-gray-500 dark:border-gray-300 bg-gray-900/50 dark:bg-gray-100/50 text-gray-100 dark:text-gray-900 hover:bg-orange-500/20 dark:hover:bg-orange-300/20 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <Sun
          className="h-5 w-5 absolute inset-0 m-auto transition-all duration-300 ease-in-out transform rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
        />
        <Moon
          className="h-5 w-5 absolute inset-0 m-auto transition-all duration-300 ease-in-out transform rotate-90 scale-0 dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only">Changer de thème</span>
      </Button>
    </div>
  );
}

export default ModeToggle;