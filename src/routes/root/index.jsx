import { extensions } from "@/store/extensions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

function MoviesSection({ section }) {
    // Fetch data from the first section in the extensions array
    const handleFetch = async () => {
        if (!section) {
            throw new Error("No sections available in the extensions configuration");
        }
        const response = await axios(section.requestConfig);
        if (section.handleFormatResponse) {
            return await section.handleFormatResponse(response);
        }
        throw new Error("extension error");
    };

    // Use React Query to fetch and cache data
    const { data, isLoading, isError } = useQuery({
        queryKey: [section.id],
        queryFn: handleFetch,
    });

    // Loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to load data</div>;
    return (
        <div className="max-w-6xl mx-auto mt-8 ">
            <h2 className="text-2xl capitalize">{section.name}</h2>
            <ul className="flex gap-4 flex-wrap ">
                {data.map((media, index) => (
                    <li key={index} className="flex-shrink-0 flex-1 min-w-60">
                        <Link to={media.link} className="line-clamp-1">{media.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function RootRoute() {
    const [currentExtensions, _setCurrentExtensions] = useState(extensions[0]);

    return (
        <div>
            <div>Home Page</div>
            <MoviesSection section={currentExtensions.sections[0]} />
            <MoviesSection section={currentExtensions.sections[1]} />
        </div>
    );
}
