"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: "light",
    toggleTheme: () => {},
});

export function ThemeProvider({
                                  children,
                                  attribute = "data-theme",
                                  defaultTheme,
                              }: {
    children: React.ReactNode;
    attribute: string;
    defaultTheme: Theme;
}) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) setTheme(stored);
        document.documentElement.setAttribute(attribute, stored ?? defaultTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme: Theme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute(attribute, newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
