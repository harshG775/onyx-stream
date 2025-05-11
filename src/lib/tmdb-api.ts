import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "./tmdb-config";
import type {
    TMDBResponse,
    Movie,
    TV,
    // Person,
    MovieDetails,
    TVDetails,
    PersonDetails,
    Credits,
    Videos,
    Images,
    SearchParams,
    MediaType,
    TimeWindow,
} from "@/types/tmdb";

// Create axios instance with base configuration
const tmdbClient = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

// API function to get trending items
export const getTrending = async <T>(
    mediaType: MediaType,
    timeWindow: TimeWindow = "day",
    page = 1,
    language = "en-US"
): Promise<TMDBResponse<T>> => {
    const response = await tmdbClient.get<TMDBResponse<T>>(`/trending/${mediaType}/${timeWindow}`, {
        params: { page, language },
    });
    return response.data;
};

// API function to search movies, TV shows, or people
export const search = async <T>(mediaType: MediaType, params: SearchParams): Promise<TMDBResponse<T>> => {
    const response = await tmdbClient.get<TMDBResponse<T>>(`/search/${mediaType}`, { params });
    return response.data;
};

// API function to get popular movies
export const getPopularMovies = async (page = 1, language = "en-US", region?: string): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>("/movie/popular", {
        params: { page, language, region },
    });
    return response.data;
};

// API function to get now playing movies
export const getNowPlayingMovies = async (
    page = 1,
    language = "en-US",
    region?: string
): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>("/movie/now_playing", {
        params: { page, language, region },
    });
    return response.data;
};

// API function to get upcoming movies
export const getUpcomingMovies = async (
    page = 1,
    language = "en-US",
    region?: string
): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>("/movie/upcoming", {
        params: { page, language, region },
    });
    return response.data;
};

// API function to get top rated movies
export const getTopRatedMovies = async (
    page = 1,
    language = "en-US",
    region?: string
): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>("/movie/top_rated", {
        params: { page, language, region },
    });
    return response.data;
};

// API function to get movie details
export const getMovieDetails = async (
    id: number,
    language = "en-US",
    appendToResponse?: string
): Promise<MovieDetails> => {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${id}`, {
        params: { language, append_to_response: appendToResponse },
    });
    return response.data;
};

// API function to get movie credits
export const getMovieCredits = async (id: number, language = "en-US"): Promise<Credits> => {
    const response = await tmdbClient.get<Credits>(`/movie/${id}/credits`, { params: { language } });
    return response.data;
};

// API function to get movie videos
export const getMovieVideos = async (id: number, language = "en-US"): Promise<Videos> => {
    const response = await tmdbClient.get<Videos>(`/movie/${id}/videos`, { params: { language } });
    return response.data;
};

// API function to get movie images
export const getMovieImages = async (
    id: number,
    language = "en-US",
    includeImageLanguage?: string
): Promise<Images> => {
    const response = await tmdbClient.get<Images>(`/movie/${id}/images`, {
        params: {
            language,
            include_image_language: includeImageLanguage || `${language},null`,
        },
    });
    return response.data;
};

// API function to get similar movies
export const getSimilarMovies = async (id: number, page = 1, language = "en-US"): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>(`/movie/${id}/similar`, { params: { page, language } });
    return response.data;
};

// API function to get recommended movies
export const getRecommendedMovies = async (id: number, page = 1, language = "en-US"): Promise<TMDBResponse<Movie>> => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>(`/movie/${id}/recommendations`, {
        params: { page, language },
    });
    return response.data;
};

// API function to get popular TV shows
export const getPopularTVShows = async (page = 1, language = "en-US", region?: string): Promise<TMDBResponse<TV>> => {
    const response = await tmdbClient.get<TMDBResponse<TV>>("/tv/popular", { params: { page, language, region } });
    return response.data;
};

// API function to get top rated TV shows
export const getTopRatedTVShows = async (page = 1, language = "en-US", region?: string): Promise<TMDBResponse<TV>> => {
    const response = await tmdbClient.get<TMDBResponse<TV>>("/tv/top_rated", { params: { page, language, region } });
    return response.data;
};

// API function to get TV show details
export const getTVDetails = async (id: number, language = "en-US", appendToResponse?: string): Promise<TVDetails> => {
    const response = await tmdbClient.get<TVDetails>(`/tv/${id}`, {
        params: { language, append_to_response: appendToResponse },
    });
    return response.data;
};

// API function to get TV show credits
export const getTVCredits = async (id: number, language = "en-US"): Promise<Credits> => {
    const response = await tmdbClient.get<Credits>(`/tv/${id}/credits`, { params: { language } });
    return response.data;
};

// API function to get TV show videos
export const getTVVideos = async (id: number, language = "en-US"): Promise<Videos> => {
    const response = await tmdbClient.get<Videos>(`/tv/${id}/videos`, { params: { language } });
    return response.data;
};

// API function to get TV show images
export const getTVImages = async (id: number, language = "en-US", includeImageLanguage?: string): Promise<Images> => {
    const response = await tmdbClient.get<Images>(`/tv/${id}/images`, {
        params: {
            language,
            include_image_language: includeImageLanguage || `${language},null`,
        },
    });
    return response.data;
};

// API function to get similar TV shows
export const getSimilarTVShows = async (id: number, page = 1, language = "en-US"): Promise<TMDBResponse<TV>> => {
    const response = await tmdbClient.get<TMDBResponse<TV>>(`/tv/${id}/similar`, { params: { page, language } });
    return response.data;
};

// API function to get recommended TV shows
export const getRecommendedTVShows = async (id: number, page = 1, language = "en-US"): Promise<TMDBResponse<TV>> => {
    const response = await tmdbClient.get<TMDBResponse<TV>>(`/tv/${id}/recommendations`, {
        params: { page, language },
    });
    return response.data;
};

// API function to get person details
export const getPersonDetails = async (
    id: number,
    language = "en-US",
    appendToResponse?: string
): Promise<PersonDetails> => {
    const response = await tmdbClient.get<PersonDetails>(`/person/${id}`, {
        params: { language, append_to_response: appendToResponse },
    });
    return response.data;
};

// API function to get person movie credits
export const getPersonMovieCredits = async (
    id: number,
    language = "en-US"
): Promise<{ id: number; cast: Movie[]; crew: Movie[] }> => {
    const response = await tmdbClient.get<{ id: number; cast: Movie[]; crew: Movie[] }>(`/person/${id}/movie_credits`, {
        params: { language },
    });
    return response.data;
};

// API function to get person TV credits
export const getPersonTVCredits = async (
    id: number,
    language = "en-US"
): Promise<{ id: number; cast: TV[]; crew: TV[] }> => {
    const response = await tmdbClient.get<{ id: number; cast: TV[]; crew: TV[] }>(`/person/${id}/tv_credits`, {
        params: { language },
    });
    return response.data;
};

// API function to get person images
export const getPersonImages = async (id: number): Promise<Images> => {
    const response = await tmdbClient.get<Images>(`/person/${id}/images`);
    return response.data;
};
