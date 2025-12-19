import { Link } from "@tanstack/react-router"
import { TopSearchBar } from "./top-search-bar/search"

export function TopNavbar() {
    return (
        <div className="sticky top-0 bg-sidebar shadow">
            <nav className="max-w-384 mx-auto flex justify-between items-center px-3 sm:px-4 lg:px-6 py-2">
                <Link to="/">
                    <span className="group inline-flex items-center text-xl font-bold">
                        <span className="text-primary">Onyx</span>
                        Stream
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="size-6 transition-colors duration-400 group-hover:text-primary"
                        >
                            <path fill="currentColor" d="m352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8..." />
                        </svg>
                    </span>
                </Link>
                <TopSearchBar />
            </nav>
        </div>
    )
}
