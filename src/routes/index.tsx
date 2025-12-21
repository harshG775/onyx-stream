import { useQuery } from "@tanstack/react-query"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { RootHeroSection } from "./-components/sections/root-hero-section"
import { FlatList } from "@/components/flat-list"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/")({
    // ssr: false,

    pendingComponent: () => (
        <div className="grid place-content-center p-4">
            <Spinner className="size-6" />
        </div>
    ),
    component: RootPage,
})

function RootPage() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["trending", "movies"],
        queryFn: () => tmdb.getTrendingMovies("day", 1),
    })

    const mediaPath: "movies" | "tv" = "movies"
    return (
        <main>
            <RootHeroSection />
            <FlatList
                title="Trending Movies"
                data={data?.results || []}
                isLoading={isLoading}
                isError={isError}
                skeletonCount={12}
                itemClassName="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                keyExtractor={(item) => item.id.toString()}
                renderSkeleton={() => (
                    <div className="space-y-2">
                        <Skeleton className="aspect-2/3 w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                )}
                renderError={() => (
                    <div className="space-y-2">
                        <Skeleton className="aspect-2/3 w-full rounded-lg bg-destructive" />
                        <Skeleton className="h-4 w-3/4 bg-destructive" />
                    </div>
                )}
                renderItem={(media) => (
                    <Link to={`/${mediaPath}/$id`} params={{ id: media.id.toString() }} className="group">
                        <img
                            src={
                                getTMDBImageUrl(media.poster_path, "w185") ||
                                "https://placehold.co/400x600?text=No+Image"
                            }
                            className="w-full rounded-lg transition-opacity group-hover:opacity-90"
                        />
                        <h3 className="text-sm font-semibold line-clamp-2">{media.title}</h3>
                    </Link>
                )}
            />
        </main>
    )
}
