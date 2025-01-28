import { AlignLeft } from "lucide-react";
import { Button } from "../ui/button";
import TopNavbar from "./TopNavbar";
import useZustandStore from "@/store/zustand/useZustandStore";
import { useLayoutEffect } from "react";

export default function Sidebar({ children }) {
    const { isSidebarOpen } = useZustandStore((state) => state);
    const { setIsSidebarOpen } = useZustandStore((state) => state);
    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const handleMediaQueryChange = (e) => {
            setIsSidebarOpen(e.matches);
        };
        // Set the initial state
        setIsSidebarOpen(mediaQuery.matches);
        // Listen for changes
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, [setIsSidebarOpen]);
    return (
        <>
            <div
                className={`
                    z-50 fixed inset-0 h-screen w-72 bg-background transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="px-4 py-2 ${}">
                    <div>
                        <Button
                            onClick={() => setIsSidebarOpen(false)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 [&_svg]:size-6"
                        >
                            <AlignLeft />
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isSidebarOpen ? "z-40 fixed inset-0 bg-background opacity-[0.4]" : "opacity-0"
                } transition-opacity duration-300 md:hidden`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            <TopNavbar
                className={`${
                    isSidebarOpen ? "md:ml-72 md:h-auto" : "md:ml-0"
                } transition-all duration-300 ease-in-out z-10 sticky top-0 bg-background `}
            />

            <div
                className={`${
                    isSidebarOpen ? "md:ml-72 md:h-auto" : "md:ml-0"
                } transition-all duration-300 ease-in-out`}
            >
                {children}
            </div>
        </>
    );
}
