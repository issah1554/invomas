import { useEffect, useState } from "react";

type Theme = "light-slate" | "dark-slate";

export const useTheme = (initialTheme: Theme = "light-slate") => {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light-slate" ? "dark-slate" : "light-slate"));
    };

    return { theme, setTheme, toggleTheme };
};
