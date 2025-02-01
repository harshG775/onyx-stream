import { ScrollArea } from "@/components/ui/scroll-area";
import { constants } from "@/config";
import { axiosTMDBInstance } from "@/lib/axios";
import NotFoundRoute from "@/routes/not-found";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
const { IMAGE_SIZES } = constants.TMDB;
function MoviesWatchRoute({ params }) {
    const { mediaType, id } = params;

    const handleFetch = async ({ queryKey }) => {
        const [_key, id] = queryKey;
        const media = mediaType === "movies" ? "movie" : mediaType === "tv-shows" ? "tv" : "people";
        const response = await axiosTMDBInstance.get(`${media}/${id}?language=en-US`);
        const result = response.data;
        console.log(result);

        return result;
        // return {
        //     title: result.title,
        //     overview: result.overview,
        //     imgUrl: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        //     plot: result.overview,
        //     year: result.release_date,
        //     duration: `${result.runtime}min`,
        // };
    };

    const {
        data,
        isLoading: _isLoading,
        isError: _isError,
        isSuccess: _isSuccess,
        error: _error,
    } = useQuery({
        queryKey: [mediaType, id],
        queryFn: handleFetch,
    });

    return (
        <main className="max-w-[96rem] mx-auto grid lg:grid-cols-[2fr,24rem] gap-4 p-2 sm:p-4">
            <div>
                <section
                // className="sticky top-4"
                >
                    <div className="w-full aspect-video bg-secondary overflow-hidden rounded-lg">
                        <img
                            src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.BACKDROP_SIZES.W300}${data?.backdrop_path}`}
                            alt={data?.title}
                            className="w-full blur-md"
                        />
                        {/* <iframe
                    src="https://vidsrc.me/embed/movie?tmdb=939243"
                    referrerPolicy="origin"
                    allowFullScreen
                    className="w-full h-full aspect-video"
                /> */}
                    </div>
                    <div>{data?.title}</div>
                </section>
                <div>
                    <div className="flex py-2 gap-1">
                        {data?.genres?.map((genre, i) => (
                            <Link
                                to={`/genres/${genre.id}`}
                                key={`${i}+${genre.id}`}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50   px-2 py-1   border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                            >
                                <div>{genre.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <section className="bg-secondary/20  overflow-y-auto">
                {Array.from({ length: 40 }, (_, i) => (
                    <div key={i}>item</div>
                ))}
            </section>
        </main>
    );
}
function TvShowWatchRoute({ params }) {
    return (
        <main className="max-w-[96rem] mx-auto">
            TvShowWatchRoute
            <h1>video id:{params.id}</h1>
        </main>
    );
}
function AnimeWatchRoute({ params }) {
    return (
        <main className="max-w-[96rem] mx-auto">
            AnimeWatchRoute
            <h1>video id:{params.id}</h1>
        </main>
    );
}

export default function WatchRoute() {
    const params = useParams();
    const validMediaTypes = /^(tv-show|movies|anime)$/;
    if (!validMediaTypes.test(params?.mediaType)) {
        return <NotFoundRoute />;
    }
    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)] mt-14 overflow-y-auto">
            {params?.mediaType === "movies" && <MoviesWatchRoute params={params} />}
            {params?.mediaType === "tv-show" && <TvShowWatchRoute params={params} />}
            {params?.mediaType === "anime" && <AnimeWatchRoute params={params} />}
        </ScrollArea>
    );
}
