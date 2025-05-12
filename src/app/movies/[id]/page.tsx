import TMDBImage from "@/components/TMDB/Image";
import { getMovieDetails } from "@/lib/tmdb-api";

export default async function MoviesDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getMovieDetails(Number(id));

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 w-full">
            {/* Hero section */}
            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
                <div className="rounded-xl overflow-hidden shadow-md">
                    <TMDBImage
                        path={result.backdrop_path}
                        alt={result.title || "Movie image"}
                        type="backdrop"
                        size="original"
                    />
                </div>

                {/* Metadata section */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{result.title}</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">{result.overview}</p>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                        <span>🗓️ {new Date(result.release_date).getFullYear()}</span>
                        <span>⭐ {result.vote_average.toFixed(1)}</span>
                        <span>🎬 {result.runtime} min</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
