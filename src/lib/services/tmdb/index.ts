// src/lib/tmdb/sdk.ts
// Works with React / React Native / Expo / TanStack Query

import { env } from "@/env"
import axios, { AxiosInstance } from "axios"

const TMDB_BASE_URL = env.VITE_TMDB_BASE_URL

export interface TMDBConfig {
    apiKey: string
    language?: string
    region?: string
}

export const TMDB_IMAGE_BASE_URL = env.VITE_TMDB_IMAGE_BASE_URL

export type TMDBImageSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original"

export function getTMDBImageUrl(path: string | null, size: TMDBImageSize = "w500") {
    if (!path) return null
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export class TMDBClient {
    private client: AxiosInstance

    constructor(config: TMDBConfig) {
        this.client = axios.create({
            baseURL: TMDB_BASE_URL,
            params: {
                api_key: config.apiKey,
                language: config.language,
                region: config.region,
            },
        })
    }

    private async request<T>(path: string, params: Record<string, any> = {}): Promise<T> {
        const { data } = await this.client.get<T>(path, { params })
        return data
    }

    /* ===================== Movies ===================== */

    getPopularMovies(page = 1) {
        return this.request<import("@/types/tmdb.types").MoviesResponse>("/movie/popular", { page })
    }

    getUpcomingMovies(page = 1) {
        return this.request<import("@/types/tmdb.types").MoviesResponse>("/movie/upcoming", { page })
    }

    getMovieDetails(id: number) {
        return this.request<import("@/types/tmdb.types").MovieDetails>(`/movie/${id}`)
    }

    getMovieCredits(id: number) {
        return this.request<import("@/types/tmdb.types").CreditsResponse>(`/movie/${id}/credits`)
    }

    getMovieVideos(id: number) {
        return this.request<import("@/types/tmdb.types").VideosResponse>(`/movie/${id}/videos`)
    }

    /* ===================== TV Shows ===================== */

    getPopularTV(page = 1) {
        return this.request<import("@/types/tmdb.types").TVShowsResponse>("/tv/popular", { page })
    }

    getTVDetails(id: number) {
        return this.request<import("@/types/tmdb.types").TVShowDetails>(`/tv/${id}`)
    }

    getTVCredits(id: number) {
        return this.request<import("@/types/tmdb.types").CreditsResponse>(`/tv/${id}/credits`)
    }

    /* ===================== Search ===================== */

    searchMulti(query: string, page = 1) {
        return this.request<import("@/types/tmdb.types").SearchMultiResponse>("/search/multi", {
            query,
            page,
        })
    }

    /* ===================== Trending ===================== */

    getTrendingAll(timeWindow: "day" | "week" = "day", page = 1) {
        return this.request<import("@/types/tmdb.types").PaginatedResponse<any>>(`/trending/all/${timeWindow}`, {
            page,
        })
    }

    getTrendingMovies(timeWindow: "day" | "week" = "day", page = 1) {
        return this.request<import("@/types/tmdb.types").MoviesResponse>(`/trending/movie/${timeWindow}`, { page })
    }

    getTrendingTV(timeWindow: "day" | "week" = "day", page = 1) {
        return this.request<import("@/types/tmdb.types").TVShowsResponse>(`/trending/tv/${timeWindow}`, { page })
    }
}

/* ===================== Singleton helper ===================== */

export const tmdb = new TMDBClient({
    apiKey: env.VITE_TMDB_API_KEY!,
    language: "en-US",
})
