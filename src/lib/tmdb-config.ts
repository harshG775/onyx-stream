// TMDB API configuration

// Environment variable for TMDB API key should be set in .env.local
// NEXT_PUBLIC_TMDB_API_KEY=your_api_key
export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

if (!TMDB_API_KEY && typeof window !== "undefined") {
    console.warn("TMDB API key is missing. Set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.");
}

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const DEFAULT_LANGUAGE = "en-US";

// Available image sizes from TMDB
export const IMAGE_SIZES = {
    backdrop: {
        w300: "w300",
        w780: "w780",
        w1280: "w1280",
        original: "original",
    },
    poster: {
        w92: "w92",
        w154: "w154",
        w185: "w185",
        w342: "w342",
        w500: "w500",
        w780: "w780",
        original: "original",
    },
    profile: {
        w45: "w45",
        w185: "w185",
        h632: "h632",
        original: "original",
    },
    logo: {
        w45: "w45",
        w92: "w92",
        w154: "w154",
        w185: "w185",
        w300: "w300",
        w500: "w500",
        original: "original",
    },
} as const;

// Query key factory for Tanstack Query
export const tmdbKeys = {
    all: ["tmdb"] as const,
    trending: (mediaType: string, timeWindow: string) => [...tmdbKeys.all, "trending", mediaType, timeWindow] as const,
    popular: (mediaType: string) => [...tmdbKeys.all, "popular", mediaType] as const,
    details: (mediaType: string, id: number) => [...tmdbKeys.all, mediaType, id, "details"] as const,
    credits: (mediaType: string, id: number) => [...tmdbKeys.all, mediaType, id, "credits"] as const,
    videos: (mediaType: string, id: number) => [...tmdbKeys.all, mediaType, id, "videos"] as const,
    images: (mediaType: string, id: number) => [...tmdbKeys.all, mediaType, id, "images"] as const,
    similar: (mediaType: string, id: number) => [...tmdbKeys.all, mediaType, id, "similar"] as const,
    recommendations: (mediaType: string, id: number) => [...tmdbKeys.all, mediaType, id, "recommendations"] as const,
    search: (mediaType: string, query: string) => [...tmdbKeys.all, "search", mediaType, query] as const,
};
