import Sidebar from "@/components/partials/Sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
    return (
        <>
            <Sidebar>{children}</Sidebar>

            <div className="fixed bottom-4 right-4 z-50">
                <ModeToggle />
            </div>
            <Toaster />
        </>
    );
}
