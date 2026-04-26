export const TvControls = ({ season, episode }: { season: number; episode: number }) => {
    return (
        <div className="flex gap-3 flex-wrap items-center">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Season</span>
                <input
                    type="number"
                    value={season}
                    min={1}
                    onChange={() => {}}
                    className="w-16 border rounded px-2 py-1"
                />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Episode</span>
                <input
                    type="number"
                    value={episode}
                    min={1}
                    onChange={() => {}}
                    className="w-16 border rounded px-2 py-1"
                />
            </div>
        </div>
    )
}
