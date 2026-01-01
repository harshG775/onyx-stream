import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { SearchHeader } from "./search-header"
import { SearchInput } from "./search-input"
import { SearchResult } from "./search-result"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { useTopSearchBar } from "@/stores"

export function TopSearchBar() {
    const isSearchBarOpen = useTopSearchBar((state) => state.isSearchBarOpen)
    const searchBarOpenState = useTopSearchBar(({ setSearchBarState }) => setSearchBarState)
    const [query, setQuery] = useState("")
    const [debounceQuery] = useDebounce(query, 400)

    const resetSearch = () => {
        setQuery("")
        searchBarOpenState(false)
    }

    return (
        <Sheet open={isSearchBarOpen} onOpenChange={searchBarOpenState}>
            <SheetTrigger asChild>
                <Button variant="secondary">
                    <SearchIcon />
                    <span className="sr-only sm:not-sr-only">Search...</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="top" className="data-[state=closed]:duration-200 data-[state=open]:duration-400">
                <div className="w-full max-w-8xl mx-auto ">
                    <SearchHeader />
                    <SearchInput query={query} onQueryChange={setQuery} resetSearch={resetSearch} />
                    <SearchResult query={debounceQuery} resetSearch={resetSearch} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
