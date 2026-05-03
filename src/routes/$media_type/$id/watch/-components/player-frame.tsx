import type { ResolvedSource } from "#/routes/$media_type/$id/watch/-lib/resolve-sources"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react"

interface Props {
    sources: ResolvedSource[]
    title: string
}

type FrameState = "loading" | "loaded" | "error"

export function PlayerFrame({ sources, title }: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [frameState, setFrameState] = useState<FrameState>("loading")
    const [retryKey, setRetryKey] = useState(0)

    const active = sources[activeIndex]

    const handleSourceChange = useCallback((index: number) => {
        setFrameState("loading")
        setActiveIndex(index)
        setRetryKey(0)
    }, [])

    const handleRetry = useCallback(() => {
        setFrameState("loading")
        setRetryKey((k) => k + 1)
    }, [])

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4">
            <div className="relative w-full aspect-video rounded-none xl:rounded-xl overflow-hidden shadow-2xl bg-black">
                {frameState === "loading" && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
                            <p className="text-sm text-white/60 animate-pulse">Loading player…</p>
                        </div>
                    </div>
                )}

                {frameState === "error" && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4 text-center px-6 max-w-sm">
                            <div className="size-14 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                                <WifiOff className="size-6 text-destructive" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-white">Failed to load player</p>
                                <p className="text-xs text-white/50 leading-relaxed">
                                    This source couldn't be reached. Try retrying or switch to a different source.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    // size="sm"
                                    // variant="outline"
                                    onClick={handleRetry}
                                    className="gap-1.5 text-xs border-white/20 text-white hover:bg-white/10 hover:text-white"
                                >
                                    <RefreshCw className="size-3" />
                                    Retry
                                </button>
                                {sources.length > 1 && activeIndex < sources.length - 1 && (
                                    <button
                                        // size="sm"
                                        // variant="default"
                                        onClick={() => handleSourceChange(activeIndex + 1)}
                                        className="text-xs"
                                    >
                                        Try next source
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <iframe
                    key={`${active.url}-${retryKey}`}
                    src={active.url}
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="origin"
                    onLoad={() => setFrameState("loaded")}
                    onError={() => setFrameState("error")}
                    className={cn(
                        "w-full h-full border-0 transition-opacity duration-300",
                        frameState === "loaded" ? "opacity-100" : "opacity-0 pointer-events-none",
                    )}
                />
            </div>
            {title && (
                <div className="px-4 xl:px-0">
                    <h1 className="text-lg font-semibold text-wrap line-clamp-4">{title}</h1>
                </div>
            )}
            {sources.length > 1 && (
                <div className="px-4 xl:px-0 space-y-4">
                    <span className="text-sm font-bold text-muted-foreground">Source</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {sources.map((src, i) => (
                            <button
                                key={src.id}
                                onClick={() => handleSourceChange(i)}
                                className={cn(
                                    "px-2 py-1 text-xs rounded transition-colors",
                                    i === activeIndex
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80",
                                )}
                            >
                                {src.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex-1">
                            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-200/80 transition-colors">
                                <AlertTriangle className="size-5 xl:size-7 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold leading-none">Third-party Hosting</p>
                                    <p className="text-xs opacity-80 leading-relaxed">
                                        We recommend using an <strong>AdBlocker</strong> for the best experience. If a
                                        video freezes or fails to load, please switch to a different source above.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
