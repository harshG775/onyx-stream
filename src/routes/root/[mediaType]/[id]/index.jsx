import { extensions } from "@/store/extensions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

export default function InfoRoute() {
    const [currentExtensions] = useState(extensions[0]);
    const info = currentExtensions.info.movie;
    const { mediaType, id } = useParams();

    const handleFetch = async ({ queryKey }) => {
        const [_key, id] = queryKey;

        const url = info.requestConfig.url.replace(info.idPrefix, id);
        const config = { ...info.requestConfig, url };

        const response = await axios(config);

        // Format the data for rendering
        if (info.handleFormatResponse) {
            const formattedData = await info.handleFormatResponse(response);
            return {
                data: formattedData,
            };
        }
        throw new Error("Extension error");
    };

    // Use React Query to fetch data
    const { data, isLoading, isError } = useQuery({
        queryKey: [mediaType, id],
        queryFn: handleFetch,
    });

    // Render UI
    return (
        <main className="max-w-4xl mx-auto py-8">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading data. Please try again.</div>}
            {data && (
                <>
                    <div className="flex gap-8">
                        <div className="flex-shrink-0">
                            <img
                                src={data?.data?.imgUrl}
                                alt={data?.data?.title}
                                className="w-64 h-96 object-cover rounded-md shadow-md"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">{data?.data?.title}</h1>
                            <div className="text-lg text-gray-600">
                                <span className="font-semibold">Year:</span> {data?.data?.year}
                            </div>
                            <div className="text-lg text-gray-600">
                                <span className="font-semibold">Duration:</span> {data?.data?.duration}
                            </div>
                            {/* {data.site && (
                            <div className="text-lg text-blue-500">
                                <a href={data.site} target="_blank" rel="noopener noreferrer">
                                    Official Site
                                </a>
                            </div>
                        )} */}
                        </div>
                    </div>
                    <div>
                        <div>Plot:</div>
                        <p>{data?.data?.plot}</p>
                    </div>
                </>
            )}
        </main>
    );
}
