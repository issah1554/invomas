import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "light-slate" | "dark-slate" ;

const THEME_STORAGE_KEY = "app-theme";

// Context type
type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider props
type ThemeProviderProps = {
    initialTheme?: Theme;
    children: ReactNode;
};

export const ThemeProvider = ({
    initialTheme = "dark-slate",
    children,
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
            const validThemes: Theme[] = ["light-slate", "dark-slate"];
            if (savedTheme && validThemes.includes(savedTheme)) return savedTheme;
        }
        return initialTheme;
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === "light-slate") return "dark-slate";
            if (prev === "dark-slate") return "light-slate";
            return "light-slate";
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook
export const useTheme = (): ThemeContextType => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
};
