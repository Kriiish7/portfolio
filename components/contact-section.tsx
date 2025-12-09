"use client"

import { Mail, ArrowUpRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "./icons"

interface ContactLink {
    icon: "mail" | "github" | "linkedin"
    label: string
    value: string
    href: string
}

const contactLinks: ContactLink[] = [
    {
        icon: "mail",
        label: "Email",
        value: "Get in touch",
        href: "srikrishnanethi777@gmail.com",
    },
    {
        icon: "github",
        label: "GitHub",
        value: "@Kriiish7",
        href: "https://github.com/Kriiish7",
    },
    {
        icon: "linkedin",
        label: "LinkedIn",
        value: "Connect with me",
        href: "https://www.linkedin.com/in/srikrishna-nethi-150153380/",
    },
]

function ContactIcon({ icon, className }: { icon: ContactLink["icon"]; className?: string }) {
    if (icon === "mail") return <Mail className={className} />
    if (icon === "github") return <GithubIcon className={className} />
    if (icon === "linkedin") return <LinkedinIcon className={className} />
    return null
}

export function ContactSection() {
    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-px bg-primary" />
                    <h2 className="text-sm font-mono text-primary uppercase tracking-wider">Contact</h2>
                </div>

                <div className="space-y-6">
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                        If you would like to discuss machine learning, collaborate on a project, or just say hi, I&#39;m always happy to
                        connect.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 pt-6">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                                    <ContactIcon icon={link.icon} className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-muted-foreground">{link.label}</p>
                                    <p className="text-foreground truncate">{link.value}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
