"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditBlogPost() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        published: false,
    })

    useEffect(() => {
        const fetchPost = async () => {
            const supabase = createClient()
            const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

            if (error) {
                setError("Failed to load post")
                setIsFetching(false)
                return
            }

            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    description: data.description || "",
                    content: data.content,
                    published: data.published,
                })
            }
            setIsFetching(false)
        }

        fetchPost()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const supabase = createClient()

        try {
            const { error: updateError } = await supabase
                .from("blog_posts")
                .update({
                    title: formData.title,
                    slug: formData.slug,
                    description: formData.description || null,
                    content: formData.content,
                    published: formData.published,
                })
                .eq("id", id)

            if (updateError) throw updateError

            router.push("/admin/blog")
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update post")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return

        setIsLoading(true)
        const supabase = createClient()

        try {
            const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", id)

            if (deleteError) throw deleteError

            router.push("/admin/blog")
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete post")
            setIsLoading(false)
        }
    }

    if (isFetching) {
        return (
            <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        )
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
                        <CardTitle>Edit Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                                    Published
                                </Label>
                            </div>

                            {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

                            <div className="flex gap-3">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                    className="ml-auto"
                                >
                                    Delete Post
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
