import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTrending,
    getPopularMovies,
    getPopularTVShows,
    getNowPlayingMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getMovieDetails,
    getMovieCredits,
    getMovieVideos,
    getMovieImages,
    getSimilarMovies,
    getRecommendedMovies,
    getTVDetails,
    getTVCredits,
    getTVVideos,
    getTVImages,
    getSimilarTVShows,
    getRecommendedTVShows,
    getPersonDetails,
    getPersonMovieCredits,
    getPersonTVCredits,
    getPersonImages,
    search,
    getTopRatedTVShows,
} from "@/lib/tmdb-api";
import { tmdbKeys } from "@/lib/tmdb-config";
import type {
    MediaType,
    TimeWindow,
    //  SearchParams, Movie, TV, Person
} from "@/types/tmdb";

// Language management hook
export function useLanguage() {
    // Get the language from local storage or use the default 'en-US'
    const getStoredLanguage = () => {
        if (typeof window === "undefined") return "en-US";
        return localStorage.getItem("tmdb-language") || "en-US";
    };

    const queryClient = useQueryClient();

    // Use mutation to update language
    const languageMutation = useMutation({
        mutationFn: (newLanguage: string) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("tmdb-language", newLanguage);
            }
            return Promise.resolve(newLanguage);
        },
        onSuccess: () => {
            // Invalidate all queries to refresh with new language
            queryClient.invalidateQueries({ queryKey: tmdbKeys.all });
        },
    });

    return {
        language: getStoredLanguage(),
        setLanguage: (newLanguage: string) => languageMutation.mutate(newLanguage),
        isUpdating: languageMutation.isPending,
    };
}

// Hook for trending content
export function useTrending<T>(mediaType: MediaType, timeWindow: TimeWindow = "day", page = 1, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.trending(mediaType, timeWindow), page, language],
        queryFn: () => getTrending<T>(mediaType, timeWindow, page, language),
        ...options,
    });
}

// Hook for popular movies
export function usePopularMovies(page = 1, region?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.popular("movie"), page, language, region],
        queryFn: () => getPopularMovies(page, language, region),
        ...options,
    });
}

// Hook for now playing movies
export function useNowPlayingMovies(page = 1, region?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.all, "now-playing", page, language, region],
        queryFn: () => getNowPlayingMovies(page, language, region),
        ...options,
    });
}

// Hook for upcoming movies
export function useUpcomingMovies(page = 1, region?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.all, "upcoming", page, language, region],
        queryFn: () => getUpcomingMovies(page, language, region),
        ...options,
    });
}

// Hook for top rated movies
export function useTopRatedMovies(page = 1, region?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.all, "top-rated", "movie", page, language, region],
        queryFn: () => getTopRatedMovies(page, language, region),
        ...options,
    });
}

// Hook for movie details
export function useMovieDetails(id: number, appendToResponse?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.details("movie", id), language, appendToResponse],
        queryFn: () => getMovieDetails(id, language, appendToResponse),
        enabled: !!id,
        ...options,
    });
}

// Hook for movie credits
export function useMovieCredits(id: number, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.credits("movie", id), language],
        queryFn: () => getMovieCredits(id, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for movie videos
export function useMovieVideos(id: number, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.videos("movie", id), language],
        queryFn: () => getMovieVideos(id, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for movie images
export function useMovieImages(id: number, includeImageLanguage?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.images("movie", id), language, includeImageLanguage],
        queryFn: () => getMovieImages(id, language, includeImageLanguage),
        enabled: !!id,
        ...options,
    });
}

// Hook for similar movies
export function useSimilarMovies(id: number, page = 1, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.similar("movie", id), page, language],
        queryFn: () => getSimilarMovies(id, page, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for recommended movies
export function useRecommendedMovies(id: number, page = 1, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.recommendations("movie", id), page, language],
        queryFn: () => getRecommendedMovies(id, page, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for popular TV shows
export function usePopularTVShows(page = 1, region?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.popular("tv"), page, language, region],
        queryFn: () => getPopularTVShows(page, language, region),
        ...options,
    });
}

// Hook for top rated TV shows
export function useTopRatedTVShows(page = 1, region?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.all, "top-rated", "tv", page, language, region],
        queryFn: () => getTopRatedTVShows(page, language, region),
        ...options,
    });
}

// Hook for TV show details
export function useTVDetails(id: number, appendToResponse?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.details("tv", id), language, appendToResponse],
        queryFn: () => getTVDetails(id, language, appendToResponse),
        enabled: !!id,
        ...options,
    });
}

// Hook for TV show credits
export function useTVCredits(id: number, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.credits("tv", id), language],
        queryFn: () => getTVCredits(id, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for TV show videos
export function useTVVideos(id: number, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.videos("tv", id), language],
        queryFn: () => getTVVideos(id, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for TV show images
export function useTVImages(id: number, includeImageLanguage?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.images("tv", id), language, includeImageLanguage],
        queryFn: () => getTVImages(id, language, includeImageLanguage),
        enabled: !!id,
        ...options,
    });
}

// Hook for similar TV shows
export function useSimilarTVShows(id: number, page = 1, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.similar("tv", id), page, language],
        queryFn: () => getSimilarTVShows(id, page, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for recommended TV shows
export function useRecommendedTVShows(id: number, page = 1, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.recommendations("tv", id), page, language],
        queryFn: () => getRecommendedTVShows(id, page, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for person details
export function usePersonDetails(id: number, appendToResponse?: string, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.details("person", id), language, appendToResponse],
        queryFn: () => getPersonDetails(id, language, appendToResponse),
        enabled: !!id,
        ...options,
    });
}

// Hook for person movie credits
export function usePersonMovieCredits(id: number, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.all, "person", id, "movie_credits", language],
        queryFn: () => getPersonMovieCredits(id, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for person TV credits
export function usePersonTVCredits(id: number, options = {}) {
    const { language } = useLanguage();

    return useQuery({
        queryKey: [...tmdbKeys.all, "person", id, "tv_credits", language],
        queryFn: () => getPersonTVCredits(id, language),
        enabled: !!id,
        ...options,
    });
}

// Hook for person images
export function usePersonImages(id: number, options = {}) {
    return useQuery({
        queryKey: [...tmdbKeys.images("person", id)],
        queryFn: () => getPersonImages(id),
        enabled: !!id,
        ...options,
    });
}

// Hook for search functionality
export function useSearch<T>(mediaType: MediaType, query: string, page = 1, options = {}) {
    const { language } = useLanguage();
    const enabled = query.trim().length > 0;

    return useQuery({
        queryKey: [...tmdbKeys.search(mediaType, query), page, language],
        queryFn: () => search<T>(mediaType, { query, page, language }),
        enabled,
        ...options,
    });
}
