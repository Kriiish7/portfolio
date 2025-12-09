"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Mail, Menu, X } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import {cn} from "@/app/utils";

interface NavItem {
    label: string
    href: string
}

interface SocialLink {
    icon: "github" | "linkedin" | "mail"
    href: string
    label: string
}

const navItems: NavItem[] = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Interests", href: "#interests" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
]

const socialLinks: SocialLink[] = [
    { icon: "github", href: "https://github.com", label: "GitHub" },
    { icon: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    { icon: "mail", href: "mailto:hello@example.com", label: "Email" },
]

function SocialIcon({ icon, className }: { icon: SocialLink["icon"]; className?: string }) {
    if (icon === "mail") return <Mail className={className} />
    if (icon === "github") return <GithubIcon className={className} />
    if (icon === "linkedin") return <LinkedinIcon className={className} />
    return null
}

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

        // Custom easing function - easeInOutCubic for smooth deceleration
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
                // Add highlight animation to target section
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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="text-lg font-semibold text-foreground" onClick={handleLogoClick}>
                    SN
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={(e) => handleNavClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={link.label}
                        >
                            <SocialIcon icon={link.icon} className="w-5 h-5" />
                        </a>
                    ))}
                    <ThemeToggle />
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300",
                    mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
            >
                <div className="px-6 py-4 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground hover:text-primary transition-colors py-2"
                            onClick={(e) => handleNavClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label={link.label}
                            >
                                <SocialIcon icon={link.icon} className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}
