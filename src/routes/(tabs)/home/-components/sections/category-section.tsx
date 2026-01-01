import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import type { PaginatedResponse } from "@/types/tmdb.types"
import { getTMDBImageUrl } from "@/lib/services/tmdb"
import { FlatList } from "@/components/flat-list"
import { Skeleton } from "@/components/ui/skeleton"

type CategorySectionProps = {
    title: string
    queryFn: () => Promise<PaginatedResponse<any>>
    queryKey: Array<string>
    mediaPath: "movies" | "tv"
}
export default function CategorySection({ title, queryFn, queryKey, mediaPath }: CategorySectionProps) {
    const { isLoading, isError, data } = useQuery({
        queryKey: queryKey,
        queryFn,
    })
    return (
        <FlatList
            title={title}
            data={data?.results || []}
            isLoading={isLoading}
            isError={isError}
            emptyItemCount={12}
            itemClassName="basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-1 md:pl-2 lg:pl-3"
            keyExtractor={(item) => item.id.toString()}
            renderSkeleton={() => (
                <div className="space-y-2">
                    <Skeleton className="aspect-2/3 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            )}
            renderError={() => (
                <div className="space-y-2">
                    <Skeleton className="aspect-2/3 w-full rounded-lg bg-destructive" />
                    <Skeleton className="h-4 w-3/4 bg-destructive" />
                </div>
            )}
            renderItem={(media) => (
                <Link to={`/${mediaPath}/$id`} params={{ id: media.id.toString() }} className="group">
                    <img
                        src={getTMDBImageUrl(media.poster_path, "w185") || "https://placehold.co/400x600?text=No+Image"}
                        className="w-full rounded-lg transition-opacity group-hover:opacity-90"
                    />
                    <h3 className="text-sm font-semibold line-clamp-2">{media?.title}</h3>
                </Link>
            )}
        />
    )
}
