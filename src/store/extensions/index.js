export const extensions = [
    {
        name: "Example Plugin",
        version: "1.0.0",
        description: "vidsrc.me movies and tv ",
        sections: [
            {
                id: "3d49dbd4-6512-4232-a019-1635c9b108c0",
                name: "Trending TvShows",
                requestConfig: {
                    url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDRjNGQ1ODhlYTA0ZTE1NDI4NDllNWIwM2ZlYWRjOSIsIm5iZiI6MTY0Nzg2Mjg1NC41MjksInN1YiI6IjYyMzg2NDQ2OWVlMGVmMDA0NmRhNTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oBGxSzK3gykXoMkyTZ8PTvchWBQaJytbHVat0psQxWo",
                    },
                },
                // pagination: {
                //     pageParam: "page",
                //     initialPage: 1,
                // },
                handleFormatResponse: async (response) => {
                    return response.data.results.map((item) => ({
                        title: item.name, // Title from the placeholder API
                        link: `/tv/${item.id}`, // Mocked streaming URL
                        imgUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }));
                },
            },
            {
                id: "3d49dbd4-6512-4232-a019-8885c9b108c0",
                name: "now playing movies",
                requestConfig: {
                    url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDRjNGQ1ODhlYTA0ZTE1NDI4NDllNWIwM2ZlYWRjOSIsIm5iZiI6MTY0Nzg2Mjg1NC41MjksInN1YiI6IjYyMzg2NDQ2OWVlMGVmMDA0NmRhNTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oBGxSzK3gykXoMkyTZ8PTvchWBQaJytbHVat0psQxWo",
                    },
                },
                pagination: {
                    pageParam: "page",
                    initialPage: 1,
                    perPage:20
                },
                handleFormatResponse: async (response) => {
                    // Modify the API response to the format
                    return response.data.results.map((item) => ({
                        title: item.title, // Title from the placeholder API
                        link: `/movies/${item.id}`, // Mocked streaming URL
                        imgUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }));
                },
            },
        ],
    },
];
