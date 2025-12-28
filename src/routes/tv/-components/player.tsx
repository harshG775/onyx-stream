// const mediaSources = [
//     {
//         id: "me",
//         url: "https://vidsrc.me/embed/${mediaType}?tmdb=${id}&season=${season}&episode=${episode}",
//     },
//     {
//         id: "to",
//         url: "https://vidsrc.to/embed/${mediaType}/${id}/${season}/${episode}",
//     },
//     {
//         id: "superembed",
//         url: "https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}",
//     },
//     {
//         id: "2embed",
//         url: "https://www.2embed.stream/embed/${mediaType}/${id}/${season}/${episode}",
//     },
// ]

export function Player({ mediaId, season = 1, episode = 1 }: { mediaId: number; season?: number; episode?: number }) {
    return (
        <div className="w-full h-full">
            <iframe
                src={`https://www.2embed.stream/embed/${"tv"}/${mediaId}/${season}/${episode}`}
                className="w-full h-full aspect-video rounded-2xl bg-muted-foreground/80"
            />
        </div>
    )
}
