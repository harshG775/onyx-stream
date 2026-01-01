import { Skeleton } from "@/components/ui/skeleton"

type CommentsSectionType = {
    media_type: "movie" | "tv"
    mediaId: number
    session?: number
    episode?: number
}

export default function CommentsSection({ media_type, mediaId, session, episode }: CommentsSectionType) {
    if (media_type === "tv") {
        return (
            <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
                CommentsSection:tv:{mediaId}session:{session} episode:{episode}
                <Skeleton className="h-4 rounded max-w-xs" />
                <Skeleton className="h-4 rounded" />
            </div>
        )
    }
    if (media_type === "movie") {
        return (
            <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
                movie:{mediaId}
                <Skeleton className="h-4 rounded max-w-xs" />
                <Skeleton className="h-4 rounded" />
            </div>
        )
    }
    return <div className="h-12 w-full bg-destructive"></div>
}
