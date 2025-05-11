"use client";
import { cn } from "@/lib/utils";
import { CarouselContent, CarouselItem, CarouselThumbContent, CarouselThumbItem, ThumbCarousel } from "./ThumbCarousel";
import axios from "axios";
import TMDBImage from "@/components/TMDB/Image";
import { useTrending } from "@/hooks/useTMDB";

type HeroSectionPropsType = {
    className?: string;
};
export default function HeroSection({ className }: HeroSectionPropsType) {
    const { data, isLoading } = useTrending("movie", "day", 1, { keepPreviousData: true });
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const mediaArray = data?.results;
    return (
        <ThumbCarousel className={cn("w-full max-w-7xl mx-auto space-y-4", className)}>
            <CarouselContent>
                {mediaArray?.map((media: any) => (
                    <CarouselItem key={media.id}>
                        <div className="grid sm:grid-cols-2 h-96">
                            <div></div>
                            <TMDBImage
                                path={media.backdrop_path}
                                alt={media.title}
                                size="w1280"
                                type="backdrop"
                                className="rounded border border-primary w-full"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselThumbContent>
                {mediaArray?.map((media: any, i: number) => (
                    <CarouselThumbItem key={media.id} index={i}>
                        <TMDBImage
                            path={media.poster_path}
                            alt={media.title}
                            size={"w185"}
                            type="poster"
                            className="rounded border border-primary"
                        />
                    </CarouselThumbItem>
                ))}
            </CarouselThumbContent>
        </ThumbCarousel>
    );
}
