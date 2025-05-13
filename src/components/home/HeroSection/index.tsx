"use client";
import { cn } from "@/lib/utils";
import {
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbContent,
    CarouselThumbItem,
    ThumbCarousel,
} from "./ThumbCarousel";
import { Skeleton } from "@/components/ui/skeleton"; // ensure Skeleton is imported

import TMDBImage from "@/components/TMDB/Image";
import { useTrending } from "@/hooks/useTMDB";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlayIcon } from "lucide-react";

type HeroSectionPropsType = {
    className?: string;
};
export default function HeroSection({ className }: HeroSectionPropsType) {
    const movieGenreMap = Object.fromEntries(genres.movie.map((g) => [g.id, g.name]));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, isLoading ,error} = useTrending<any>("movie", "day", 1, { keepPreviousData: true });
    const mediaArray = data?.results;
    return (
        <ThumbCarousel className={cn("w-full max-w-[96rem] mx-auto space-y-4", className)}>
            <CarouselContent>
                {error && (
                    <div className="w-full min-h-96 grid place-items-center text-destructive bg-destructive/10 text-2xl">
                        {error.message}
                    </div>
                )}
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
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
                      ))
                    : mediaArray?.map((media) => (
                          <CarouselItem key={media.id}>
                              <div className=" relative grid lg:grid-cols-2 lg:items-center px-4 overflow-hidden">
                                  <div className="lg:order-1 order-2 p-4 space-y-4">
                                      {/* Metadata Row */}
                                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                          <span className="capitalize">{media.media_type}</span>
                                          <span>{new Date(media.release_date).getFullYear()}</span>
                                          <span>{media.vote_average.toFixed(1)}/10</span>
                                      </div>

                                      {/* Genres */}
                                      <div className="flex flex-wrap gap-2">
                                          {media.genre_ids.map((genre: number, i: number) => (
                                              <span
                                                  key={`genre-${i}-${genre}`}
                                                  className="text-xs bg-muted border border-border rounded-full px-3 py-1"
                                              >
                                                  {movieGenreMap[genre]}
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
                                      <Button asChild className="mt-2">
                                          <Link href={`/movies/${media.id}`}>
                                              <PlayIcon className="h-4 w-4" />
                                              Watch Now
                                          </Link>
                                      </Button>
                                  </div>

                                  <TMDBImage
                                      path={media.backdrop_path}
                                      alt={media.title}
                                      size="w1280"
                                      type="backdrop"
                                      className="rounded-3xl lg:order-2 order-1"
                                  />
                              </div>
                          </CarouselItem>
                      ))}
            </CarouselContent>
            <div className="flex justify-end p-4 pr-20">
                <div className="relative">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </div>

            <CarouselThumbContent>
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <CarouselThumbItem key={i} index={i}>
                              <div>
                                  <Skeleton className="aspect-[2/3] w-[92px] rounded-xl" />
                                  <Skeleton className="h-4 w-[80px] mt-2" />
                              </div>
                          </CarouselThumbItem>
                      ))
                    : mediaArray?.map((media, i: number) => (
                          <CarouselThumbItem key={media.id} index={i}>
                              <div className="">
                                  <TMDBImage
                                      path={media.poster_path}
                                      alt={media.title}
                                      size={"w185"}
                                      type="poster"
                                      className="aspact-[2/3] object-cover rounded-xl"
                                  />
                                  <div className="text-sm mt-2 text-muted-foreground font-semibold">{media.title}</div>
                              </div>
                          </CarouselThumbItem>
                      ))}
            </CarouselThumbContent>
        </ThumbCarousel>
    );
}
const genres: { tv: { id: number; name: string }[]; movie: { id: number; name: string }[] } = {
    tv: [
        { id: 10759, name: "Action & Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 10762, name: "Kids" },
        { id: 9648, name: "Mystery" },
        { id: 10763, name: "News" },
        { id: 10764, name: "Reality" },
        { id: 10765, name: "Sci-Fi & Fantasy" },
        { id: 10766, name: "Soap" },
        { id: 10767, name: "Talk" },
        { id: 10768, name: "War & Politics" },
        { id: 37, name: "Western" },
    ],
    movie: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
    ],
};
