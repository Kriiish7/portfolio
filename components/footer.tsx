export function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-border">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p>© 2025 Srikrishna Nethi</p>
                <p className="flex items-center gap-1">
                    Built with curiosity and
                    <span className="text-primary">machine learning</span>
                    in mind
                </p>
            </div>
        </footer>
    )
}