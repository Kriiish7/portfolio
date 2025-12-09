"use client"

import { useMemo } from "react"

interface MarkdownRendererProps {
    content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const html = useMemo(() => {
        return parseMarkdown(content)
    }, [content])

    return (
        <div
            className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-24 prose-headings:font-semibold
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-foreground
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-foreground prose-h2:border-b prose-h2:border-border prose-h2:pb-2
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
        prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-lg
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
        prose-li:marker:text-primary
        prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

function parseMarkdown(markdown: string): string {
    let html = markdown

    // Code blocks (must be processed before inline code)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="language-${lang || "text"}">${escapeHtml(code.trim())}</code></pre>`
    })

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

    // Headers with IDs for anchor links
    html = html.replace(/^######\s+(.+)$/gm, (_, text) => {
        const id = generateId(text)
        return `<h6 id="${id}">${text}</h6>`
    })
    html = html.replace(/^#####\s+(.+)$/gm, (_, text) => {
        const id = generateId(text)
        return `<h5 id="${id}">${text}</h5>`
    })
    html = html.replace(/^####\s+(.+)$/gm, (_, text) => {
        const id = generateId(text)
        return `<h4 id="${id}">${text}</h4>`
    })
    html = html.replace(/^###\s+(.+)$/gm, (_, text) => {
        const id = generateId(text)
        return `<h3 id="${id}">${text}</h3>`
    })
    html = html.replace(/^##\s+(.+)$/gm, (_, text) => {
        const id = generateId(text)
        return `<h2 id="${id}">${text}</h2>`
    })
    html = html.replace(/^#\s+(.+)$/gm, (_, text) => {
        const id = generateId(text)
        return `<h1 id="${id}">${text}</h1>`
    })

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")
    html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>")
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>")
    html = html.replace(/_(.+?)_/g, "<em>$1</em>")

    // Links
    html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    // Images
    html = html.replace(/!\[([^\]]*)\]$$([^)]+)$$/g, '<img src="$2" alt="$1" class="rounded-lg" />')

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote><p>$1</p></blockquote>")

    // Horizontal rules
    html = html.replace(/^---$/gm, "<hr />")

    // Unordered lists
    html = html.replace(/^[*-]\s+(.+)$/gm, "<li>$1</li>")
    html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")

    // Ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")

    // Paragraphs (process remaining text blocks)
    html = html
        .split(/\n\n+/)
        .map((block) => {
            block = block.trim()
            if (!block) return ""
            if (
                block.startsWith("<h") ||
                block.startsWith("<ul") ||
                block.startsWith("<ol") ||
                block.startsWith("<pre") ||
                block.startsWith("<blockquote") ||
                block.startsWith("<hr")
            ) {
                return block
            }
            return `<p>${block.replace(/\n/g, "<br />")}</p>`
        })
        .join("\n")

    return html
}

function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}
