import { createClient } from "@/lib/supabase/server"
import { Calendar, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-db"

export async function BlogSection() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3)

    const { data: allPosts } = await supabase.from("blog_posts").select("id").eq("published", true)

    return (
        <section id="blog" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Blog</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Thoughts on machine learning, deep learning, and my journey in tech
                    </p>
                </div>

                {!posts || posts.length === 0 ? (
                    <div className="text-center py-12 bg-card/50 backdrop-blur-sm border border-border rounded-xl">
                        <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-2">No blog posts yet</p>
                        <p className="text-sm text-muted-foreground">Start creating posts from the admin panel</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post: BlogPost) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <time dateTime={post.created_at}>
                                            {new Date(post.created_at).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </time>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    {post.description && <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>}
                                    <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read more <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {allPosts && allPosts.length > 3 && (
                            <div className="text-center mt-8">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    View all posts <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
