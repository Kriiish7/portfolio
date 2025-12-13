import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"
import type { BlogPost } from "@/lib/blog-db"
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

export default async function AdminBlogPage() {
    const supabase = await createClient()

    const { data: posts, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Blog Admin</h1>
                    <Link href="/admin/blog/new">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Post
                        </Button>
                    </Link>
                </div>

                {error && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-6">
                        Error loading posts: {error.message}
                    </div>
                )}

                <div className="grid gap-4">
                    {posts?.map((post: BlogPost) => (
                        <Card key={post.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{post.title}</h3>
                                            {post.published ? (
                                                <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded">Published</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">Draft</span>
                                            )}
                                        </div>
                                        {post.description && <p className="text-muted-foreground text-sm mb-2">{post.description}</p>}
                                        <p className="text-xs text-muted-foreground">
                                            Created: {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {post.published && (
                                            <Link href={`/blog/${post.slug}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href={`/admin/blog/edit/${post.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {posts?.length === 0 && (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <p className="text-muted-foreground mb-4">No blog posts yet. Create your first one!</p>
                                <Link href="/admin/blog/new">
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create First Post
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}