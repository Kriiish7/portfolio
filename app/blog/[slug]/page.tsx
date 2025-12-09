import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NeuralNetworkBg } from "@/components/neural-network-bg"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {extractTableOfContents, getAllPosts, getPostBySlug} from "@/app/blog";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPostBySlug(slug)

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
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const tableOfContents = extractTableOfContents(post.content)

    return (
        <main className="relative min-h-screen bg-background">
            <NeuralNetworkBg />
            <div className="relative z-10">
                <Navigation />

                <article className="pt-32 pb-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to blog
                        </Link>

                        <div className="flex gap-12">
                            {/* Main content */}
                            <div className="flex-1 min-w-0">
                                <header className="mb-8">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString("en-GB", {
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

                            {/* Sidebar with Table of Contents */}
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
