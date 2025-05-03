"use client";
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "../tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ListVideoIcon, Menu, MoveIcon, TvIcon, X } from "lucide-react";
import { Button } from "../button";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextProps | null>(null);
function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }

    return context;
}

const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        defaultOpen?: boolean;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
    }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === "function" ? value(open) : value;
            if (setOpenProp) {
                setOpenProp(openState);
            } else {
                _setOpen(openState);
            }

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextProps>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style,
                        } as React.CSSProperties
                    }
                    className={cn(
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
                <Overlay />
            </TooltipProvider>
        </SidebarContext.Provider>
    );
});
SidebarProvider.displayName = "SidebarProvider";

/************************************************/

const MainContent = ({ children }: { children: React.ReactNode }) => {
    const { open } = useSidebar();

    return <div className={`transition-[margin-left] duration-100 ${open ? "lg:ml-72" : ""}`}>{children}</div>;
};

const Sidebar = () => {
    const { open, toggleSidebar } = useSidebar();
    return (
        <aside
            className={`fixed left-0 top-0 lg:z-40 z-50 h-full w-72 bg-background text-foreground transition-transform duration-100 ${
                open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <nav>
                <div className="h-16 flex items-center gap-2 p-2">
                    <Button size="icon" variant="ghost" onClick={toggleSidebar}>
                        {open ? <X /> : <Menu />}
                    </Button>
                    <NavLogo />
                </div>
                <div className="flex flex-col p-2">
                    {StreamMode.map(({ id, name, Icon }) => (
                        <Button
                            key={id}
                            variant="ghost"
                            className="cursor-pointer font-bold text-medium flex justify-start gap-4"
                            asChild
                        >
                            <Link href={`/${id}`}>
                                <Icon className="size-4" />
                                {name}
                            </Link>
                        </Button>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

const TopNavbar = () => {
    const { open, toggleSidebar } = useSidebar();

    return (
        <header className="sticky top-0 z-40 bg-background text-foreground">
            <nav className="h-16 flex items-center gap-2 p-2">
                <Button size="icon" variant="ghost" onClick={toggleSidebar}>
                    {open ? <X /> : <Menu />}
                </Button>
                <NavLogo />
            </nav>
        </header>
    );
};

const Overlay = () => {
    const { open, toggleSidebar } = useSidebar();

    return (
        <div
            onClick={toggleSidebar}
            className={cn(
                "fixed inset-0 z-40 h-full w-full bg-black/50 transition-opacity duration-0",
                { "lg:opacity-0 opacity-100 lg:pointer-events-none pointer-events-auto": open },
                { "opacity-0 pointer-events-none": !open }
            )}
        />
    );
};

const StreamMode = [
    { name: "TV", id: "tv", Icon: TvIcon },
    { name: "Movie", id: "movie", Icon: MoveIcon },
    { name: "Anime", id: "anime", Icon: TvIcon },
    { name: "Live", id: "live", Icon: ListVideoIcon },
];

const NavLogo = () => <LogoIcon />;

const LogoIcon = () => (
    <Link href="/" className="group flex h-9 items-center rounded-md px-4 py-2 text-2xl font-bold cursor-pointer">
        <div className="text-primary">Onyx</div>
        Stream
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

/************************************************/
export {
    //context
    SidebarProvider,
    useSidebar,
    // components
    Sidebar,
    TopNavbar,
    MainContent,
    Overlay,
    NavLogo,
    StreamMode,
};
