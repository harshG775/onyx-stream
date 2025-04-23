"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

type MainNavbarProps = {
    children: React.ReactNode;
};

export default function MainNavbar({ children }: MainNavbarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const pathname = usePathname();
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Header onToggle={toggleSidebar} />
            <main className={`transition-[margin-left] duration-100 ${isSidebarOpen ? "lg:ml-72" : ""}`}>
                {children}
            </main>
            <Overlay isOpen={isSidebarOpen} onClick={toggleSidebar} />
        </>
    );
}

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
    return (
        <aside
            className={`fixed left-0 top-0 z-40 h-full w-72 border-r bg-background text-foreground transition-transform duration-100 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <nav>
                <div className="h-16 flex items-center gap-2 p-2">
                    <Button size="icon" variant="ghost" onClick={toggleSidebar}>
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                    <NavLogo />
                </div>
                {StreamMode.map(({ id, name }) => (
                    <Button key={id} variant="link" className="cursor-pointer" asChild>
                        <Link href={`/${id}`}>{name}</Link>
                    </Button>
                ))}
            </nav>
        </aside>
    );
};

const Header = ({ onToggle }: { onToggle: () => void }) => {
    return (
        <header className="sticky top-0 z-30 border-b bg-background text-foreground">
            <nav className="h-16 flex items-center gap-2 p-2">
                <Button size="icon" variant="ghost" onClick={onToggle}>
                    <Menu />
                </Button>
                <NavLogo />
            </nav>
        </header>
    );
};

const Overlay = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className={`fixed inset-0 z-30 h-full w-full bg-black/50 transition-opacity duration-100 ${
                isOpen
                    ? "lg:opacity-0 opacity-100 lg:pointer-events-none pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        />
    );
};

const StreamMode = [
    { name: "TV", id: "tv" },
    { name: "Movie", id: "movie" },
    { name: "Anime", id: "anime" },
    { name: "Live", id: "live" },
];

const NavLogo = () => (
    <Tooltip delayDuration={1000}>
        <TooltipTrigger aria-label="OnyxStream-Logo" asChild>
            <LogoIcon />
        </TooltipTrigger>
        <TooltipContent>
            <p>OnyxStream</p>
        </TooltipContent>
    </Tooltip>
);

const LogoIcon = () => (
    <Link href="/" className="group flex h-9 items-center rounded-md px-4 py-2 text-2xl font-bold cursor-pointer">
        <div className="text-primary">Onyx</div>
        tream
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="640"
            height="512"
            viewBox="0 0 640 512"
            className="size-8 transition-colors duration-400 group-hover:text-primary group-focus-visible:text-primary"
        >
            <path
                fill="currentColor"
                d="m352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4l-43.2-32.4c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0h160c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48h-21.5c-17 0-33.3-6.7-45.3-18.7L480 160h-32v21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1c0 60.6-49.1 109.7-109.8 109.7H32.3c-3.3 0-6.6-.4-9.6-1.4c-9.2-2.8-16.7-9.6-20.3-18.5C1 488.7.2 485.2 0 481.4c-.2-3.7.3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1z"
            />
        </svg>
    </Link>
);
