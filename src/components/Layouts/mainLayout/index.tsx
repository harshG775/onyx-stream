import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import Link from "next/link";
import { BananaIcon, MoveIcon, TvIcon, TvMinimalIcon } from "lucide-react";
import { CustomTrigger } from "./CustomTrigger";
import Search from "@/components/Search/Search";
import { AppLogo } from "@/components/ui/AppLogo";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <TopNavbar />
            <AppSidebar />
            <main className="mt-16 w-full">{children}</main>
        </SidebarProvider>
    );
}
export function TopNavbar() {
    return (
        <nav className="bg-background text-foreground fixed left-0 right-0 top-0 z-50 h-16 flex items-center gap-1">
            <div className="w-[calc(var(--sidebar-width)-4px)] p-2">
                <SidebarGroup className="flex-row items-center gap-2">
                    <CustomTrigger />
                    <AppLogo href="/" />
                </SidebarGroup>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2 p-4">
                <Search />
                <div className="h-8 w-8 rounded-full border-2 border-primary"></div>
            </div>
        </nav>
    );
}
const StreamMode = [
    { name: "TV", id: "tv", Icon: TvMinimalIcon },
    { name: "Movie", id: "movie", Icon: MoveIcon },
    { name: "Anime", id: "anime", Icon: BananaIcon },
    { name: "Live", id: "live", Icon: TvIcon },
];
function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-none">
            <SidebarHeader className="flex md:hidden bg-background text-foreground">
                <SidebarGroup className="flex-row items-center gap-2">
                    <CustomTrigger />
                    <AppLogo href="/" />
                </SidebarGroup>
            </SidebarHeader>
            <div className="h-16 md:flex hidden"></div>
            <SidebarContent className="bg-background text-foreground">
                <SidebarGroup>
                    <SidebarGroupLabel>Stream</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {StreamMode.map(({ id, name, Icon }) => (
                                <SidebarMenuItem key={id}>
                                    <SidebarMenuButton asChild tooltip={name}>
                                        <Link href={`/${id}`}>
                                            <Icon className="size-4" />
                                            <span>{name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
