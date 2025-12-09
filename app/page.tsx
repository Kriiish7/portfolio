import { NeuralNetworkBg } from "@/components/neural-network-bg"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { EducationSection } from "@/components/education-section"
import { InterestsSection } from "@/components/interests-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
    return (
        <main className="relative min-h-screen bg-background">
            <NeuralNetworkBg />
            <div className="relative z-10">
                <Navigation />
                <HeroSection />
                <EducationSection />
                <InterestsSection />
                <BlogSection />
                <ContactSection />
                <Footer />
            </div>
        </main>
    )
}
