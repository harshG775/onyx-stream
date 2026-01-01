// src/lib/tmdb/sdk.ts
// Works with React / React Native / Expo / TanStack Query

import axios from "axios"
import type { AxiosInstance } from "axios"
import type {
    CreditsResponse,
    MovieDetails,
    MoviesResponse,
    PaginatedResponse,
    SearchMultiResponse,
    TVShowDetails,
    TVShowsResponse,
    TvSeasonDetails,
    VideosResponse,
} from "@/types/tmdb.types"
import { env } from "@/env"

const TMDB_BASE_URL = env.VITE_TMDB_BASE_URL

export interface TMDBConfig {
    apiKey: string
    language?: string
    region?: string
}

export const TMDB_IMAGE_BASE_URL = env.VITE_TMDB_IMAGE_BASE_URL

export type TMDBImageSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "w1280" | "original"

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
        return this.request<MoviesResponse>("/movie/popular", { page })
    }
    getUpcomingMovies(page = 1) {
        return this.request<MoviesResponse>("/movie/upcoming", { page })
    }
    getMovieDetails(id: number) {
        return this.request<MovieDetails>(`/movie/${id}`)
    }
    getMovieCredits(id: number) {
        return this.request<CreditsResponse>(`/movie/${id}/credits`)
    }
    getMovieVideos(id: number) {
        return this.request<VideosResponse>(`/movie/${id}/videos`)
    }
    getMovieImages(id: number) {
        return this.request<VideosResponse>(`/movie/${id}/images`)
    }
    /* ===================== TV Shows ===================== */

    getPopularTV(page = 1) {
        return this.request<TVShowsResponse>("/tv/popular", { page })
    }

    getTVDetails(id: number) {
        return this.request<TVShowDetails>(`/tv/${id}`)
    }

    getTVCredits(id: number) {
        return this.request<CreditsResponse>(`/tv/${id}/credits`)
    }
    getTVImages(id: number) {
        return this.request<VideosResponse>(`/tv/${id}/images`)
    }
    getTVSeason(id: number, season: number) {
        return this.request<TvSeasonDetails>(`/tv/${id}/season/${season}`)
    }
    /* ===================== Search ===================== */

    searchMulti(query: string, page = 1, signal?: AbortSignal) {
        return this.request<SearchMultiResponse>("/search/multi", {
            query,
            page,
            signal,
        })
    }

    /* ===================== Trending ===================== */
    getTrendingAll(timeWindow: "day" | "week" = "day", page = 1) {
        return this.request<PaginatedResponse<any>>(`/trending/all/${timeWindow}`, {
            page,
        })
    }

    getTrendingMovies(timeWindow: "day" | "week" = "day", page = 1) {
        return this.request<MoviesResponse>(`/trending/movie/${timeWindow}`, { page })
    }

    getTrendingTV(timeWindow: "day" | "week" = "day", page = 1) {
        return this.request<TVShowsResponse>(`/trending/tv/${timeWindow}`, { page })
    }

    /* ===================== Genres ===================== */
    getMovieGenres() {
        return this.request<{ genres: Array<{ id: number; name: string }> }>("/genre/movie/list")
    }

    getTVGenres() {
        return this.request<{ genres: Array<{ id: number; name: string }> }>("/genre/tv/list")
    }
}

/* ===================== Singleton helper ===================== */

export const tmdb = new TMDBClient({
    apiKey: env.VITE_TMDB_API_KEY!,
    language: "en-US",
})
