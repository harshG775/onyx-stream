import { MainContent, Sidebar, SidebarProvider, TopNavbar} from "@/components/ui/navbar/Navbar-context";

type MainNavbarProps = {
    children: React.ReactNode;
};

export default function MainNavbar({ children }: MainNavbarProps) {
    return (
        <SidebarProvider>
            <Sidebar />
            <TopNavbar />
            <MainContent>{children}</MainContent>
        </SidebarProvider>
    );
}
