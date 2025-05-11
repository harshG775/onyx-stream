export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
    original_language: string;
    adult: boolean;
    video: boolean;
}

export interface TV {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
    original_language: string;
    origin_country: string[];
}

export interface Person {
    id: number;
    name: string;
    profile_path: string | null;
    popularity: number;
    known_for_department: string;
    gender: number;
    adult: boolean;
    known_for: (Movie | TV)[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails extends Movie {
    belongs_to_collection: null | {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    };
    budget: number;
    genres: Genre[];
    homepage: string | null;
    imdb_id: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
}

export interface TVDetails extends TV {
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string | null;
    }[];
    episode_run_time: number[];
    genres: Genre[];
    homepage: string | null;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
    } | null;
    next_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
    } | null;
    networks: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
        vote_average: number;
    }[];
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
    type: string;
}

export interface PersonDetails extends Person {
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    imdb_id: string | null;
    place_of_birth: string | null;
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface Cast {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface Crew {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}

export interface Videos {
    id: number;
    results: Video[];
}

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface Images {
    id: number;
    backdrops: Image[];
    posters: Image[];
    logos?: Image[];
    profiles?: Image[];
}

export interface Image {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface SearchParams {
    query: string;
    page?: number;
    include_adult?: boolean;
    language?: string;
    primary_release_year?: number;
    year?: number;
    region?: string;
}

export type MediaType = "movie" | "tv" | "person";
export type TimeWindow = "day" | "week";
