import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { formatRuntime } from "@/lib/utils"
import { Season, TvSeasonDetails } from "@/types/tmdb.types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
type SeasonProps = {
    media_type: "tv" | "movie"
    mediaId: number
    seasons: Season[]
}
function Episodes({
    episodes,
    onEpisodeSelect,
}: {
    episodes: TvSeasonDetails["episodes"]
    onEpisodeSelect: (ep: number) => void
}) {
    return (
        <div className="overflow-auto max-h-116 flex flex-col divide-y">
            {episodes &&
                episodes.map((ep) => (
                    <div
                        key={ep.id}
                        className="p-2 flex gap-2 hover:bg-muted/80 active:bg-muted"
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
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const [selectedSeason, setSelectedSeason] = useState(1)

    const { data } = useQuery({
        queryKey: ["season", selectedSeason],
        queryFn: () => tmdb.getTVSeason(mediaId, selectedSeason),
    })
    const onSeasonSelect = (season: number) => {
        setSelectedSeason(season)
        handlSelect(1)
    }
    const handlSelect = (episode: number) => {
        setSelectedEpisode(episode)
    }
    return (
        <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
            {selectedSeason}:{selectedEpisode}
            <div className="space-y-2 xl:space-y-4">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">Episodes</div>
                    <select
                        className="bg-muted rounded-md"
                        value={selectedSeason}
                        onChange={(e) => onSeasonSelect(Number(e.target.value))}
                    >
                        {seasons.map((season, idx) => (
                            <option value={idx + 1}>{season.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="font-semibold mb-2">
                        Season:{" "}
                        <em className="truncate font-normal text-muted-foreground">{data?.name || selectedEpisode}</em>
                    </div>
                    {data?.episodes && <Episodes episodes={data?.episodes} onEpisodeSelect={handlSelect} />}
                </div>
            </div>
        </div>
    )
}
