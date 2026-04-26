import type { ResolvedSource } from "#/lib/resolve-sources"
import { useState } from "react"

interface Props {
    sources: ResolvedSource[]
}

export function PlayerFrame({ sources }: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const active = sources[activeIndex]

    return (
        <div>
            <div className="aspect-video w-full h-full border shadow">
                <iframe
                    key={active.url} // remount on source change
                    src={active.url}
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="origin"
                    className="flex-1 w-full h-full"
                />
            </div>
            {sources.length > 1 && (
                <div className="flex gap-2">
                    <span className="source-picker__label">Source:</span>
                    {sources.map((src, i) => (
                        <button
                            key={src.id}
                            className={`border px-2 rounded-sm ${i === activeIndex ? "border-primary" : ""}`}
                            onClick={() => setActiveIndex(i)}
                        >
                            {src.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
