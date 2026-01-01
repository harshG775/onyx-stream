import Autoplay from "embla-carousel-autoplay"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, Bookmark, Info, PlayIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { Carousel, CarouselContent, CarouselItem, useCarouselDots } from "@/components/ui/carousel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { genreArray } from "@/lib/services/tmdb/genres"

const useIsReleased = () => {
    const today = new Date()
    return {
        isReleased: (release_date: string) => {
            const releaseDate = new Date(release_date)
            return today >= releaseDate
        },
    }
}

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(date).toLocaleDateString("en-US", options)
}

function CarouselDots({ className }: { className?: string }) {
    const { scrollSnaps, selectedIndex, scrollTo } = useCarouselDots()

    if (!scrollSnaps.length) return null

    return (
        <div data-slot="carousel-dots" className={cn("flex gap-1 sm:gap-2 justify-center items-center", className)}>
            {/* {scrollSnaps.length} */}
            {scrollSnaps.map((_, index) => (
                <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === selectedIndex}
                    onClick={() => scrollTo(index)}
                    className={cn(
                        "h-2.5 w-2.5 rounded-full transition-all duration-700",
                        index === selectedIndex ? "bg-primary scale-150" : "bg-muted-foreground/40 hover:bg-primary/80",
                    )}
                />
            ))}
        </div>
    )
}

export function HomeHeroSection() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["trending", "multi"],
        queryFn: () => tmdb.getTrendingAll("day", 1),
    })

    const { isReleased } = useIsReleased()
    if (isLoading) {
        return (
            <section className="p-2 space-y-4">
                <div className="min-w-0 shrink-0 grow-0 basis-full">
                    <div className="relative grid lg:grid-cols-2 lg:items-center overflow-hidden">
                        {/* LEFT: CONTENT */}
                        <div className="lg:order-1 order-2 p-4 space-y-4">
                            {/* Metadata */}
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-16 rounded" />
                                <Skeleton className="h-4 w-24 rounded" />
                                <Skeleton className="h-4 w-12 rounded" />
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                                ))}
                            </div>

                            {/* Title */}
                            <Skeleton className="h-9 w-[80%] rounded-md" />

                            {/* Overview */}
                            <div className="space-y-2 max-w-lg">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-[90%] rounded" />
                                <Skeleton className="h-4 w-[75%] rounded" />
                            </div>

                            {/* CTA */}
                            <Skeleton className="h-10 w-36 rounded-md mt-2" />
                        </div>

                        {/* RIGHT: IMAGE */}
                        <div className="lg:order-2 order-1 p-4">
                            <Skeleton className="aspect-video w-full rounded-3xl" />
                        </div>
                    </div>
                </div>
                <div aria-hidden className={"flex justify-center items-center gap-1.5 sm:gap-2"}>
                    {/* inactive */}
                    <Skeleton className="h-2.5 w-2.5 rounded opacity-60" />

                    {/* active (center) */}
                    <Skeleton className="h-3 w-3 rounded" />

                    {/* inactive */}
                    <Skeleton className="h-2.5 w-2.5 rounded opacity-60" />
                </div>
            </section>
        )
    }
    if (isError) {
        return (
            <section className="w-full min-h-96 p-4 text-destructive bg-destructive/10 relative grid lg:grid-cols-2 lg:items-center overflow-hidden">
                <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
            </section>
        )
    }
    return (
        <section>
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 8000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: false,
                    }),
                ]}
            >
                <CarouselContent className="p-2">
                    {data?.results.map((media, idx) => {
                        //  const canWatch =
                        //      media?.status === "Released" ||
                        //      media?.status === "Returning Series" ||
                        //      media?.status === "Ended" ||
                        //      media?.status === "Canceled"

                        return (
                            <CarouselItem key={idx}>
                                <div className="relative grid lg:grid-cols-2 lg:items-center overflow-hidden">
                                    <div className="lg:order-1 order-2 p-4 space-y-4">
                                        {/* Metadata Row */}
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            <span className="capitalize">{media.media_type}</span>
                                            {media.media_type === "movie" ? (
                                                <span
                                                    className={`font-semibold ${
                                                        isReleased(media.release_date)
                                                            ? "text-green-800"
                                                            : "text-destructive"
                                                    }`}
                                                >
                                                    {formatDate(media.release_date)}
                                                </span>
                                            ) : (
                                                <span
                                                    className={`font-semibold ${
                                                        isReleased(media.first_air_date)
                                                            ? "text-green-800"
                                                            : "text-destructive"
                                                    }`}
                                                >
                                                    {formatDate(media.first_air_date)} {media.status}
                                                </span>
                                            )}
                                            <span>{media.vote_average.toFixed(1)}/10</span>
                                        </div>

                                        {/* Genres */}
                                        <div className="flex flex-wrap gap-2">
                                            {media.genre_ids.map((genre: number, i: number) => (
                                                <span
                                                    key={`genre-${i}-${genre}`}
                                                    className="text-xs bg-muted border border-border rounded-full px-3 py-1"
                                                >
                                                    {genreArray?.[media.media_type as "movie" | "tv"]?.[genre]}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight line-clamp-1">
                                            {media.title}
                                        </h1>

                                        {/* Overview */}
                                        <p className="text-sm text-muted-foreground line-clamp-3">{media.overview}</p>

                                        {/* CTA Button */}
                                        <div className="mt-2 flex gap-2">
                                            <Button asChild>
                                                <Link
                                                    to={`/${media.media_type === "movie" ? "movies" : "tv"}/$id`}
                                                    params={{ id: media.id.toString() }}
                                                >
                                                    {isReleased(media.release_date) ? (
                                                        <>
                                                            <PlayIcon className="h-4 w-4" />
                                                            Watch
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Info className="h-4 w-4" />
                                                            Info
                                                        </>
                                                    )}
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" title="Add to list">
                                                <Bookmark />
                                                <span>Add to list</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <img
                                        src={getTMDBImageUrl(media.backdrop_path, "w1280") || ""}
                                        alt={media.title}
                                        className="rounded-3xl lg:order-2 order-1"
                                    />
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                {/*  */}
                <CarouselDots className="absolute -bottom-3 left-0 w-full" />
            </Carousel>
        </section>
    )
}
