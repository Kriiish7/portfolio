import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
    slug: string
    title: string
    date: string
    description: string
    content: string
}

export interface TableOfContentsItem {
    id: string
    text: string
    level: number
}

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) {
        return []
    }

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"))

    const posts = files.map((file) => {
        const slug = file.replace(/\.md$/, "")
        const filePath = path.join(BLOG_DIR, file)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString(),
            description: data.description || "",
            content,
        }
    })

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(BLOG_DIR, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        description: data.description || "",
        content,
    }
}

export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TableOfContentsItem[] = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")

        items.push({ id, text, level })
    }

    return items
}
