import { Button } from "@/components/ui/button"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { formatDate, formatRuntime, sharePage } from "@/lib/utils"
import { MovieDetails } from "@/types/tmdb.types"
import { createFileRoute } from "@tanstack/react-router"
import { Calendar, Clock, Tag, Globe, Flag, Building2, Play, Youtube, Bookmark, Share2 } from "lucide-react"
import { Suspense } from "react"

export const Route = createFileRoute("/movies/$id")({
    loader: async ({ params, location }) => {
        const details = await tmdb.getMovieDetails(Number(params.id))
        return { ...details, host: location.url.host }
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
    component: RouteComponent,
})

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
        <Suspense fallback={"Loading..."}>
            <main className="flex flex-col gap-4 xl:flex-row px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
                <section className="flex-2 space-y-2">
                    <picture className="w-full object-cover order rounded-2xl shadow">
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
                            className="w-full object-cover rounded-2xl shadow"
                            loading="lazy"
                        />
                    </picture>
                    <div className="mt-2 space-y-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Button
                                title="Watch"
                                onClick={() => alert("Coming soon! We're still cooking this feature!")}
                                size={"lg"}
                            >
                                <Play />
                                <span>Watch</span>
                            </Button>

                            <Button
                                variant="secondary"
                                title="Trailer"
                                onClick={() => alert("Trailer is on the way! Stay tuned!")}
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
                                    alert("Oops! Watchlist is under development, but we’ll have it ready soon!")
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
                        <h1 className="text-2xl font-semibold">{loaderData.title}</h1>
                    </div>
                </section>
                <section className="flex-1 space-y-2">
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
        </Suspense>
    )
}
