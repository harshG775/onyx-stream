import { getTMDBImageUrl } from "@/lib/services/tmdb"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

type DetailsHeroProps = {
    details: {
        backdrop_path: string | null
        poster_path: string | null
        altLabel: string
        status: string
    }
    onClickWatch: () => void
}
export function DetailsHero({ details, onClickWatch }: DetailsHeroProps) {
    const { backdrop_path, poster_path, altLabel, status } = details
    const canWatch =
        status === "Released" || status === "Returning Series" || status === "Ended" || status === "Canceled"
    return (
        <div className="relative">
            <picture>
                <source media="(max-width: 640px)" srcSet={getTMDBImageUrl(backdrop_path, "w780") || ""} />
                <source media="(max-width: 1024px)" srcSet={getTMDBImageUrl(backdrop_path, "w1280") || ""} />
                <img
                    src={getTMDBImageUrl(backdrop_path, "original") || ""}
                    alt={`Backdrop of ${altLabel}`}
                    className="w-full h-full object-cover min-h-96 xl:aspect-video rounded-2xl"
                    loading="lazy"
                />
            </picture>
            <div className="absolute bottom-0 left-0 right-0 w-full flex justify-start">
                <div className="z-10 flex items-end relative">
                    <div className="-z-10 absolute bottom-[calc(100%-16px)] -left-[16px] border-b-16 border-l-16 border-background rounded-bl-4xl size-12"></div>
                    <div className="bg-background pl-0 p-3 rounded-tl-none rounded-t-2xl">
                        <img
                            src={getTMDBImageUrl(poster_path, "w780") || undefined}
                            alt={`poster_path of ${altLabel}`}
                            className="max-w-32 rounded-md"
                        />
                    </div>
                    <div className="relative bg-background pl-0 p-3 rounded-tl-none rounded-t-2xl">
                        <div className="-z-10 absolute bottom-[calc(100%-16px)] -left-[16px] border-b-16 border-l-16 border-background rounded-bl-4xl size-12"></div>
                        <div className="-z-10 absolute -bottom-[16px] left-[calc(100%-16px)] border-b-16 border-l-16 border-background rounded-bl-4xl size-12"></div>
                        <Button
                            size={"lg"}
                            title={canWatch ? "Watch" : "media not available"}
                            onClick={onClickWatch}
                            disabled={!canWatch}
                        >
                            <PlayCircle />
                            <span>Watch</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
