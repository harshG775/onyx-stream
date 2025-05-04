"use client";
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "../tooltip";
import { cn } from "@/lib/utils";
import { PanelLeft} from "lucide-react";
import { Button } from "../button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../sheet";

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
                    className={cn(className)}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    );
});
SidebarProvider.displayName = "SidebarProvider";

/************************************************/

const MainContent = ({ children }: { children: React.ReactNode }) => {
    const { open } = useSidebar();

    return <div className={`transition-[margin-left] ease-in-out duration-300 ${open ? "lg:ml-72" : ""}`}>{children}</div>;
};

type SidebarProps = {
    children?: React.ReactNode;
    side?: "left" | "right";
};
const Sidebar = ({ children, side = "left" }: SidebarProps) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                        } as React.CSSProperties
                    }
                    side={side}
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
                    </SheetHeader>
                    <div className="flex h-full w-full flex-col">{children}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className={`fixed left-0 top-0 lg:z-40 z-50 h-full w-72 bg-background text-foreground transition-transform ease-in-out duration-300 ${
                state === "collapsed" ? "-translate-x-full" : "translate-x-0"
            }`}
        >
            {children}
        </div>
    );
};
function SidebarHeader({ children }: { children?: React.ReactNode }) {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="h-16 flex items-center gap-2 p-2">
            <Button size="icon" variant="ghost" onClick={toggleSidebar}>
                <PanelLeft />
            </Button>
            {children}
        </div>
    );
}

const TopNavbar = ({ children }: { children?: React.ReactNode }) => {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="sticky top-0 z-40 bg-background text-foreground h-16 flex items-center gap-2 p-2">
            <Button size="icon" variant="ghost" onClick={toggleSidebar}>
                <PanelLeft />
            </Button>
            {children}
        </header>
    );
};
/************************************************/
export {
    //context
    SidebarProvider,
    useSidebar,
    // components
    Sidebar,
    SidebarHeader,
    TopNavbar,
    MainContent,
};
