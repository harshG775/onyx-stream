export const extensions = [
    {
        name: "Example Plugin",
        version: "1.0.0",
        description: "vidsrc.me movies and tv ",
        sections: [
            {
                id: "3d49dbd4-6512-4232-a019-1635c9b108c0",
                name: "latest TvShows",
                requestConfig: {
                    url: "https://vidsrc.xyz/tvshows/latest/page-1.json",
                },
                handleFormatResponse: async (response) => {
                    // Modify the API response to the format
                    return response.data.result.map((item) => ({
                        title: item.title, // Title from the placeholder API
                        link: `/tv/${item.tmdb_id}`, // Mocked streaming URL
                    }));
                },
            },
            {
                id: "3d49dbd4-6512-4232-a019-8885c9b108c0",
                name: "latest movies",
                requestConfig: {
                    url: "https://vidsrc.xyz/movies/latest/page-1.json",
                },
                handleFormatResponse: async (response) => {
                    // Modify the API response to the format
                    return response.data.result.map((item) => ({
                        title: item.title, // Title from the placeholder API
                        link: `/tv/${item.tmdb_id}`, // Mocked streaming URL
                    }));
                },
            },
        ],
    },
];
