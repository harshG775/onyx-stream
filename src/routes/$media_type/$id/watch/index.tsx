import { useEffect } from "react"
import { PlayerFrame } from "#/components/player-frame"
import { GetExtensions } from "#/lib/get-extensions"
import { resolveSources } from "#/lib/resolve-sources"
import type { MediaType } from "#/types/tmdb.type"
import { createFileRoute, notFound } from "@tanstack/react-router"
import z from "zod"
import type { StreamAdapter } from "#/types/extension.type"

export const Route = createFileRoute("/$media_type/$id/watch/")({
    validateSearch: z.object({
        season: z.number().optional(),
        episode: z.number().optional(),
    }),
    component: RouteComponent,
})

const MoviePlayerFrame = ({
    adapters,
    id,
}: {
    adapters: { id: string; name: string; adapter: StreamAdapter }[]
    id: string
}) => {
    const sources = resolveSources(adapters, "movie", id)
    return <PlayerFrame sources={sources} />
}

const TvPlayerFrame = ({
    adapters,
    id,
    season,
    episode,
}: {
    adapters: { id: string; name: string; adapter: StreamAdapter }[]
    id: string
    season?: number
    episode?: number
}) => {
    const navigate = Route.useNavigate()

    useEffect(() => {
        if (season === undefined || episode === undefined) {
            navigate({
                search: (prev) => ({ ...prev, season: 1, episode: 1 }),
                replace: true,
            })
        }
    }, [season, episode, navigate])

    const sources = resolveSources(adapters, "tv", id, season ?? 1, episode ?? 1)
    return <PlayerFrame sources={sources} />
}

function RouteComponent() {
    const { media_type, id } = Route.useParams()
    const { season, episode } = Route.useSearch()
    const { extensions } = GetExtensions()

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
        return <TvPlayerFrame id={id} season={season} episode={episode} adapters={adapters} />
    }

    if (media_type === "movie") {
        return <MoviePlayerFrame id={id} adapters={adapters} />
    }

    throw notFound()
}
