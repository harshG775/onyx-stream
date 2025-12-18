import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { formatDate, formatRuntime, sharePage } from "@/lib/utils"
import { MovieDetails } from "@/types/tmdb.types"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { Calendar, Clock, Tag, Globe, Flag, Building2, Play, Youtube, Bookmark, Share2 } from "lucide-react"
import { toast } from "sonner"

export const Route = createFileRoute("/movies/$id")({
    loader: async ({ params, location }) => {
        const id = Number(params.id)

        if (Number.isNaN(id)) {
            throw notFound()
        }

        try {
            const details = await tmdb.getMovieDetails(id)
            if (!details) {
                throw notFound()
            }

            return { ...details, host: location.url.origin }
        } catch (error) {
            if ((error as any)?.response?.status === 404) {
                throw notFound()
            }

            throw error
        }
    },

    head: ({ loaderData }) => {
        if (!loaderData) return {}

        const title = `OnyxStream | ${loaderData.title} (${loaderData.release_date?.slice(0, 4)})`
        const description = loaderData.overview || `Details and information about ${loaderData.title}`

        const poster = getTMDBImageUrl(loaderData.poster_path, "w780") || undefined

        const url = `${loaderData.host}/movies/${loaderData.id}`

        return {
            meta: [
                // SEO
                { title: title },
                { name: "description", content: description },

                // Open Graph
                { property: "og:type", content: "video.movie" },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
                { property: "og:image", content: poster },
                { property: "og:url", content: url },

                // Twitter
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: description },
                { name: "twitter:image", content: poster },
                { name: "twitter:url", content: url },
            ],
            links: [
                {
                    rel: "canonical",
                    href: url,
                },
            ],
        }
    },
    pendingComponent: MovieDetailsSkeleton,
    component: RouteComponent,
})

function MovieDetailsSkeleton() {
    return (
        <main className="flex flex-col gap-4 xl:flex-row px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
            {/* Left section */}
            <section className="flex-2 space-y-4">
                {/* Backdrop */}
                <Skeleton className="w-full h-55 sm:sm:h-80 lg:h-105 rounded-2xl" />

                {/* Buttons */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <Skeleton className="h-11 w-28 rounded-lg" />
                    <Skeleton className="h-11 w-28 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-full ml-auto" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                {/* Title */}
                <Skeleton className="h-8 w-3/4" />
            </section>

            {/* Right section */}
            <section className="flex-1 space-y-4">
                <Skeleton className="h-6 w-24" />

                <div className="space-y-4 p-4 border rounded-2xl">
                    {/* Tagline */}
                    <Skeleton className="h-6 w-4/5" />

                    {/* Overview */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />

                    {/* Meta rows */}
                    <MetaRowSkeleton />
                    <MetaRowSkeleton />
                    <MetaRowSkeleton />
                    <MetaRowSkeleton />
                    <MetaRowSkeleton />
                    <MetaRowSkeleton />
                </div>
            </section>
        </main>
    )
}

function MetaRowSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-40" />
        </div>
    )
}

type MetaRowProps = {
    icon: React.ReactNode
    label: string
    value: string | React.ReactNode
}

const MetaRow: React.FC<MetaRowProps> = ({ icon, label, value }) => (
    <div className="flex flex-col">
        <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-muted-foreground text-sm">{value}</div>
    </div>
)
function RouteComponent() {
    const loaderData: MovieDetails = Route.useLoaderData()
    return (
        <main className="flex flex-col gap-4 xl:flex-row sm:px-4 lg:px-6 sm:py-4 lg:py-6">
            <section className="flex-2 space-y-2">
                <picture className="w-full aspect-video object-cover order sm:rounded-2xl shadow">
                    <source
                        media="(max-width: 640px)"
                        srcSet={getTMDBImageUrl(loaderData.backdrop_path, "w780") || ""}
                    />
                    <source
                        media="(max-width: 1024px)"
                        srcSet={getTMDBImageUrl(loaderData.backdrop_path, "w1280") || ""}
                    />
                    <img
                        src={getTMDBImageUrl(loaderData.backdrop_path, "original") || ""}
                        alt={`Backdrop of ${loaderData.title}`}
                        className="w-full aspect-video object-cover sm:rounded-2xl shadow"
                        loading="lazy"
                    />
                </picture>
                <div className="px-3 mt-2 space-y-4">
                    <h1 className="text-2xl font-semibold">{loaderData.title}</h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            title="Watch"
                            onClick={() => toast.info("Coming soon! We're still cooking this feature!")}
                            size={"lg"}
                        >
                            <Play />
                            <span>Watch</span>
                        </Button>

                        <Button
                            variant="secondary"
                            title="Trailer"
                            onClick={() => toast.info("Trailer is on the way! Stay tuned!")}
                            size={"lg"}
                        >
                            <Youtube />
                            <span>Trailer</span>
                        </Button>

                        <Button
                            variant="ghost"
                            title="Add to watch list"
                            className="ml-auto"
                            onClick={() =>
                                toast.info("Oops! Watchlist is under development, but we’ll have it ready soon!")
                            }
                            size={"icon-sm"}
                        >
                            <Bookmark />
                            <span className="sr-only">Add to watch list</span>
                        </Button>

                        <Button
                            variant="ghost"
                            title="Share"
                            onClick={() =>
                                sharePage({
                                    title: loaderData.title,
                                    text: `Watch "${loaderData.title}" (${loaderData.release_date?.slice(0, 4)}) on OnyxStream!`,
                                    url: window.location.href,
                                })
                            }
                            size={"icon-sm"}
                        >
                            <Share2 />
                            <span className="sr-only">Share</span>
                        </Button>
                    </div>
                </div>
            </section>
            <section className="px-4 pb-4 sm:px-0 flex-1 space-y-2">
                <div>
                    <p className="text-lg font-bold">Overview</p>
                </div>
                <div className="space-y-4 p-4 border rounded-2xl shadow">
                    <div>
                        <div className="italic text-xl">&quot;{loaderData.tagline}&quot;</div>
                        <div className="text-muted-foreground text-sm">{loaderData.overview}</div>
                    </div>

                    <MetaRow
                        icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
                        label="Released"
                        value={formatDate(loaderData.release_date)}
                    />

                    <MetaRow
                        icon={<Clock className="w-4 h-4 text-muted-foreground" />}
                        label="Runtime"
                        value={formatRuntime(Number(loaderData.runtime))}
                    />

                    <MetaRow
                        icon={<Tag className="w-4 h-4 text-muted-foreground" />}
                        label="Genre"
                        value={loaderData.genres.map((g) => g.name).join(", ")}
                    />

                    <MetaRow
                        icon={<Globe className="w-4 h-4 text-muted-foreground" />}
                        label="Spoken Languages"
                        value={loaderData.spoken_languages.map((l) => l.name).join(", ")}
                    />

                    <MetaRow
                        icon={<Flag className="w-4 h-4 text-muted-foreground" />}
                        label="Production Countries"
                        value={loaderData.production_countries.map((c) => c.name).join(", ")}
                    />

                    <MetaRow
                        icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
                        label="Production Companies"
                        value={loaderData.production_companies.map((c) => c.name).join(", ")}
                    />
                </div>
            </section>
        </main>
    )
}
