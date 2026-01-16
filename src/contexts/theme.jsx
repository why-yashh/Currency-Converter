import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        // Fallback to system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const darkTheme = () => {
        setThemeMode("dark");
        localStorage.setItem("theme", "dark");
    };

    const lightTheme = () => {
        setThemeMode("light");
        localStorage.setItem("theme", "light");
    };

    useEffect(() => {
        const html = document.querySelector("html");
        html.classList.remove("light", "dark");
        html.classList.add(themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme() {
    return useContext(ThemeContext);
}
