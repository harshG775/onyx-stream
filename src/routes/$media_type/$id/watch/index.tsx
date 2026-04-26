import { PlayerFrame } from "#/components/player-frame"
import { GetExtensions } from "#/lib/get-extensions"
import { resolveSources } from "#/lib/resolve-sources"
import type { MediaType } from "#/types/tmdb.type"
import { createFileRoute, notFound } from "@tanstack/react-router"
import z from "zod"

export const Route = createFileRoute("/$media_type/$id/watch/")({
    validateSearch: z.object({
        season: z.number().optional(),
        episode: z.number().optional(),
    }),
    component: RouteComponent,
})
const { extensions } = GetExtensions()
const adapter = extensions.map((extension) => {
    return {
        name: extension.name,
        id: extension.id,
        adapter: {
            getEmbedUrl(mediaType: MediaType, id: string, season?: number, episode?: number) {
                const pattern = extension.embedPatterns?.[mediaType]
                if (!pattern) {
                    throw new Error(`Extension "${extension.id}" has no embed pattern for ${mediaType}`)
                }

                let base = extension.embedPatterns[mediaType]
                    .replace("{id}", id)
                    .replace("{baseUrl}", extension.baseUrl)
                    .replace("{season}", String(season ?? 1))
                    .replace("{episode}", String(episode ?? 1))
                return base
            },
        },
    }
})

function RouteComponent() {
    const { media_type, id } = Route.useParams()
    const { season, episode } = Route.useSearch()
    const navigate = Route.useNavigate()

    if ("tv" === media_type) {
        navigate({
            search: (prev) => ({ ...prev, season: 1, episode: 1 }),
        })
        return <PlayerFrame sources={resolveSources(adapter, media_type, id, season, episode)} />
    } else if ("movie" === media_type) {
        return <PlayerFrame sources={resolveSources(adapter, media_type, id)} />
    } else {
        throw notFound()
    }
}
