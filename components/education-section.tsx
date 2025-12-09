"use client"

import {GraduationCap, MapPin, Calendar} from "lucide-react"

const education = [
    {
        period: "Sep 2025 — Present",
        institution: "Herschel Grammar School",
        description:
            "Currently pursuing A-Levels with a focus on subjects that complement my interest in machine learning and artificial intelligence.\nSubjects: Maths, Further Maths, Physics, Computer Science",
        location: "Slough, UK",
        current: true,
    },
    {
        period: "2020 — 2025",
        institution: "Maiden Erlegh School in Reading",
        description:
            "Completed secondary education, developing a strong foundation in mathematics and computer science that sparked my passion for AI and deep learning.\nGCSE Grades: 9888888777",
        location: "Reading, UK",
        current: false,
    },
]

export function EducationSection() {
    return (
        <section id="education" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-px bg-primary"/>
                    <h2 className="text-sm font-mono text-primary uppercase tracking-wider">Education</h2>
                </div>

                <div className="space-y-12">
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            className="group relative pl-8 border-l-2 border-border hover:border-primary transition-colors"
                        >
                            {edu.current && (
                                <span
                                    className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full animate-pulse"/>
                            )}
                            {!edu.current &&
                                <span className="absolute -left-[5px] top-1 w-2 h-2 bg-muted-foreground rounded-full"/>}

                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4"/>
                      {edu.period}
                  </span>
                                    <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4"/>
                                        {edu.location}
                  </span>
                                </div>

                                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-primary"/>
                                    {edu.institution}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
