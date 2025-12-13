export interface BlogPost {
    id: string
    slug: string
    title: string
    description: string | null
    content: string
    published: boolean
    created_at: string
    updated_at: string
}

export interface BlogPostInput {
    slug: string
    title: string
    description?: string
    content: string
    published: boolean
}