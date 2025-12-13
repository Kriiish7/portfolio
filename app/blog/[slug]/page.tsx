import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NeuralNetworkBg } from "@/components/neural-network-bg"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

function extractTableOfContents(markdown: string) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: Array<{ id: string; text: string; level: number }> = []
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

export async function generateStaticParams() {
    const supabase = await createClient()
    const { data: posts } = await supabase.from("blog_posts").select("slug").eq("published", true)

    return posts?.map((post) => ({ slug: post.slug })) || []
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

    if (!post) {
        return { title: "Post Not Found" }
    }

    return {
        title: `${post.title} | Srikrishna Nethi`,
        description: post.description,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

    if (!post) {
        notFound()
    }

    const tableOfContents = extractTableOfContents(post.content)

    return (
        <main className="relative min-h-screen bg-background">
            <NeuralNetworkBg />
            <Navigation />
            <div className="relative z-10">
                <article className="pt-32 pb-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to blog
                        </Link>

                        <div className="flex gap-12">
                            <div className="flex-1 min-w-0">
                                <header className="mb-8">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <time dateTime={post.created_at}>
                                            {new Date(post.created_at).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </time>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
                                    {post.description && <p className="text-lg text-muted-foreground">{post.description}</p>}
                                </header>

                                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8">
                                    <MarkdownRenderer content={post.content} />
                                </div>
                            </div>

                            {tableOfContents.length > 0 && (
                                <aside className="hidden lg:block w-64 flex-shrink-0">
                                    <TableOfContents items={tableOfContents} />
                                </aside>
                            )}
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        </main>
    )
}
