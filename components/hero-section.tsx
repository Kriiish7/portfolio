"use client"

import { ArrowDown } from "lucide-react"

export function HeroSection() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center relative px-6 pt-20">
            <div className="max-w-4xl mx-auto w-full">
                <div className="space-y-6">
                    <p className="text-primary font-mono text-sm tracking-wider uppercase">Machine Learning & Deep Learning</p>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                        Srikrishna Nethi
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">A-Level Student</p>

                    <div className="pt-4">
                        <p className="text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                            I'm a student passionate about artificial intelligence, with a deep interest in machine learning and deep
                            learning. I believe these technologies will shape the future, and I'm committed to being part of that
                            transformation.
                        </p>
                    </div>

                    <div className="pt-6 flex flex-wrap gap-3">
                        {["Python", "TensorFlow", "PyTorch", "Neural Networks", "Computer Vision"].map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </div>

                <a
                    href="#education"
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
                    aria-label="Scroll to education"
                >
                    <ArrowDown className="w-6 h-6" />
                </a>
            </div>
        </section>
    )
}