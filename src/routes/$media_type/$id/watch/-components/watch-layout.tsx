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
                <div className="px-4 xl:px-0">
                    {controls && <div>{controls}</div>}
                </div>
            </div>
            {comments && <div className="mt-4 px-4 xl:px-0">{comments}</div>}
            {recommended && <div className="mt-4 px-4 xl:px-0">{recommended}</div>}
        </div>
    )
}
