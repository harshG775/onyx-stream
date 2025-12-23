import { Link } from "@tanstack/react-router"
import { TopSearchBar } from "./top-search-bar/search"
import { Logo } from "@/components/brand/logo"

export function TopNavbar() {
    return (
        <div className="z-40 sticky top-0 bg-card shadow">
            <nav className="max-w-384 mx-auto flex justify-between items-center px-3 sm:px-4 lg:px-6 py-2">
                <Link to="/">
                    <Logo />
                </Link>
                <TopSearchBar />
            </nav>
        </div>
    )
}
