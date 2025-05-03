import MainNavbar from "./Navbar";

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <MainNavbar>{children}</MainNavbar>
        </>
    );
}
