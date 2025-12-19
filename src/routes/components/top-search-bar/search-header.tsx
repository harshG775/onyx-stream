import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function SearchHeader() {
    return (
        <SheetHeader className="py-2.75 px-4">
            <SheetTitle className="sr-only">Global search</SheetTitle>
            <SheetDescription className="sr-only">
                Search movies, shows, and content across Onyx Stream
            </SheetDescription>

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
        </SheetHeader>
    )
}
