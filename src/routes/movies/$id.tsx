import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { formatDate, sharePage } from "@/lib/utils"
import { MovieDetails } from "@/types/tmdb.types"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import CommentsSection from "../../components/details/comments/comments-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetailsHero } from "@/components/details/details-hero"
import { DetailsHeader } from "@/components/details/details-header"
import { DetailsSkeleton } from "../tv/$id"
import { OverviewTab } from "@/components/details/details-tabs/overview-tab"
import { Building2, Calendar, Flag, Globe, Tag } from "lucide-react"
import { CreditsTab } from "@/components/details/details-tabs/credits-tab"

export const Route = createFileRoute("/movies/$id")({
    ssr: false,
    pendingComponent: DetailsSkeleton,
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

function RouteComponent() {
    const [isPlaying, setIsPlaying] = useState(false)
    const loaderData: { details: MovieDetails; host: string } = Route.useLoaderData()
    const details = loaderData.details
    return (
        <main className="max-w-384 mx-auto gap-4 grid lg:grid-cols-[2fr_1fr] px-3 sm:px-4 py-3 sm:py-4 mb-4">
            <section className="space-y-2">
                <div className="w-full">
                    {isPlaying ? (
                        <iframe
                            src={`https://vidsrc.to/embed/tv/${details.id}`}
                            className="w-full h-full aspect-video rounded-2xl bg-muted-foreground/80"
                        />
                    ) : (
                        <DetailsHero
                            details={{
                                altLabel: details.title,
                                backdrop_path: details.backdrop_path,
                                poster_path: details.poster_path,
                                status: details.status,
                            }}
                            onClickWatch={() => {
                                // () => toast.info("Coming soon! We're still cooking this feature!")
                                setIsPlaying(true)
                            }}
                        />
                    )}
                    <DetailsHeader
                        title={details.title}
                        onTrailer={() => toast.info("Trailer is on the way! Stay tuned!")}
                        onAddToWatchList={() =>
                            toast.info("Oops! Watchlist is under development, but we’ll have it ready soon!")
                        }
                        onShare={() =>
                            sharePage({
                                title: details.title,
                                text: `Watch "${details.title}" (${details.release_date?.slice(0, 4)}) on OnyxStream!`,
                                url: window.location.href,
                            })
                        }
                    />
                </div>
            </section>
            <Tabs defaultValue="overview" asChild>
                <section className="space-y-2 flex flex-col">
                    <TabsList>
                        <TabsTrigger value="overview" className="sm:text-lg font-bold">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="credits" className="sm:text-lg font-bold">
                            Credits
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" asChild>
                        <OverviewTab
                            tagline={details?.tagline || ""}
                            overview={details.overview}
                            MetaGroupList={[
                                {
                                    icon: <Calendar className="w-4 h-4 text-primary/80" />,
                                    label: "Release",
                                    values: formatDate(details.release_date),
                                },
                                {
                                    icon: <Tag className="w-4 h-4 text-primary/80" />,
                                    label: "Genre",
                                    values: details.genres.map((g) => g.name).join(", "),
                                },
                                {
                                    icon: <Globe className="w-4 h-4 text-primary/80" />,
                                    label: "Spoken Languages",
                                    values: details.spoken_languages.map((l) => l.name).join(", "),
                                },
                                {
                                    icon: <Flag className="w-4 h-4 text-primary/80" />,
                                    label: "Production Countries",
                                    values: details.production_countries.map((c) => c.name).join(", "),
                                },
                                {
                                    icon: <Building2 className="w-4 h-4 text-primary/80" />,
                                    label: "Production Companies",
                                    values: details.production_companies.map((c) => c.name).join(", "),
                                },
                            ]}
                        />
                    </TabsContent>
                    <TabsContent value="credits" asChild>
                        <CreditsTab media_type="movie" mediaId={details.id} />
                    </TabsContent>
                </section>
            </Tabs>

            <section className="xl:col-span-2 space-y-2 flex flex-col">
                <div>
                    <p className="text-lg font-bold">Comments</p>
                </div>
                <CommentsSection media_type="movie" mediaId={details.id} />
            </section>
        </main>
    )
}
