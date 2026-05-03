import { useState } from "react"
import { LayoutGrid, List, Play } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import type { TvShowDetails } from "tmdb-ts"

export const TvControls = ({
    tvShowDetails,
    season,
    episode,
}: {
    tvShowDetails: TvShowDetails
    season: number
    episode: number
}) => {
    const navigate = useNavigate({
        from: "/$media_type/$id/watch/",
    })
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // We track which season the user is CURRENTLY BROWSING in the UI
    // (This might be different from the one they are watching)
    const [browsingSeason, setBrowsingSeason] = useState(season)

    const handleNavigation = (s: number, e: number) => {
        navigate({
            search: (prev) => ({ ...prev, season: s, episode: e }),
            replace: true,
        })
    }

    const currentSeasonData =
        tvShowDetails.seasons.find((s) => s.season_number === browsingSeason) || tvShowDetails.seasons[0]

    return (
        <div className="flex flex-col h-full max-h-[80vh] w-full border rounded-lg xl:rounded-xl bg-background/50 backdrop-blur-sm overflow-hidden">
            {/* Header: Season Selector */}
            <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg uppercase">Episodes</h2>
                    <div className="flex bg-muted rounded-md p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded ${viewMode === "grid" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded ${viewMode === "list" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scroll-thin">
                    {tvShowDetails.seasons.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setBrowsingSeason(s.season_number)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                browsingSeason === s.season_number
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                            }`}
                        >
                            Season {s.season_number}
                        </button>
                    ))}
                </div>
            </div>

            {/* Episode List/Grid Area */}
            <div className="flex-1 overflow-y-auto p-4 scroll-thin">
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: currentSeasonData.episode_count }).map((_, i) => {
                            const epNum = i + 1
                            const isActive = season === browsingSeason && episode === epNum
                            return (
                                <button
                                    key={epNum}
                                    onClick={() => handleNavigation(browsingSeason, epNum)}
                                    className={`aspect-square flex items-center justify-center rounded-md border-2 transition-all ${
                                        isActive
                                            ? "border-primary bg-primary/10 text-primary font-bold"
                                            : "border-transparent bg-muted hover:border-muted-foreground/30"
                                    }`}
                                >
                                    {epNum}
                                </button>
                            )
                        })}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {Array.from({ length: currentSeasonData.episode_count }).map((_, i) => {
                            const epNum = i + 1
                            const isActive = season === browsingSeason && episode === epNum
                            return (
                                <button
                                    key={epNum}
                                    onClick={() => handleNavigation(browsingSeason, epNum)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${
                                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                                    }`}
                                >
                                    <div className="relative w-10 h-10 shrink-0 flex items-center justify-center bg-muted rounded-sm border">
                                        {isActive ? (
                                            <Play size={14} fill="currentColor" />
                                        ) : (
                                            <span className="text-xs">{epNum}</span>
                                        )}
                                    </div>
                                    <div className="text-left overflow-hidden">
                                        <p className="text-sm font-medium truncate">Episode {epNum}</p>
                                        {isActive && (
                                            <p className="text-[10px] uppercase tracking-wider font-bold">
                                                Now Watching
                                            </p>
                                        )}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            <div className="p-3 border-t bg-muted/30 flex justify-between text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                <span>{currentSeasonData.episode_count} Episodes</span>
                <span>
                    S{season} : E{episode}
                </span>
            </div>
        </div>
    )
}
