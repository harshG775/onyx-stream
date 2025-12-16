import { Button } from "@/components/ui/button"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight } from "lucide-react"


function RootPage() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["trending", "movies"],
        queryFn: () => tmdb.getTrendingMovies("day", 1),
    })

    return (
        <main>
            <section>
                <div>Main Content</div>
            </section>
            <div className="px-3 sm:px-4 lg:px-6   py-3 sm:py-4 lg:py-6">
                <section>
                    <div className="flex items-center justify-between">
                        <h2 className="scroll-m-20 pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
                            TrendingMovies
                        </h2>
                        <div className="flex items-center gap-1 font-semibold">
                            <Button variant={"ghost"} size={"icon"}>
                                <ChevronLeft />
                            </Button>
                            <span>Swipe</span>
                            <Button variant={"ghost"} size={"icon"}>
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {!isLoading &&
                            data?.results.map((media, idx) => {
                                return (
                                    <Link
                                        to={`movies/${media?.id}`}
                                        key={`${idx}-${media?.id}`}
                                        className="shrink-0 max-w-44 group"
                                    >
                                        <img
                                            src={
                                                getTMDBImageUrl(media.poster_path, "w185") ||
                                                "https://placehold.co/400x600?text=No+Image"
                                            }
                                            alt={`poster_path-${media.title}`}
                                            className="rounded-lg transition-all group-hover:opacity-90"
                                        />
                                        <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">
                                            <div className="line-clamp-2">{media.title}</div>
                                        </h3>
                                    </Link>
                                )
                            })}
                    </div>
                </section>
            </div>
        </main>
    )
}
export const Route = createFileRoute("/")({ component: RootPage })
