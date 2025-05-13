export type MediaType = "tv" | "movie";
export type Provider = "vidsrc" | "vidfast" | "multiembed";

interface EmbedUrlOptions {
    tmdbId: number;
    type: MediaType;
    season?: number;
    episode?: number;
}

const getDefaultSeason = (season?: number) => season ?? 1;
const getDefaultEpisode = (episode?: number) => episode ?? 1;

const buildVidsrcUrl = ({ tmdbId, type, season, episode }: EmbedUrlOptions): string => {
    if (type === "tv") {
        const s = season ?? 1;
        const e = episode ?? 1;
        return `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&season=${s}&episode=${e}`;
    }
    return `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`;
};

const buildVidfastUrl = ({ tmdbId, type, season, episode }: EmbedUrlOptions): string => {
    if (type === "tv") {
        const s = getDefaultSeason(season);
        const e = getDefaultEpisode(episode);
        return `https://vidfast.pro/tv/${tmdbId}/${s}/${e}`;
    }
    return `https://vidfast.pro/movie/${tmdbId}`;
};

const buildMultiembedUrl = ({ tmdbId, type, season, episode }: EmbedUrlOptions): string => {
    if (type === "tv") {
        const s = getDefaultSeason(season);
        const e = getDefaultEpisode(episode);
        return `https://multiembed.mov/directstream.php/?tmdb=1&video_id=${tmdbId}&s=${s}&e=${e}`;
    }
    return `https://multiembed.mov/directstream.php/?tmdb=1&video_id=${tmdbId}`;
};

export const getEmbedUrl = (provider: Provider, options: EmbedUrlOptions): string => {
    switch (provider) {
        case "vidsrc":
            return buildVidsrcUrl(options);
        case "vidfast":
            return buildVidfastUrl(options);
        case "multiembed":
            return buildMultiembedUrl(options);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
};

export const getAllProviders = (): Provider[] => ["vidsrc", "vidfast", "multiembed"];

export const isValidProvider = (provider: string): provider is Provider =>
    getAllProviders().includes(provider as Provider);
