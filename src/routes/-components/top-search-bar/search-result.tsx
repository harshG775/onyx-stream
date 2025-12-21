import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Placehold } from "@/lib/placehold"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { useState } from "react"

function ResultList({ items }: { items: any[] }) {
    if (items.length === 0) {
        return <p className="p-4 text-sm text-muted-foreground">No results found</p>
    }
    const placeholder = Placehold.create({ width: 300, height: 450, font: "playfair-display", format: "webp" })
    return (
        <ul className="grid gap-2 p-2">
            {items.map((item) => (
                <li key={`${item.media_type}-${item.id}`}>
                    <Link
                        to={`/${item.media_type === "movie" ? "movies" : "tv"}/$id`}
                        params={{
                            id: item.id,
                        }}
                        className="rounded-md border bg-background p-3 hover:bg-accent transition flex gap-2"
                    >
                        <img
                            src={getTMDBImageUrl(item.poster_path) || placeholder(item.title || item.name)}
                            alt={`${item.media_type}-${item.id}`}
                            className="size-16 object-cover rounded"
                        />
                        <div>
                            <p className="font-medium">{item.title || item.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{item.media_type}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

type Props = {
    query: string
    resetSearch: () => void
}

export function SearchResult({ query, resetSearch }: Props) {
    const [mediaType, setMediaType] = useState<"person" | "movie" | "tv" | "multi" | string>("multi")
    const { data, isLoading, isError } = useQuery({
        queryKey: ["search", query],
        queryFn: ({ signal }) => tmdb.searchMulti(query, 1, signal),
        enabled: query.length > 0,
    })

    if (query.length < 1) {
        return (
            <div className="bg-muted px-4 mb-4">
                <p className="text-sm text-muted-foreground p-4 text-center">
                    Try searching for a title movie or tv show
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

    const results = data.results ?? []
    const multi = results.filter((r) => r.media_type != "person")
    const movies = results.filter((r) => r.media_type === "movie")
    const tvShows = results.filter((r) => r.media_type === "tv")

    return (
        <Tabs value={mediaType} onValueChange={(value) => setMediaType(value)} className="w-full pt-2">
            <TabsList className="px-4 py-2 h-12 w-full  justify-start rounded-none overflow-x-auto">
                <TabsTrigger className="flex-none" value="multi">
                    All ({multi.length})
                </TabsTrigger>
                <TabsTrigger className="flex-none" value="movie">
                    Movies ({movies.length})
                </TabsTrigger>
                <TabsTrigger className="flex-none" value="tv">
                    TV Shows ({tvShows.length})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="multi" className="bg-muted max-h-96 overflow-y-auto">
                <ResultList items={multi} />
            </TabsContent>

            <TabsContent value="movie" className="bg-muted max-h-96 overflow-y-auto">
                <ResultList items={movies} />
            </TabsContent>

            <TabsContent value="tv" className="bg-muted max-h-96 overflow-y-auto">
                <ResultList items={tvShows} />
            </TabsContent>
            {results.length > 0 && (
                <Button asChild variant={"link"}>
                    <Link
                        to={"/search"}
                        search={{
                            query,
                            media_type: mediaType,
                        }}
                        onClick={() => {
                            resetSearch()
                        }}
                        className="text-sm"
                    >
                        View all result for <em>&quot;{query.slice(0, 24)}...&quot;</em>
                    </Link>
                </Button>
            )}
        </Tabs>
    )
}
