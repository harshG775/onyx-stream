import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { sharePage } from "@/lib/utils"
import { MovieDetails } from "@/types/tmdb.types"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { Youtube, Bookmark, Share2, PlayCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import CommentsSection from "../../components/details/comments/comments-section"
import { OverviewTab } from "./-components/sections/overview-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditsTab } from "./-components/sections/credits-tab"

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
function RouteComponent() {
    const [isPlaying, setIsPlaying] = useState(false)
    const loaderData: { details: MovieDetails; host: string } = Route.useLoaderData()
    const details = loaderData.details

    const onClickWatch = () => {
        // () => toast.info("Coming soon! We're still cooking this feature!")
        setIsPlaying(true)
    }
    return (
        <main className="max-w-384 mx-auto gap-4 grid lg:grid-cols-[2fr_1fr] px-3 sm:px-4 py-3 sm:py-4 mb-4">
            <section className="space-y-2">
                <div className="w-full relative overflow-hidden">
                    {isPlaying ? (
                        <iframe
                            src={`https://vidsrc.to/embed/movie/${details.id}`}
                            className="w-full h-full aspect-video rounded-2xl bg-muted-foreground/80"
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
                                    className="w-full h-full object-cover min-h-96 xl:aspect-video rounded-2xl"
                                    loading="lazy"
                                />
                            </picture>
                            <div className="absolute bottom-0 left-0 right-0 w-full flex justify-start">
                                <div className="z-10 flex items-end relative">
                                    <div className="-z-10 absolute bottom-[calc(100%-16px)] -left-[16px] border-b-16 border-l-16 border-background rounded-bl-4xl size-12"></div>
                                    <div className="-z-10 absolute -bottom-[16px] left-[calc(100%-16px)] border-b-16 border-l-16 border-background rounded-bl-4xl size-12"></div>
                                    <div className="bg-background pl-0 p-3 rounded-tl-none rounded-t-2xl">
                                        <img
                                            src={getTMDBImageUrl(details.poster_path, "w780") || undefined}
                                            alt={`poster_path of ${details.title}`}
                                            className="max-w-32 rounded-md"
                                        />
                                    </div>
                                    <div className="relative bg-background pl-0 p-3 rounded-tl-none rounded-t-2xl">
                                        <div className="-z-10 absolute bottom-[calc(100%-16px)] -left-[16px] border-b-16 border-l-16 border-background rounded-bl-4xl size-12"></div>
                                        <Button size={"lg"} title="Watch" onClick={onClickWatch}>
                                            <PlayCircle />
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
                            size={"sm"}
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
                        <OverviewTab details={details} />
                    </TabsContent>
                    <TabsContent value="credits" asChild>
                        <CreditsTab media_type="movie" mediaId={details.id} />
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
