import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { formatDate, formatRuntime, sharePage } from "@/lib/utils"
import { MovieDetails } from "@/types/tmdb.types"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { Calendar, Clock, Tag, Globe, Flag, Building2, Play, Youtube, Bookmark, Share2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/movies/$id")({
    ssr: false,
    pendingComponent: MovieDetailsSkeleton,
    errorComponent: ({ error }) => {
        return <div>Error:{error.message}</div>
    },
    loader: async ({ params, location }) => {
        const id = Number(params.id)
        const details = await tmdb.getMovieDetails(id)
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        if (!details.id) {
            throw notFound()
        }
        return { details, host: location.url.origin }
    },

    head: async ({ loaderData }) => {
        const details = loaderData?.details
        if (!details) return {}

        const title = `OnyxStream | ${details.title} (${details.release_date?.slice(0, 4)})`
        const description = details.overview || `Details and information about ${details.title}`

        const poster = getTMDBImageUrl(details.poster_path, "w780") || undefined

        const url = `${loaderData?.host}/movies/${details.id}`

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
    component: RouteComponent,
})

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
function MovieDetailsSkeleton() {
    return (
        <main className="flex flex-col gap-4 lg:flex-row px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
            {/* Left section */}
            <section className="flex-2 space-y-4">
                {/* Backdrop */}
                <Skeleton className="aspect-14/9 xl:aspect-video rounded-2xl" />

                {/* title */}
                <Skeleton className="h-6 w-1/3 rounded-lg" />

                {/* Buttons */}
                <div className="flex items-center gap-2 sm:gap-4">
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
    const [isPlaying, setIsPlaying] = useState(false)
    const loaderData: { details: MovieDetails; host: string } = Route.useLoaderData()
    const details = loaderData.details

    const onClickWatch = () => {
        // () => toast.info("Coming soon! We're still cooking this feature!")
        setIsPlaying(true)
    }
    return (
        <main className="max-w-384 mx-auto gap-4 grid lg:grid-cols-[2fr_1fr] sm:px-4 lg:px-6 sm:py-4 lg:py-6 mb-4">
            <section className="space-y-2">
                <div className="w-full sm:rounded-2xl relative">
                    {isPlaying ? (
                        <iframe
                            src={`https://vidsrc.to/embed/movie/${details.id}`}
                            className="w-full h-full aspect-video sm:rounded-2xl bg-muted-foreground/80"
                        />
                    ) : (
                        <div>
                            <picture>
                                <source
                                    media="(max-width: 640px)"
                                    srcSet={getTMDBImageUrl(details.backdrop_path, "w780") || ""}
                                />
                                <source
                                    media="(max-width: 1024px)"
                                    srcSet={getTMDBImageUrl(details.backdrop_path, "w1280") || ""}
                                />
                                <img
                                    src={getTMDBImageUrl(details.backdrop_path, "original") || ""}
                                    alt={`Backdrop of ${details.title}`}
                                    className="w-full h-full object-cover aspect-14/9 xl:aspect-video sm:rounded-2xl"
                                    loading="lazy"
                                />
                            </picture>
                            <div className="absolute bottom-0 left-0 right-0 w-full flex justify-start">
                                <div className="flex items-end relative">
                                    <div className="absolute bottom-[calc(100%-8.5px)] -left-2 border-b-9 border-l-9 border-background rounded-bl-[20px] h-10 w-10"></div>
                                    <div className="absolute -bottom-2 left-[calc(100%-8.5px)] border-b-9 border-l-9 border-background rounded-bl-[20px] h-10 w-10"></div>
                                    <div className="bg-background p-2 rounded-tl-none rounded-t-2xl">
                                        <img
                                            src={getTMDBImageUrl(details.poster_path, "w780") || undefined}
                                            alt={`poster_path of ${details.title}`}
                                            className="max-w-32 rounded-md"
                                        />
                                    </div>
                                    <div className="bg-background p-2 rounded-tl-none rounded-t-2xl">
                                        <Button title="Watch" onClick={onClickWatch} size={"lg"}>
                                            <Play />
                                            <span>Watch</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="px-3 mt-2 space-y-2">
                    <h1 className="text-2xl font-semibold">{details.title}</h1>
                    <div className="flex items-center gap-2 sm:gap-4">
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
                                    title: details.title,
                                    text: `Watch "${details.title}" (${details.release_date?.slice(0, 4)}) on OnyxStream!`,
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
            <section className="px-4 sm:px-0 space-y-2 flex flex-col">
                <div>
                    <p className="text-lg font-bold">Overview</p>
                </div>
                <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
                    <div>
                        <div className="italic text-xl">&quot;{details.tagline}&quot;</div>
                        <div className="text-muted-foreground text-sm">{details.overview}</div>
                    </div>

                    <MetaRow
                        icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
                        label="Released"
                        value={formatDate(details.release_date)}
                    />

                    <MetaRow
                        icon={<Clock className="w-4 h-4 text-muted-foreground" />}
                        label="Runtime"
                        value={formatRuntime(Number(details.runtime))}
                    />

                    <MetaRow
                        icon={<Tag className="w-4 h-4 text-muted-foreground" />}
                        label="Genre"
                        value={details.genres.map((g) => g.name).join(", ")}
                    />

                    <MetaRow
                        icon={<Globe className="w-4 h-4 text-muted-foreground" />}
                        label="Spoken Languages"
                        value={details.spoken_languages.map((l) => l.name).join(", ")}
                    />

                    <MetaRow
                        icon={<Flag className="w-4 h-4 text-muted-foreground" />}
                        label="Production Countries"
                        value={details.production_countries.map((c) => c.name).join(", ")}
                    />

                    <MetaRow
                        icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
                        label="Production Companies"
                        value={details.production_companies.map((c) => c.name).join(", ")}
                    />
                </div>
            </section>
            <section className="xl:col-span-2 px-4 sm:px-0 space-y-2 flex flex-col">
                <div>
                    <p className="text-lg font-bold">Comments</p>
                </div>
                <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
                    <Skeleton className="h-4 rounded max-w-xs" />
                    <Skeleton className="h-4 rounded" />
                </div>
            </section>
        </main>
    )
}
