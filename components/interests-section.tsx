"use client"

import { Brain, Eye, Network, Cpu, LineChart, Sparkles } from "lucide-react"

const interestsSection = [
    {
        icon: Brain,
        title: "Deep Learning",
        description:
            "Exploring neural network architectures, from feedforward networks to transformers and attention mechanisms.",
    },
    {
        icon: Eye,
        title: "Computer Vision",
        description: "Understanding how machines can interpret and analyze visual data from the world around us.",
    },
    {
        icon: Network,
        title: "Neural Networks",
        description: "Building and training neural networks to solve complex pattern recognition problems.",
    },
    {
        icon: Cpu,
        title: "Natural Language Processing",
        description: "Fascinated by how AI can understand, interpret, and generate human language.",
    },
    {
        icon: LineChart,
        title: "Data Science",
        description: "Analyzing and visualizing data to extract meaningful insights and patterns.",
    },
    {
        icon: Sparkles,
        title: "Generative AI",
        description: "Interested in the creative applications of AI, from image generation to text synthesis.",
    },
]

export function InterestsSection() {
    return (
        <section id="interests" className="py-24 px-6 bg-card/50">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-[1px] bg-primary" />
                    <h2 className="text-sm font-mono text-primary uppercase tracking-wider">Interests</h2>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl">
                    My interestsSection lie at the intersection of mathematics, computer science, and artificial intelligence. I'm
                    particularly drawn to how machines can learn and make intelligent decisions.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interestsSection.map((interest, index) => (
                        <div
                            key={index}
                            className="group p-6 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <interest.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">{interest.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
