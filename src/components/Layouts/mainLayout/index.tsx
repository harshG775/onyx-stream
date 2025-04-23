import { TooltipProvider } from "@/components/ui/tooltip";
import MainNavbar from "./Navbar";

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <TooltipProvider>
                <MainNavbar>{children}</MainNavbar>
            </TooltipProvider>
        </>
    );
}
