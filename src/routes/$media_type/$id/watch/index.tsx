import { PlayerFrame } from "#/components/player-frame"
import { GetExtensions } from "#/lib/get-extensions"
import { resolveSources } from "#/lib/resolve-sources"
import type { MediaType } from "#/types/tmdb.type"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod"
import { WatchLayout } from "./-components/watch-layout"
import { TvControls } from "./-components/tv-controls"
import { useEffect } from "react"

export const Route = createFileRoute("/$media_type/$id/watch/")({
    validateSearch: z.object({
        season: z.number().optional(),
        episode: z.number().optional(),
    }),
    component: RouteComponent,
})

function RouteComponent() {
    const { media_type, id } = Route.useParams()
    const { season, episode } = Route.useSearch()
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

    if (media_type === "tv") {
        const sources = resolveSources(adapters, "tv", id, season ?? 1, episode ?? 1)

        return (
            <WatchLayout
                player={<PlayerFrame sources={sources} />}
                controls={<TvControls season={season ?? 1} episode={episode ?? 1} />}
                episodes={<div className="min-h-96">Episode List UI (grid/list)</div>}
                comments={<div className="min-h-96">Comments system</div>}
                recommended={<div className="min-h-96">Recommended shows</div>}
            />
        )
    }

    if (media_type === "movie") {
        const sources = resolveSources(adapters, "movie", id)

        return (
            <WatchLayout
                player={<PlayerFrame sources={sources} />}
                comments={<div className="min-h-96">Comments system</div>}
                recommended={<div className="min-h-96">Recommended shows</div>}
            />
        )
    }
}
