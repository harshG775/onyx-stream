import { Skeleton } from "@/components/ui/skeleton"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { TVShowDetails } from "@/types/tmdb.types"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { sharePage } from "@/lib/utils"
import CommentsSection from "@/components/details/comments/comments-section"
import { useState } from "react"
import { DetailsHero } from "@/components/details/details-hero"
import { DetailsHeader } from "@/components/details/details-header"
import { OverviewTab } from "@/components/details/details-tabs/overview-tab"
import { formatDate, formatRuntime } from "@/lib/utils"
import { Building2, Calendar, Flag, Globe, Tag, Tv } from "lucide-react"
import { CreditsTab } from "@/components/details/details-tabs/credits-tab"

export const Route = createFileRoute("/tv/$id")({
    ssr: false,
    pendingComponent: DetailsSkeleton,
    errorComponent: ({ error }) => {
        return <div>Error:{error.message}</div>
    },
    loader: async ({ params, location }) => {
        const id = Number(params.id)
        const details = await tmdb.getTVDetails(id)
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        if (!details.id) {
            throw notFound()
        }
        return { details, host: location.url.origin }
    },

    head: async ({ loaderData }) => {
        const details = loaderData?.details
        if (!details) return {}

        const title = `OnyxStream | ${details.name} (${details.last_air_date?.slice(0, 4)})`
        const description = details.overview || `Details and information about ${details.name}`

        const poster = getTMDBImageUrl(details.poster_path, "w780") || undefined

        const url = `${loaderData?.host}/tv/${details.id}`

        return {
            meta: [
                // SEO
                { title: title },
                { name: "description", content: description },

                // Open Graph
                { property: "og:type", content: "video.tv" },
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
export function MetaRowSkeleton() {
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
export function DetailsSkeleton() {
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
function RouteComponent() {
    const [isPlaying, setIsPlaying] = useState(false)
    const loaderData: { details: TVShowDetails; host: string } = Route.useLoaderData()
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
                                altLabel: details.name,
                                backdrop_path: details.backdrop_path,
                                poster_path: details.poster_path,
                            }}
                            onClickWatch={() => {
                                // () => toast.info("Coming soon! We're still cooking this feature!")
                                setIsPlaying(true)
                            }}
                        />
                    )}
                    <DetailsHeader
                        title={details.name}
                        onTrailer={() => toast.info("Trailer is on the way! Stay tuned!")}
                        onAddToWatchList={() =>
                            toast.info("Oops! Watchlist is under development, but we’ll have it ready soon!")
                        }
                        onShare={() =>
                            sharePage({
                                title: details.name,
                                text: `Watch "${details.name}" (${details.last_air_date?.slice(0, 4)}) on OnyxStream!`,
                                url: window.location.href,
                            })
                        }
                    />
                </div>
            </section>
            <Tabs defaultValue="overview" asChild>
                <section className="px-4 sm:px-0 space-y-2 flex flex-col">
                    <TabsList>
                        <TabsTrigger value="overview" className="text-lg font-bold">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="credits" className="text-lg font-bold">
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
                                    values: formatDate(details.first_air_date),
                                },
                                {
                                    icon: <Tv className="w-4 h-4 text-primary/80" />,
                                    label: "Info",
                                    values: [
                                        `Status: ${details.status}`,
                                        `Seasons: ${details.seasons.length}`,
                                        `Episodes: ${details.number_of_episodes}`,
                                        `Runtime: ${formatRuntime(Number(details.last_episode_to_air?.runtime))}`,
                                        `Aired: ${formatDate(details.first_air_date)} - ${
                                            details.last_air_date
                                                ? formatDate(details.last_air_date)
                                                : details.status === "Ended"
                                                  ? "Ended"
                                                  : "Present"
                                        }`,
                                    ],
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
                        <CreditsTab media_type="tv" mediaId={details.id} />
                    </TabsContent>
                </section>
            </Tabs>

            <section className="xl:col-span-2 px-4 sm:px-0 space-y-2 flex flex-col">
                <div>
                    <p className="text-lg font-bold">Comments</p>
                </div>
                <CommentsSection media_type="movie" mediaId={details.id} />
            </section>
        </main>
    )
}
