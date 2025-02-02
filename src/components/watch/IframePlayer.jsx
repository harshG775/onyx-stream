import { constants } from "@/config";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
const { IMAGE_SIZES } = constants.TMDB;

export function IframePlayerMovie({ id, mediaType }) {
    const sources = constants.mediaSources;
    const [currentSource, setCurrentSource] = useState(() => sources[0]);
    const finalUrl = currentSource?.url
        ?.replace("${mediaType}", mediaType)
        .replace("${id}", id)
        //removing tv params and path
        .replace("/${season}", "")
        .replace("&s=${season}", "")
        .replace("&season=${season}", "")
        .replace("/${episode}", "")
        .replace("&e=${episode}", "")
        .replace("&episode=${episode}", "");

    return (
        <>
            <iframe
                key={finalUrl}
                src={finalUrl}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full aspect-video z-10 bg-background/0 rounded-lg"
            />
            <div className="pt-6 pb-4">
                <div className="flex sm:inline-flex flex-col sm:flex-row gap-0 overflow-hidden">
                    {sources?.map((source, i) => (
                        <button
                            // variant={currentSource.name === source.name ? "default" : "outline"}
                            className={`${
                                currentSource.name === source.name ? "bg-primary" : "bg-accent"
                            }  hover:opacity-80 px-4 py-1 font-bold text-xs rounded-none `}
                            key={i}
                            title={source.name}
                            onClick={() => setCurrentSource(source)}
                        >
                            <div className="line-clamp-1">
                                source-{i + 1} {source.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
export function IframePlayerTV({ id, mediaType, number_of_seasons, seasons }) {
    const sources = constants.mediaSources;
    const [currentSeason, setCurrentSeason] = useState(1);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [currentSource, setCurrentSource] = useState(() => sources[0]);
    const finalUrl = currentSource?.url
        ?.replace("${mediaType}", mediaType)
        ?.replace("${id}", id)
        ?.replace("${season}", currentSeason?.season_number || 1)
        ?.replace("${episode}", currentEpisode || 1);

    useEffect(() => {
        setCurrentSeason(seasons?.[0] || 1);
    }, [seasons]);
    return (
        <>
            <iframe
                key={finalUrl}
                src={finalUrl}
                referrerPolicy="origin"
                allowFullScreen
                className="w-full h-full aspect-video z-10 bg-background/0 rounded-lg"
            />

            <div className="pt-6 pb-4">
                <div className="flex sm:inline-flex flex-col sm:flex-row gap-0 overflow-hidden">
                    {sources?.map((source, i) => (
                        <button
                            // variant={currentSource.name === source.name ? "default" : "outline"}
                            className={`${
                                currentSource.name === source.name ? "bg-primary" : "bg-accent"
                            }  hover:opacity-80 px-4 py-1 font-bold text-xs rounded-none `}
                            key={i}
                            title={source.name}
                            onClick={() => setCurrentSource(source)}
                        >
                            <div className="line-clamp-1">
                                source-{i + 1} {source.name}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <div>Season: {currentSeason?.name}</div>
                    <div>Episode: {currentEpisode}</div>
                </div>
                <div>
                    <div className="p-4 grid grid-cols-2">
                        <ScrollArea className={"h-96"}>
                            <div className="flex flex-col gap-2">
                                <div className="sticky top-0 bg-background">seasons: {number_of_seasons}</div>

                                {seasons?.map((season, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setCurrentSeason(season);
                                            setCurrentEpisode(1);
                                        }}
                                        className={`${
                                            season.season_number === currentSeason.season_number
                                                ? "bg-primary"
                                                : "bg-secondary/50"
                                        }
                                    grid grid-cols-2`}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.BACKDROP_SIZES.W300}${season.poster_path}`}
                                            alt={season?.name}
                                            className="w-24 h-32 object-cover"
                                        />
                                        <div>
                                            {season?.season_number}-{season?.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <ScrollArea className="h-96">
                            <div className="sticky top-0 bg-background">episodes {currentSeason?.episode_count}</div>
                            <div className="p-2">
                                {Array?.from({ length: currentSeason?.episode_count || 0 })?.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setCurrentEpisode(i + 1);
                                        }}
                                        className={`${i + 1 === currentEpisode ? "bg-primary" : "bg-secondary/50"}
                                    grid grid-cols-2`}
                                    >
                                        episode-{i + 1}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function IframePlayer({ id, mediaType, number_of_seasons, number_of_episodes, seasons }) {
    if (mediaType === "movie") {
        return <IframePlayerMovie id={id} mediaType={mediaType} />;
    }
    if (mediaType === "tv") {
        const filteredSeasons = seasons.filter((season) => season?.name !== "Specials");
        return (
            <IframePlayerTV
                id={id}
                mediaType={mediaType}
                number_of_seasons={number_of_seasons}
                number_of_episodes={number_of_episodes}
                seasons={filteredSeasons}
            />
        );
    }
}
