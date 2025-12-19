import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { SearchHeader } from "./search-header"
import { SearchInput } from "./search-input"
import { SearchResult } from "./search-result"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"

export function TopSearchBar() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [debounceQuery] = useDebounce(query, 400)

    const resetSearch = () => {
        setQuery("")
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="secondary">
                    <SearchIcon />
                    <span className="sr-only sm:not-sr-only">Search...</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="top" className="data-[state=closed]:duration-200 data-[state=open]:duration-400">
                <SearchHeader />
                <SearchInput query={query} onQueryChange={setQuery} resetSearch={resetSearch} />
                <SearchResult query={debounceQuery} resetSearch={resetSearch} />
            </SheetContent>
        </Sheet>
    )
}
