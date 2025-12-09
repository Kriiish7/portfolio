"use client"

import { useState, useEffect } from "react"
import { List } from "lucide-react"
import {cn} from "@/app/utils";

interface TableOfContentsItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "-80px 0px -80% 0px" },
        )

        items.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [items])

    if (items.length === 0) return null

    return (
        <nav className="sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-foreground">
                <List className="w-4 h-4" />
                <span>On this page</span>
            </div>
            <ul className="space-y-2 text-sm border-l border-border">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}>
                        <a
                            href={`#${item.id}`}
                            className={cn(
                                "block py-1 transition-colors border-l -ml-px",
                                activeId === item.id
                                    ? "text-primary border-primary"
                                    : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted-foreground",
                            )}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
