"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBlogPost() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        published: false,
    })

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
    }

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const supabase = createClient()

        try {
            const { error: insertError } = await supabase.from("blog_posts").insert({
                title: formData.title,
                slug: formData.slug,
                description: formData.description || null,
                content: formData.content,
                published: formData.published,
            })

            if (insertError) throw insertError

            router.push("/admin/blog")
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create post")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container max-w-4xl mx-auto px-4">
                <Link
                    href="/admin/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Admin
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle>Create New Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    required
                                    placeholder="My Awesome Blog Post"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                    placeholder="my-awesome-blog-post"
                                />
                                <p className="text-sm text-muted-foreground">URL: /blog/{formData.slug || "slug"}</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="A brief description of your post"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    placeholder="Write your blog post in markdown..."
                                    rows={20}
                                    className="font-mono text-sm"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="h-4 w-4 rounded border-border"
                                />
                                <Label htmlFor="published" className="cursor-pointer">
                                    Publish immediately
                                </Label>
                            </div>

                            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

                            <div className="flex gap-3">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Creating..." : "Create Post"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
