export function WatchLayout({
    player,
    controls,
    recommended,
    comments,
}: {
    player: React.ReactNode
    controls?: React.ReactNode
    recommended?: React.ReactNode
    comments?: React.ReactNode
}) {

    return (
        <div className="max-w-(--breakpoint-2xl) mx-auto w-full xl:p-3 ">
            <div className="grid gap-4 grid-cols-1 xl:grid-cols-[10fr_24rem]">
                <div>{player}</div>
                <div className="p-4 xl:p-0">
                    {controls && <div>{controls}</div>}
                </div>
            </div>
            {comments && <div>{comments}</div>}
            {recommended && <div>{recommended}</div>}
        </div>
    )
}
