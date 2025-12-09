"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDark(savedTheme === "dark")
        } else {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
        }
    }, [])

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        localStorage.setItem("theme", isDark ? "dark" : "light")
    }, [isDark])

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    )
}
