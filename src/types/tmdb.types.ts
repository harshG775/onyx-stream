// src/types/tmdb.ts
// Updated & practical TMDB v3 TypeScript types (2024+)
// Designed for React / React Native / TanStack Query usage

/* =====================
   Shared / Utils
===================== */

export type ISODate = string // YYYY-MM-DD

export interface PaginatedResponse<T> {
    page: number
    results: Array<T>
    total_pages: number
    total_results: number
}

export interface TMDBImage {
    aspect_ratio: number
    height: number
    file_path: string
    vote_average?: number
    vote_count?: number
    width: number
}
export type Media_type = "person" | "movie" | "tv"

/* =====================
   Movies
===================== */

export interface Movie {
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: ISODate
    adult: boolean
    genre_ids: Array<number>
    original_language: string
    popularity: number
    vote_average: number
    vote_count: number
    video: boolean
}

export type MoviesResponse = PaginatedResponse<Movie>

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
    belongs_to_collection: Collection | null
    budget: number
    genres: Array<Genre>
    homepage: string | null
    imdb_id: string | null
    production_companies: Array<ProductionCompany>
    production_countries: Array<ProductionCountry>
    revenue: number
    runtime: number | null
    spoken_languages: Array<SpokenLanguage>
    status: MovieStatus
    tagline: string | null
}

export type MovieStatus = "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled"

/* =====================
   TV Shows
===================== */

export interface TVShow {
    id: number
    name: string
    original_name: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    first_air_date: ISODate
    origin_country: Array<string>
    original_language: string
    popularity: number
    vote_average: number
    vote_count: number
    genre_ids: Array<number>
}

export type TVShowsResponse = PaginatedResponse<TVShow>

export interface TVShowDetails extends Omit<TVShow, "genre_ids"> {
    created_by: Array<Creator>
    episode_run_time: Array<number>
    genres: Array<Genre>
    homepage: string | null
    in_production: boolean
    languages: Array<string>
    last_air_date: ISODate
    number_of_episodes: number
    number_of_seasons: number
    production_companies: Array<ProductionCompany>
    production_countries: Array<ProductionCountry>
    seasons: Array<Season>
    last_episode_to_air: {
        id: number
        name: string
        overview: string
        vote_average: number
        vote_count: number
        air_date: string
        episode_number: number
        episode_type: string
        production_code: string
        runtime: number
        season_number: number
        show_id: number
        still_path: string
    }
    spoken_languages: Array<SpokenLanguage>
    status: TVStatus
    tagline: string | null
    type: string
}

export type TVStatus = "Returning Series" | "Ended" | "Canceled" | "In Production"

/* =====================
   People
===================== */

export interface Person {
    id: number
    name: string
    profile_path: string | null
    known_for_department: string
    popularity: number
}

export interface PersonDetails extends Person {
    biography: string
    birthday: ISODate | null
    deathday: ISODate | null
    gender: 0 | 1 | 2 | 3
    homepage: string | null
    imdb_id: string | null
    place_of_birth: string | null
}

/* =====================
   Credits
===================== */

export interface Cast {
    id: number
    name: string
    character: string
    profile_path: string | null
    order: number
}

export interface Crew {
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
}

export interface CreditsResponse {
    cast: Array<Cast>
    crew: Array<Crew>
}

/* =====================
   Search
===================== */

export type SearchMultiResult = Movie | TVShow | Person
export type SearchMultiResponse = PaginatedResponse<SearchMultiResult & { media_type: Media_type }>

/* =====================
   Supporting Models
===================== */

export interface Genre {
    id: number
    name: string
}

export interface Collection {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
}

export interface ProductionCompany {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    iso_639_1: string
    english_name: string
    name: string
}

export interface Creator {
    id: number
    name: string
    profile_path: string | null
}

export interface Season {
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    episode_count: number
    air_date: ISODate
}

/* =====================
   Images / Videos
===================== */

export interface ImagesResponse {
    backdrops: Array<TMDBImage>
    posters: Array<TMDBImage>
}

export interface Video {
    id: string
    key: string
    name: string
    site: "YouTube" | "Vimeo"
    size: number
    type: "Trailer" | "Teaser" | "Clip" | "Featurette"
    official: boolean
    published_at: string
}

export interface VideosResponse {
    results: Array<Video>
}




/* =====================
   Season
===================== */
type PersonBase = {
    id: number
    name: string
    original_name: string
    adult: boolean
    gender: number
    known_for_department: string
    popularity: number
    profile_path: string | null
}
export type CrewMember = PersonBase & {
    job: string
    department: string
    credit_id: string
}
export type GuestStar = PersonBase & {
    character: string
    credit_id: string
    order: number
}
export type Network = {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
}

export type Episode = {
    id: number
    name: string
    overview: string
    air_date: string | null
    episode_number: number
    episode_type: "standard" | string
    production_code: string
    runtime: number | null
    season_number: number
    show_id: number
    still_path: string | null
    vote_average: number
    vote_count: number
    crew: CrewMember[]
    guest_stars: GuestStar[]
}
export type TvSeasonDetails = {
    _id: string
    id: number
    name: string
    overview: string
    air_date: string | null
    poster_path: string | null
    season_number: number
    vote_average: number
    episodes: Episode[]
    networks: Network[]
}
