import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NeuralNetworkBg } from "@/components/neural-network-bg"
import { Calendar, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import {getAllPosts} from "@/app/blog";

export const metadata = {
    title: "Blog | Srikrishna Nethi",
    description: "Thoughts on machine learning, deep learning, and my journey in tech",
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <main className="relative min-h-screen bg-background">
            <NeuralNetworkBg />
            <div className="relative z-10">
                <Navigation />

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

                        {posts.length === 0 ? (
                            <div className="text-center py-16 bg-card/50 backdrop-blur-sm border border-border rounded-xl">
                                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h2 className="text-xl font-semibold text-foreground mb-2">No blog posts yet</h2>
                                <p className="text-muted-foreground mb-4">Add markdown files to get started</p>
                                <code className="text-sm text-primary bg-muted px-3 py-1.5 rounded">content/blog/your-post.md</code>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </time>
                                        </div>
                                        <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-muted-foreground">{post.description}</p>
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
