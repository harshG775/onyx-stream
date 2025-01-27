import Sidebar from "@/components/partials/Sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
export default function RootLayout({ children }) {
    return (
        <>
            <Sidebar>{children}</Sidebar>

            <div className="fixed bottom-4 right-4">
                <ModeToggle />
            </div>
        </>
    );
}
