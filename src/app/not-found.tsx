import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="bg-background px-4 grid place-items-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-2">Page Not Found</p>
                <p className="text-sm text-muted-foreground mb-6">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        </main>
    );
}
