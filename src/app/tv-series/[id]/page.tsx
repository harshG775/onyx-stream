import axios from "axios";

export default async function TvSeriesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
    });

    return (
        <main className="mx-auto max-w-7xl flex-1 w-full">
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt={data.name} />
            </div>
            <div>{data.name}</div>
        </main>
    );
}
