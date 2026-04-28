import axios from "axios"
import { env } from "@/env"
import { TMDB } from "tmdb-ts"

const axiosFetch: typeof fetch = async (input, init) => {
    const { data, status, statusText, headers } = await axios({
        url: input.toString(),
        method: init?.method ?? "GET",
        headers: init?.headers as Record<string, string>,
        data: init?.body,
    })

    return new Response(JSON.stringify(data), {
        status,
        statusText,
        headers: new Headers(headers as Record<string, string>),
    })
}

export const tmdb = new TMDB(env.VITE_TMDB_ACCESS_TOKEN, { fetch: axiosFetch })

//----------------------------------------------------------------------------------------------------------------------
export const TMDB_IMAGE_BASE_URL = env.VITE_TMDB_IMAGE_BASE_URL

export type TMDBImageSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "w1280" | "original"

export function getTMDBImageUrl(path: string | null, size: TMDBImageSize = "w500") {
    if (!path) return null
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
