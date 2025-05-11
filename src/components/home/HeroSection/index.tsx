import { cn } from "@/lib/utils";
import { CarouselContent, CarouselItem, CarouselThumbContent, CarouselThumbItem, ThumbCarousel } from "./ThumbCarousel";
import axios from "axios";
import TMDBImage from "@/components/TMDB/Image";

type HeroSectionPropsType = {
    className?: string;
};
export default async function HeroSection({ className }: HeroSectionPropsType) {
    const { data } = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
        params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
    });
    const mediaArray = data.results;
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
