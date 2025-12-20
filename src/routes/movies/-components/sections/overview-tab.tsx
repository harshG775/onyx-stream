import { formatDate, formatRuntime } from "@/lib/utils"
import { MovieDetails } from "@/types/tmdb.types"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, Calendar, Clock, Flag, Globe, Tag } from "lucide-react"

type MetaRowProps = {
    icon: React.ReactNode
    label: string
    value: string | React.ReactNode
}

const MetaRow: React.FC<MetaRowProps> = ({ icon, label, value }) => (
    <div className="flex flex-col">
        <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-muted-foreground text-sm">{value}</div>
    </div>
)
export function OverviewTab({ details }: { details: MovieDetails }) {
    return (
        <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
            <div>
                <div className="italic text-xl">&quot;{details.tagline}&quot;</div>
                <div className="text-muted-foreground text-sm">{details.overview}</div>
            </div>

            <MetaRow
                icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
                label="Released"
                value={formatDate(details.release_date)}
            />

            <MetaRow
                icon={<Clock className="w-4 h-4 text-muted-foreground" />}
                label="Runtime"
                value={formatRuntime(Number(details.runtime))}
            />

            <MetaRow
                icon={<Tag className="w-4 h-4 text-muted-foreground" />}
                label="Genre"
                value={details.genres.map((g) => g.name).join(", ")}
            />

            <MetaRow
                icon={<Globe className="w-4 h-4 text-muted-foreground" />}
                label="Spoken Languages"
                value={details.spoken_languages.map((l) => l.name).join(", ")}
            />

            <MetaRow
                icon={<Flag className="w-4 h-4 text-muted-foreground" />}
                label="Production Countries"
                value={details.production_countries.map((c) => c.name).join(", ")}
            />

            <MetaRow
                icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
                label="Production Companies"
                value={details.production_companies.map((c) => c.name).join(", ")}
            />
        </div>
    )
}


// Helper to mimic the MetaRow structure
const MetaRowSkeleton = () => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
            {/* Icon */}
            <Skeleton className="h-4 w-4" />
            {/* Label */}
            <Skeleton className="h-4 w-24" />
        </div>
        {/* Value */}
        <Skeleton className="h-3 w-1/2 mt-1" />
    </div>
)

export function OverviewTabSkeleton() {
    return (
        <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
            {/* Tagline & Overview Section */}
            <div className="space-y-2 mb-6">
                {/* Tagline (larger text) */}
                <Skeleton className="h-7 w-3/4" />

                {/* Overview (paragraph text) */}
                <div className="space-y-1 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>

            {/* Meta Rows - Generating 6 to match your fields: 
          Released, Runtime, Genre, Languages, Countries, Companies */}
            {[...Array(6)].map((_, i) => (
                <MetaRowSkeleton key={i} />
            ))}
        </div>
    )
}