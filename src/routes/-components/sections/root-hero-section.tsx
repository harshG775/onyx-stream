import { tmdb } from "@/lib/services/tmdb"
import { useQuery } from "@tanstack/react-query"

export function RootHeroSection() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["trending", "movies"],
        queryFn: () => tmdb.getTrendingAll("day", 1),
    })
    return (
        <section>
            {isError && "Error"}
            {isLoading && "Loading"}
            {!isLoading &&
                !isError &&
                data?.results.map((media, idx) => {
                    return <div key={idx}>{media.media_type}</div>
                })}
        </section>
    )
}