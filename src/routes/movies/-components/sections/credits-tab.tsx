import { Skeleton } from "@/components/ui/skeleton"

type CreditsTabProps = {
    media_type: "tv" | "movie"
    mediaId: number
}
export function CreditsTab({}: CreditsTabProps) {
    return (
        <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
            <div>
                <div className="text-sm font-semibold">Cast</div>
                <div>
                    <Skeleton className="min-h-56 h-full w-full" />
                </div>
            </div>
            <div>
                <div className="text-sm font-semibold">Crew</div>
                <div>
                    <Skeleton className="min-h-56 h-full w-full" />
                </div>
            </div>
        </div>
    )
}
