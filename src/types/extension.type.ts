export type EmbedPatterns = {
    movie: string
    tv: string
}

export type Extension = {
    id: string
    name: string
    enabled: boolean
    required: boolean
    baseUrl: string
    priority: number
    embedPatterns: EmbedPatterns
}

export type ExtensionManifest = {
    version: string
    extensions: Extension[]
}


export type StreamAdapter = {
    getEmbedUrl(mediaType: "movie" | "tv", imdbId: string, season?: number, episode?: number): string
}
