import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { axiosTMDBInstance } from "@/lib/axios";
import { useParams } from "react-router";

export default function InfoRoute() {
    const { mediaType, id } = useParams();

    const handleFetch = async ({ queryKey }) => {
        const [_key, id] = queryKey;

        const media = mediaType === "movies" ? "movie" : mediaType === "tv-shows" ? "tv" : "people";
        const response = await axiosTMDBInstance.get(`${media}/${id}?language=en-US`);
        const result = response.data;

        return {
            title: result.title,
            overview: result.overview,
            imgUrl: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            plot: result.overview,
            year: result.release_date,
            duration: `${result.runtime}min`,
        };
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [mediaType, id],
        queryFn: handleFetch,
    });

    if (isError) {
        console.error(error);
    }
    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)] mt-14">
            <main className="max-w-4xl mx-auto py-8">
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error loading data. Please try again.</div>}
                {data && (
                    <>
                        <div className="flex gap-8">
                            <div className="flex-shrink-0">
                                <img
                                    src={data?.imgUrl}
                                    alt={data?.title}
                                    className="w-64 h-96 object-cover rounded-md shadow-md"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h1 className="text-3xl font-bold">{data?.title}</h1>
                                <div className="text-lg text-gray-600">
                                    <span className="font-semibold">Year:</span> {data?.year}
                                </div>
                                <div className="text-lg text-gray-600">
                                    <span className="font-semibold">Duration:</span> {data?.duration}
                                </div>
                                {data.site && (
                                    <div className="text-lg text-blue-500">
                                        <a href={data.site} target="_blank" rel="noopener noreferrer">
                                            Official Site
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div>Plot:</div>
                            <p>{data?.plot}</p>
                        </div>
                    </>
                )}
            </main>
        </ScrollArea>
    );
}
