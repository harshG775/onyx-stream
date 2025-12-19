"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { SearchHeader } from "./search-header"
import { SearchInput } from "./search-input"
import { SearchResult } from "./search-result"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopSearchBar() {
    const [query, setQuery] = useState("")

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary">
                    <SearchIcon />
                    <span className="sr-only sm:not-sr-only">Search...</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="top" className="gap-0 data-[state=closed]:duration-200 data-[state=open]:duration-400">
                <SearchHeader />

                <SearchInput query={query} onQueryChange={setQuery} />

                <SearchResult query={query} />
            </SheetContent>
        </Sheet>
    )
}
