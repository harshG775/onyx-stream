import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Link } from "@tanstack/react-router"
import { Search } from "lucide-react"

interface SearchInputProps {
    query: string
    onQueryChange: (value: string) => void
}

export function SearchInput({ query, onQueryChange }: SearchInputProps) {
    return (
        <div className="px-4 mb-4 flex gap-2">
            <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:ring-[1px] has-[[data-slot=input-group-control]:focus-visible]:border-primary/50">
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>

                <InputGroupInput
                    id="search"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="pr-20 rounded-md"
                />

                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>

            <Button asChild>
                <Link to={"/search"} search={{ query }}>
                    <Search />
                    <span className="sr-only sm:not-sr-only">Search</span>
                </Link>
            </Button>
        </div>
    )
}
