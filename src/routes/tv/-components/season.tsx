import { useQuery } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import type { Season, TvSeasonDetails } from "@/types/tmdb.types"
import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { cn, formatRuntime } from "@/lib/utils"

type SeasonProps = {
    media_type: "tv" | "movie"
    mediaId: number
    seasons: Array<Season>
}
function Episodes({
    episodes,
    selectedEpisode,
    onEpisodeSelect,
}: {
    episodes: TvSeasonDetails["episodes"]
    selectedEpisode: number | undefined
    onEpisodeSelect: (ep: number) => void
}) {
    return (
        <div className="overflow-auto max-h-116 flex flex-col divide-y">
            {episodes?.map((ep) => (
                <div
                    key={ep.id}
                    className={cn(
                        "p-2 flex gap-2 ",
                        selectedEpisode === ep.episode_number
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/80 active:bg-muted",
                    )}
                    onClick={() => onEpisodeSelect(ep.episode_number)}
                >
                    <img
                        src={getTMDBImageUrl(ep.still_path, "w154") || undefined}
                        alt="still_path"
                        className="basis-38 object-cover aspect-video rounded-md"
                    />

                    <div className="flex-1 w-full space-y-1">
                        <div className="flex justify-between">
                            <div className="text-sm font-medium line-clamp-1">{ep.name}</div>
                            <div className="text-sm font-bold shrink-0">{formatRuntime(Number(ep.runtime))}</div>
                        </div>
                        <p className="text-xs line-clamp-3">{ep.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function SeasonTab({ mediaId, seasons }: SeasonProps) {
    const queryParams = useSearch({ from: "/tv/$id" })
    const navigate = useNavigate({ from: "/tv/$id" })
    const selectedSeason = queryParams.season || 1
    const selectedEpisode = queryParams.episode

    const { data } = useQuery({
        queryKey: ["season", selectedSeason],
        queryFn: () => tmdb.getTVSeason(mediaId, selectedSeason),
    })
    const onSeasonSelect = (season: number) => {
        navigate({
            search: (prev) => ({
                ...prev,
                episode: 1,
                season,
            }),
        })
    }
    const handlSelect = (episode: number) => {
        navigate({
            search: (prev) => ({
                ...prev,
                season: selectedSeason,
                episode,
                play: true,
            }),
        })
    }

    return (
        <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
            <div className="space-y-2 xl:space-y-4">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">Episodes</div>
                    <select
                        className="bg-muted rounded-md"
                        value={selectedSeason}
                        onChange={(e) => onSeasonSelect(Number(e.target.value))}
                    >
                        {seasons.map((season, idx) => (
                            <option key={idx + 1} value={idx + 1}>
                                {season.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="font-semibold mb-2">
                        Season:{" "}
                        <em className="truncate font-normal text-muted-foreground">{data?.name || selectedEpisode}</em>
                    </div>
                    {data?.episodes && (
                        <Episodes
                            episodes={data?.episodes}
                            selectedEpisode={selectedEpisode}
                            onEpisodeSelect={handlSelect}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
