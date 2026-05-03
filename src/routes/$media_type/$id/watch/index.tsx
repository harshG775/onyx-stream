import { PlayerFrame } from "#/routes/$media_type/$id/watch/-components/player-frame"
import { GetExtensions } from "#/routes/$media_type/$id/watch/-lib/get-extensions"
import { resolveSources } from "#/routes/$media_type/$id/watch/-lib/resolve-sources"
import type { MediaType } from "#/routes/$media_type/$id/watch/-types/tmdb.type"
import { createFileRoute, notFound } from "@tanstack/react-router"
import z from "zod"
import { WatchLayout } from "./-components/watch-layout"
import { TvControls } from "./-components/tv-controls"
import { useEffect } from "react"
import { tmdb } from "#/lib/services/tmdb"
import type { MovieDetails, TvShowDetails } from "tmdb-ts"

export const Route = createFileRoute("/$media_type/$id/watch/")({
    async loader({ params }) {
        const id = Number(params.id)
        let tvShowDetails: TvShowDetails | null = null
        let movieDetails: MovieDetails | null = null
        if (params.media_type === "tv") {
            tvShowDetails = await tmdb.tvShows.details(id)
        }
        if (params.media_type === "movie") {
            movieDetails = await tmdb.movies.details(id)
        }
        return { tvShowDetails, movieDetails }
    },
    validateSearch: z.object({
        season: z.number().optional(),
        episode: z.number().optional(),
    }),
    component: RouteComponent,
})

function RouteComponent() {
    const { media_type, id } = Route.useParams()
    const { season, episode } = Route.useSearch()
    const loaderData = Route.useLoaderData()
    const { extensions } = GetExtensions()
    const navigate = Route.useNavigate()

    useEffect(() => {
        if (media_type === "tv" && media_type && (season === undefined || episode === undefined)) {
            navigate({
                search: (prev) => ({ ...prev, season: 1, episode: 1 }),
                replace: true,
            })
        }
    }, [])
    const adapters = extensions.map((extension) => ({
        name: extension.name,
        id: extension.id,
        adapter: {
            getEmbedUrl(mediaType: MediaType, id: string, s?: number, e?: number) {
                const pattern = extension.embedPatterns?.[mediaType]
                if (!pattern) throw new Error(`No pattern for ${mediaType}`)

                return pattern
                    .replace("{id}", id)
                    .replace("{baseUrl}", extension.baseUrl)
                    .replace("{season}", String(s ?? 1))
                    .replace("{episode}", String(e ?? 1))
            },
        },
    }))

    if (media_type === "tv" && loaderData?.tvShowDetails) {
        const sources = resolveSources(adapters, "tv", id, season ?? 1, episode ?? 1)

        return (
            <WatchLayout
                player={<PlayerFrame sources={sources} title={loaderData?.tvShowDetails.name} />}
                controls={
                    <TvControls tvShowDetails={loaderData?.tvShowDetails} season={season ?? 1} episode={episode ?? 1} />
                }
                comments={
                    <div className="min-h-96 border rounded-lg xl:rounded-xl p-4">
                        <h2 className="font-bold text-lg uppercase">Comments</h2>
                    </div>
                }
                // recommended={<div className="min-h-96">Recommended shows</div>}
            />
        )
    }

    if (media_type === "movie" && loaderData.movieDetails) {
        const sources = resolveSources(adapters, "movie", id)

        return (
            <WatchLayout
                player={<PlayerFrame sources={sources} title={loaderData.movieDetails.title} />}
                comments={
                    <div className="min-h-96 border rounded-lg xl:rounded-xl p-4">
                        <h2 className="font-bold text-lg uppercase">Comments</h2>
                    </div>
                }
                // recommended={<div className="min-h-96">Recommended shows</div>}
            />
        )
    }
    return notFound()
}
