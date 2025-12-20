import Autoplay from "embla-carousel-autoplay"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { useQuery } from "@tanstack/react-query"
import { Carousel, CarouselContent, CarouselItem, useCarouselDots } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Info, PlayIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
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
                        "rounded transition",
                        index === selectedIndex
                            ? "bg-primary h-3 w-3 "
                            : "bg-muted-foreground/40 hover:bg-primary/80 h-2.5 w-2.5",
                    )}
                />
            ))}
        </div>
    )
}

export function RootHeroSection() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["trending", "movies"],
        queryFn: () => tmdb.getTrendingAll("day", 1),
    })

    const { isReleased } = useIsReleased()

    return (
        <section>
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: false,
                    }),
                ]}
                className="space-y-4"
            >
                <CarouselContent className="p-2">
                    {isError && (
                        <section className="w-full min-h-96 grid place-items-center text-destructive bg-destructive/10 text-2xl">
                            <div>{error.message}</div>
                        </section>
                    )}
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="relative grid lg:grid-cols-2 lg:items-center px-4 overflow-hidden">
                                    <div className="lg:order-1 order-2 p-4 space-y-4">
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            <Skeleton className="h-4 w-16 rounded" />
                                            <Skeleton className="h-4 w-10 rounded" />
                                            <Skeleton className="h-4 w-12 rounded" />
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} className="h-6 w-16 rounded-full" />
                                            ))}
                                        </div>

                                        <Skeleton className="h-8 w-64 rounded" />

                                        <Skeleton className="h-12 w-full max-w-lg rounded" />

                                        <Skeleton className="h-10 w-32 rounded" />
                                    </div>

                                    <Skeleton className="aspect-video w-full h-full rounded-3xl lg:order-2 order-1" />
                                </div>
                            </CarouselItem>
                        ))}
                    {!isLoading && !isError && (
                        <>
                            {data?.results.map((media, idx) => {
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
                                                                    ? "text-green-600"
                                                                    : "text-destructive"
                                                            }`}
                                                        >
                                                            {formatDate(media.release_date)}
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`font-semibold ${
                                                                isReleased(media.release_date)
                                                                    ? "text-green-600"
                                                                    : "text-destructive"
                                                            }`}
                                                        >
                                                            {formatDate(media.last_air_date)}
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
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {media.overview}
                                                </p>

                                                {/* CTA Button */}
                                                <Button asChild className="mt-2">
                                                    <Link
                                                        to={`/${media.media_type === "movie" ? "movies" : "tv-shows"}/$id`}
                                                        params={{ id: media.id }}
                                                    >
                                                        {isReleased(media.release_date) ? (
                                                            <>
                                                                <PlayIcon className="h-4 w-4" />
                                                                Watch Now
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Info className="h-4 w-4" />
                                                                Info
                                                            </>
                                                        )}
                                                    </Link>
                                                </Button>
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
                        </>
                    )}
                </CarouselContent>
                <CarouselDots />
            </Carousel>
        </section>
    )
}
