import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Bookmark, Share2, Youtube } from "lucide-react"
import { Button } from "../ui/button"

type DetailsHeaderProps = { title: string; onTrailer: () => void; onAddToWatchList: () => void; onShare: () => void }
export function DetailsHeader({ title, onTrailer, onShare }: DetailsHeaderProps) {
    return (
        <header className="px-4 sm:px-0 mt-2 space-y-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="secondary" size="sm" onClick={onTrailer}>
                    <Youtube />
                    <span>Trailer</span>
                </Button>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="ml-auto" title="Add to list">
                            <Bookmark />
                            <span className="sr-only">Add to list</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to list</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon-sm" onClick={onShare}>
                            <Share2 />
                            <span className="sr-only">Share</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Share</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    )
}
