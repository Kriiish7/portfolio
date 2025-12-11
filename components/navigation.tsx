"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/app/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConstellationLogo } from "@/components/constellation-logo"

interface NavItem {
    label: string
    href: string
}

const navItems: NavItem[] = [
    { label: "Home", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Interests", href: "#interests" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
]

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const smoothScrollTo = (targetElement: HTMLElement, duration = 1000) => {
        const headerOffset = 80
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset
        const startPosition = window.scrollY
        const distance = targetPosition - startPosition
        let startTime: number | null = null

        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        }

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)
            const easedProgress = easeInOutCubic(progress)

            window.scrollTo(0, startPosition + distance * easedProgress)

            if (timeElapsed < duration) {
                requestAnimationFrame(animation)
            } else {
                targetElement.classList.add("scroll-highlight")
                setTimeout(() => {
                    targetElement.classList.remove("scroll-highlight")
                }, 1500)
            }
        }

        requestAnimationFrame(animation)
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault()

            if (pathname !== "/") {
                router.push("/" + href)
                return
            }

            const targetId = href.substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                smoothScrollTo(targetElement, 800)
            }

            setMobileMenuOpen(false)
        }
    }

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        if (pathname !== "/") {
            router.push("/")
        } else {
            const duration = 800
            const startPosition = window.scrollY
            let startTime: number | null = null

            const easeInOutCubic = (t: number): number => {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            }

            const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime
                const timeElapsed = currentTime - startTime
                const progress = Math.min(timeElapsed / duration, 1)
                const easedProgress = easeInOutCubic(progress)

                window.scrollTo(0, startPosition * (1 - easedProgress))

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation)
                }
            }

            requestAnimationFrame(animation)
        }
    }

    const isActive = (href: string) => {
        if (href.startsWith("#")) {
            return pathname === "/"
        }
        return pathname === href || pathname.startsWith(href)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl">
            <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative py-1",
                                isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                            )}
                            onClick={(e) => handleNavClick(e, item.href)}
                        >
                            {item.label}
                            {item.href === "/blog" && pathname.startsWith("/blog") && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground rounded-full" />
                            )}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <a
                        href="#"
                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                        onClick={handleLogoClick}
                    >
                        <ConstellationLogo size={36} />
                    </a>
                </div>

                {/* Mobile: Logo left, menu right */}
                <a href="#" className="md:hidden flex items-center" onClick={handleLogoClick}>
                    <ConstellationLogo size={32} />
                </a>

                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        className="text-foreground p-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl transition-all duration-300",
                    mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
            >
                <div className="px-6 py-4 flex flex-col gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors py-3",
                                isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                            )}
                            onClick={(e) => handleNavClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    )
}
