import { useState } from "react"
import { LayoutGrid, List, Play } from "lucide-react"
import { Route } from "#/routes/$media_type/$id/watch"

const sampleData = {
    adult: false,
    backdrop_path: "/auyEi4Xho43HFvVQnd42LzqBdiV.jpg",
    created_by: [
        {
            id: 2347147,
            credit_id: "6088c7ca2da8460057c88d59",
            name: "John Griffin",
            original_name: "John Griffin",
            gender: 2,
            profile_path: "/lAIA3ECbx2ZtMUiOyqTbWNvKTdO.jpg",
        },
    ],
    episode_run_time: [],
    first_air_date: "2022-02-20",
    genres: [
        {
            id: 9648,
            name: "Mystery",
        },
        {
            id: 18,
            name: "Drama",
        },
        {
            id: 10765,
            name: "Sci-Fi & Fantasy",
        },
    ],
    homepage: "https://www.mgmplus.com/series/from",
    id: 124364,
    in_production: true,
    languages: ["en"],
    last_air_date: "2026-04-26",
    last_episode_to_air: {
        id: 6883693,
        name: "Fray",
        overview:
            "A gruesome discovery sends shockwaves through the town as Jade and Tabitha struggle with the weight of their revelation.",
        vote_average: 4.6,
        vote_count: 10,
        air_date: "2026-04-26",
        episode_number: 2,
        episode_type: "standard",
        production_code: "",
        runtime: 54,
        season_number: 4,
        show_id: 124364,
        still_path: "/4LNl4W9ARO2a843SgE3XMj1uOn9.jpg",
    },
    name: "FROM",
    next_episode_to_air: {
        id: 6883694,
        name: "Merrily We Go",
        overview:
            "Boyd tries to save Acosta from herself as Julie digs deeper into her newfound abilities; Tabitha embarks on a desperate gamble and Victor joins Ethan in a quest for answers.",
        vote_average: 0.0,
        vote_count: 0,
        air_date: "2026-05-03",
        episode_number: 3,
        episode_type: "standard",
        production_code: "",
        runtime: null,
        season_number: 4,
        show_id: 124364,
        still_path: null,
    },
    networks: [
        {
            id: 922,
            logo_path: "/9aH86hGHVQfvhAqrDRv1EINoxua.png",
            name: "Epix",
            origin_country: "US",
        },
        {
            id: 6219,
            logo_path: "/4umnsbif8tOc6ILCmeO0pqRXWFP.png",
            name: "MGM+",
            origin_country: "US",
        },
    ],
    number_of_episodes: 40,
    number_of_seasons: 4,
    origin_country: ["US"],
    original_language: "en",
    original_name: "FROM",
    overview:
        "Unravel the mystery of a nightmarish town in middle America that traps all those who enter. As the unwilling residents fight to keep a sense of normalcy and search for a way out, they must also survive the threats of the surrounding forest – including the terrifying creatures that come out when the sun goes down.",
    popularity: 693.2688,
    poster_path: "/pRtJagIxpfODzzb0T0NAvZSzErC.jpg",
    production_companies: [
        {
            id: 106544,
            logo_path: "/psd84iF7PTGrKf4yFOStKj8JbAh.png",
            name: "AGBO",
            origin_country: "US",
        },
        {
            id: 51593,
            logo_path: "/qkmCZvtCAbNmRto9RdOd2mRm1IB.png",
            name: "Midnight Radio",
            origin_country: "US",
        },
        {
            id: 6805,
            logo_path: "/4774MDXAu1vsapNyTv1LK3S5Ww1.png",
            name: "Epix",
            origin_country: "US",
        },
        {
            id: 2230,
            logo_path: "/igOjospzsKQIbpuFCGhoN5F9icS.png",
            name: "MGM Television",
            origin_country: "US",
        },
        {
            id: 190164,
            logo_path: "/1ZjUvqLGbp5vUcY235LAvQyI6N3.png",
            name: "MGM+ Studios",
            origin_country: "US",
        },
    ],
    production_countries: [
        {
            iso_3166_1: "US",
            name: "United States of America",
        },
    ],
    seasons: [
        {
            air_date: "2022-02-20",
            episode_count: 10,
            id: 192632,
            name: "Season 1",
            overview:
                "Disoriented travelers find themselves trapped in a mysterious town with no exit, where malevolent forces toy with their minds and hunt them by night.",
            poster_path: "/ps46NdLlH70ptDD8ailTL8TCZU3.jpg",
            season_number: 1,
            vote_average: 7.1,
        },
        {
            air_date: "2023-04-23",
            episode_count: 10,
            id: 323757,
            name: "Season 2",
            overview:
                "Hidden truths about the nature and terrifying origins of the town begin to emerge, even as life for its residents is plunged into chaos by the arrival of mysterious newcomers.",
            poster_path: "/cJmfLHnF95XkoIr9as2bBK5cPeK.jpg",
            season_number: 2,
            vote_average: 6.6,
        },
        {
            air_date: "2024-09-22",
            episode_count: 10,
            id: 391491,
            name: "Season 3",
            overview:
                "The weather grows colder, food is scarce, and every day is more difficult than the last. Will the fight for survival force the residents of town to sacrifice the very humanity that sets them apart from the monsters they fear?",
            poster_path: "/26nRH0n69PPcWajKPfVP3BaFo2m.jpg",
            season_number: 3,
            vote_average: 6.6,
        },
        {
            air_date: "2026-04-19",
            episode_count: 10,
            id: 430163,
            name: "Season 4",
            overview:
                "The closer the town residents get to the answers they seek, the more terrifying their search becomes. Who is the Man in Yellow, and what does he want? Will Jade and Tabitha’s revelation be the key to finally going home? How much longer can Boyd hold the town together, even as his body and mind are falling apart? And what role will the town’s most recent arrival play in the events to come? Season Four will open doors that some in town will end up wishing had remained closed.",
            poster_path: "/dD5ANxZwvDGbDzKO90EJaUmPrR7.jpg",
            season_number: 4,
            vote_average: 5.3,
        },
    ],
    softcore: false,
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
        },
    ],
    status: "Returning Series",
    tagline: "",
    type: "Scripted",
    vote_average: 8.2,
    vote_count: 2652,
}
// accordian with scroll to season when clicked on seasion
export const TvControls = ({ season, episode }: { season: number; episode: number }) => {
    const navigate = Route.useNavigate()
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
        sampleData.seasons.find((s) => s.season_number === browsingSeason) || sampleData.seasons[0]

    return (
        <div className="flex flex-col h-full max-h-[80vh] w-full border rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden">
            {/* Header: Season Selector */}
            <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Episodes</h2>
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
                    {sampleData.seasons.map((s) => (
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
