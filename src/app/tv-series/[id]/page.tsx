import TMDBImage from "@/components/TMDB/Image";
import { getTVDetails } from "@/lib/tmdb-api";

export default async function TvSeriesDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getTVDetails(Number(id));

    return (
        <main className="max-w-[96rem] mx-auto px-4 py-8 w-full">
            {/* Hero section */}
            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
                <div className="rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src={`https://vidsrc.me/embed/tv?tmdb=${result.id}`}
                        referrerPolicy="origin"
                        allowFullScreen
                        width="100%"
                        height="100%"
                        className="w-full h-full aspect-video bg-secondary"
                    ></iframe>
                </div>

                {/* Metadata section */}
                <div className="flex gap-4 flex-wrap">
                    <TMDBImage
                        path={result.poster_path}
                        alt={result.name || "Movie image"}
                        type="poster"
                        size="w500"
                        className="flex-1 basis-[24rem] rounded-xl overflow-hidden shadow-md h-48 object-cover"
                    />
                    <div className="flex-1 basis-[16rem] space-y-4">
                        <h1 className="text-3xl font-bold">{result.name}</h1>
                        <p className="text-muted-foreground text-sm leading-relaxed">{result.overview}</p>
                        <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                            <span>🗓️ {new Date(result.first_air_date).getFullYear()}</span>
                            <span>⭐ {result.vote_average.toFixed(1)}</span>
                            {result.episode_run_time.length > 0 && (
                                <span>⏱️ {result.episode_run_time[0]} min / episode</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
