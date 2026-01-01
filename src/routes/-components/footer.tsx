export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-muted pt-8">
                    <p className="text-center text-muted-foreground">
                        © {currentYear} Onyx Stream. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}