import { useEffect, useState } from "react";

type Theme = "light-slate" | "dark-slate" | "light-green" | "dark-green";

const THEME_STORAGE_KEY = "app-theme";

export const useTheme = (initialTheme: Theme = "dark-slate") => {
    // Initialize theme from localStorage or use initialTheme
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
            // Validate that the saved theme is one of our valid themes
            const validThemes: Theme[] = ["light-slate", "dark-slate", "light-green", "dark-green"];
            if (savedTheme && validThemes.includes(savedTheme)) {
                return savedTheme;
            }
        }
        return initialTheme;
    });

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", theme);

        // Save theme to localStorage
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === "light-slate") return "dark-slate";
            if (prev === "dark-slate") return "light-green";
            if (prev === "light-green") return "dark-green";
            return "light-slate";
        });
    };

    return { theme, setTheme, toggleTheme };
};