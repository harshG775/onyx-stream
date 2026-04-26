import type { StreamAdapter } from "#/types/extension.type"
import type { MediaType } from "#/types/tmdb.type"

export type ResolvedSource = {
    id: string
    name: string
    url: string
}

/**
 * Returns all enabled stream sources sorted by priority.
 * The player renders all of them and lets the user switch if one fails.
 */
export function resolveSources(
    adapters: Array<{ id: string; name: string; adapter: StreamAdapter }>,
    mediaType: MediaType,
    imdbId: string,
    season?: number,
    episode?: number,
): ResolvedSource[] {
    const sources: ResolvedSource[] = []

    for (const { id, name, adapter } of adapters) {
        try {
            const url = adapter.getEmbedUrl(mediaType, imdbId, season, episode)
            sources.push({ id, name, url })
        } catch {
            // Extension doesn't support this media type — skip silently
        }
    }

    return sources
}
