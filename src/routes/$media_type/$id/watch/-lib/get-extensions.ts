import type { ExtensionManifest } from "#/routes/$media_type/$id/watch/-types/extension.type"

const extension: ExtensionManifest = {
    version: "1.0",
    extensions: [
        {
            id: "vidfast",
            name: "VidFast",
            enabled: true,
            required: false,
            priority: 1,
            baseUrl: "https://vidfast.pro",
            embedPatterns: {
                movie: "{baseUrl}/movie/{id}?autoPlay=true&theme=dc2828",
                tv: "{baseUrl}/tv/{id}/{season}/{episode}?autoPlay=true&theme=dc2828",
            },
        },
        {
            id: "vidking",
            name: "VidKing",
            enabled: true,
            required: false,
            priority: 2,
            baseUrl: "https://www.vidking.net/embed",
            embedPatterns: {
                movie: "{baseUrl}/movie/{id}/?autoPlay=true&color=dc2828",
                tv: "{baseUrl}/tv/{id}/{season}/{episode}/?autoPlay=true&color=dc2828",
            },
        },
        {
            id: "two_embed",
            name: "2embed.online",
            enabled: true,
            required: false,
            priority: 3,
            baseUrl: "https://www.2embed.online/embed",
            embedPatterns: {
                movie: "{baseUrl}/{id}",
                tv: "{baseUrl}/tv/{id}/{season}/{episode}",
            },
        },
        {
            id: "vidsrc_to",
            name: "VidSrc.to",
            enabled: true,
            required: false,
            priority: 4,
            baseUrl: "https://vidsrc.to/embed",
            embedPatterns: {
                movie: "{baseUrl}/movie/{id}",
                tv: "{baseUrl}/tv/{id}/{season}/{episode}",
            },
        },
        {
            id: "vidsrc_me",
            name: "VidSrc.me",
            enabled: true,
            required: false,
            priority: 5,
            baseUrl: "https://vidsrc.me/embed",
            embedPatterns: {
                movie: "{baseUrl}/movie?tmdb={id}",
                tv: "{baseUrl}/tv?tmdb={id}&season={season}&episode={episode}",
            },
        },
        // {
        //     id: "superembed",
        //     name: "SuperEmbed",
        //     enabled: true,
        //     required: false,
        //     priority: 6,
        //     baseUrl: "https://multiembed.mov/directstream.php",
        //     embedPatterns: {
        //         movie: "{baseUrl}?video_id={id}&tmdb=1",
        //         tv: "{baseUrl}?video_id={id}&tmdb=1&s={season}&e={episode}",
        //     },
        // },
    ],
}

export const GetExtensions = (): ExtensionManifest => {
    return extension
}
