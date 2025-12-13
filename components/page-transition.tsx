"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"

interface PageTransitionProps {
    children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname()
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [displayChildren, setDisplayChildren] = useState(children)
    const previousPathname = useRef(pathname)

    useEffect(() => {
        if (pathname !== previousPathname.current) {
            setIsTransitioning(true)

            // Small delay to allow exit animation
            const timer = setTimeout(() => {
                setDisplayChildren(children)
                previousPathname.current = pathname

                // Remove transition class after enter animation
                const enterTimer = setTimeout(() => {
                    setIsTransitioning(false)
                }, 400)

                return () => clearTimeout(enterTimer)
            }, 50)

            return () => clearTimeout(timer)
        } else {
            setDisplayChildren(children)
        }
    }, [children, pathname])

    return (
        <div className={`page-transition-wrapper ${isTransitioning ? "page-enter" : "page-entered"}`}>
            {displayChildren}
        </div>
    )
}
