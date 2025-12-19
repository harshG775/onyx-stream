"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tmdb } from "@/lib/services/tmdb"
import { useQuery } from "@tanstack/react-query"

function ResultList({ items }: { items: any[] }) {
    if (items.length === 0) {
        return <p className="p-4 text-sm text-muted-foreground">No results found</p>
    }

    return (
        <ul className="grid gap-2 p-2">
            {items.map((item) => (
                <li
                    key={`${item.media_type}-${item.id}`}
                    className="rounded-md border bg-background p-3 hover:bg-accent transition"
                >
                    <p className="font-medium">{item.title || item.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.media_type}</p>
                </li>
            ))}
        </ul>
    )
}

type Props = {
    query: string
}

export function SearchResult({ query }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["search", query],
        queryFn: ({ signal }) => tmdb.searchMulti(query, 1, signal),
        enabled: query.length > 0,
    })

    if (query.length < 1) {
        return (
            <div className="bg-muted px-4 mb-4">
                <p className="text-sm text-muted-foreground p-4 text-center">
                    Try searching for a title, genre, or person.
                </p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="bg-muted px-4 mb-4">
                <p className="p-4 text-sm text-muted-foreground">Searching…</p>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="bg-muted px-4 mb-4">
                <p className="p-4 text-sm text-destructive">Failed to load results</p>
            </div>
        )
    }

    const allResults = data.results ?? []
    const movies = allResults.filter((r) => r.media_type === "movie")
    const tvShows = allResults.filter((r) => r.media_type === "tv")

    return (
        <div className="bg-muted px-4 mb-4">
            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All ({allResults.length})</TabsTrigger>
                    <TabsTrigger value="movie">Movies ({movies.length})</TabsTrigger>
                    <TabsTrigger value="tv">TV Shows ({tvShows.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="max-h-96 overflow-y-auto">
                    <ResultList items={allResults} />
                </TabsContent>

                <TabsContent value="movie" className="max-h-96 overflow-y-auto">
                    <ResultList items={movies} />
                </TabsContent>

                <TabsContent value="tv" className="max-h-96 overflow-y-auto">
                    <ResultList items={tvShows} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
