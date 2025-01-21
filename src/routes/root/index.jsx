import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { extensions } from "@/store/extensions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

function Pagination({ className, currentPage, setCurrentPage, hasNextPage }) {
    return (
        <div className={cn("flex justify-center", className)}>
            {currentPage === 1 ? (
                ""
            ) : (
                <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant={"outline"}
                >
                    Previous
                </Button>
            )}

            <span className="px-4 py-2">{currentPage}</span>
            <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={!hasNextPage} variant={"outline"}>
                Next
            </Button>
        </div>
    );
}

function MoviesSection({ section }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch data with pagination or without
    const handleFetch = async ({ queryKey }) => {
        const [_key, page] = queryKey;

        if (!section) {
            throw new Error("No sections available in the extensions configuration");
        }

        const config = { ...section.requestConfig };
        if (section.pagination) {
            config.params = {
                ...(config.params || {}),
                [section.pagination.pageParam || "page"]: page,
            };
        }

        const response = await axios(config);
        if (section.handleFormatResponse) {
            const formattedData = await section.handleFormatResponse(response);
            return {
                data: formattedData,
                hasNextPage: section.pagination ? response.data.page < response.data.total_pages : false, // If pagination isn't supported, assume there's no next page
            };
        }

        throw new Error("Extension error");
    };

    // Use React Query to fetch and cache paginated data
    const { data, isLoading, isError } = useQuery({
        queryKey: [section.id, currentPage], // Include currentPage in queryKey
        queryFn: handleFetch,
        keepPreviousData: true, // Keep previous data while fetching new
    });

    // Loading and error states
    // if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to load data</div>;

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="flex flex-wrap justify-between py-4">
                <h2 className="text-2xl capitalize">{section.name}</h2>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    hasNextPage={section.pagination || data?.hasNextPage}
                />
            </div>
            {isLoading && (
                <ul className="flex gap-4 flex-wrap">
                    {Array.from({ length: 20 }, (_, i) => (
                        <li
                            key={i}
                            className="flex-shrink-0 flex-grow-0 flex-1 min-w-40 min-h-64 animate-pulse bg-gray-600/40"
                        >
                            {/* create loading for it */}
                        </li>
                    ))}
                </ul>
            )}
            {!isLoading && (
                <ul className="flex gap-4 flex-wrap">
                    {data?.data.map((media, index) => (
                        <li key={index} className="flex-shrink-0 flex-grow-0 flex-1 min-w-40 min-h-64">
                            <Link to={media.link}>
                                <div>
                                    <img src={media.imgUrl} alt={media.title} />
                                </div>
                                <div className="line-clamp-1">{media.title}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex justify-end py-4">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    hasNextPage={section.pagination || data?.hasNextPage}
                />
            </div>
        </div>
    );
}

export default function RootRoute() {
    const [currentExtensions] = useState(extensions[0]);

    return (
        <div>
            <div>Home Page</div>
            <MoviesSection section={currentExtensions.sections[0]} />
            <MoviesSection section={currentExtensions.sections[1]} />
        </div>
    );
}
