import { Logo } from "@/components/brand/logo"
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function SearchHeader() {
    return (
        <SheetHeader className="py-2.75 px-4">
            <SheetTitle className="sr-only">Global search</SheetTitle>
            <SheetDescription className="sr-only">
                Search movies, shows, and content across Onyx Stream
            </SheetDescription>
            <Logo />
        </SheetHeader>
    )
}
