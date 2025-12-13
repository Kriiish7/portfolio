import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NeuralNetworkBg } from "@/components/neural-network-bg"
import { Calendar, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-db"

export const metadata = {
    title: "Blog | Srikrishna Nethi",
    description: "Thoughts on machine learning, deep learning, and my journey in tech",
}

export default async function BlogPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

    return (
        <main className="relative min-h-screen bg-background">
            <NeuralNetworkBg />
            <Navigation />
            <div className="relative z-10">
                <div className="pt-32 pb-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to home
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
                        <p className="text-lg text-muted-foreground mb-12">
                            Thoughts on machine learning, deep learning, and my journey in tech
                        </p>

                        {!posts || posts.length === 0 ? (
                            <div className="text-center py-16 bg-card/50 backdrop-blur-sm border border-border rounded-xl">
                                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h2 className="text-xl font-semibold text-foreground mb-2">No blog posts yet</h2>
                                <p className="text-muted-foreground mb-4">Start creating posts from the admin panel</p>
                                <Link href="/admin/blog" className="text-primary hover:underline">
                                    Go to Admin Panel
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post: BlogPost) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={post.created_at}>
                                                {new Date(post.created_at).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </time>
                                        </div>
                                        <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        {post.description && <p className="text-muted-foreground">{post.description}</p>}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    )
}
