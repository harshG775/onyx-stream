import TopNavbar from "./TopNavbar";
import useZustandStore from "@/store/zustand/useZustandStore";
import { useLayoutEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function Sidebar({ children }) {
    const { isSidebarOpen } = useZustandStore((state) => state);
    const { setIsSidebarOpen } = useZustandStore((state) => state);
    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        const handleMediaQueryChange = (e) => {
            // setIsSidebarOpen(e.matches);
            if (!e.matches) {
                setIsSidebarOpen(e.matches);
            }
        };
        // Set the initial state
        // setIsSidebarOpen(mediaQuery.matches);
        // Listen for changes
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, [setIsSidebarOpen]);
    return (
        <>
            <TopNavbar className={`z-50 fixed top-0 left-0 right-0 h-14 bg-background`} />
            <>
                <div
                    className={`
                    pt-14 flex flex-col z-40 fixed inset-0 h-screen w-72 bg-background transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                >
                    <ScrollArea className="px-4 py-0">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="h-20">
                                item
                            </div>
                        ))}
                        <div>last</div>
                    </ScrollArea>
                </div>
                <div
                    className={`${
                        isSidebarOpen ? "z-40 fixed inset-0 bg-background opacity-[0.4]" : "opacity-0"
                    } transition-all duration-300 lg:hidden`}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            </>
            <div
                className={`${
                    isSidebarOpen ? "lg:ml-72 lg:h-auto" : "lg:ml-0"
                } transition-all duration-300 ease-in-out`}
            >
                {children}
            </div>
        </>
    );
}
