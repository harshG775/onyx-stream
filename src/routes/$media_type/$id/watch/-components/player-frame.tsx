import type { ResolvedSource } from "#/routes/$media_type/$id/watch/-lib/resolve-sources"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Props {
    sources: ResolvedSource[]
}

export function PlayerFrame({ sources }: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const active = sources[activeIndex]

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4">
            {isLoading && (
                <div className="w-full h-full aspect-video rounded-none xl:rounded-xl shadow-2xl flex items-center justify-center bg-black/60 z-10">
                    <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
                </div>
            )}

            <div
                className={cn(
                    "w-full h-full aspect-video rounded-none xl:rounded-xl",
                    isLoading ? "hidden" : "",
                )}
            >
                <iframe
                    key={active.url}
                    src={active.url}
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="origin"
                    onLoad={() => setIsLoading(false)}
                    className={"w-full h-full aspect-video rounded-none xl:rounded-xl shadow-lg"}
                />
            </div>

            {sources.length > 1 && (
                <div className="px-4">
                    <span className="text-sm font-bold text-muted-foreground">Source</span>
                    <div className="flex flex-wrap items-center gap-2 ">
                        {sources.map((src, i) => (
                            <button
                                key={src.id}
                                onClick={() => {
                                    setIsLoading(true)
                                    setActiveIndex(i)
                                }}
                                className={cn(
                                    "px-2 py-1 text-xs ",
                                    i === activeIndex
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-muted text-muted-foreground border-border",
                                )}
                            >
                                {src.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
