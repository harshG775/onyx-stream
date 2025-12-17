import { getTMDBImageUrl, tmdb } from "@/lib/services/tmdb"
import { MovieDetails } from "@/types/tmdb.types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/movies/$id")({
    loader: async ({ params }) => {
        const details = await tmdb.getMovieDetails(Number(params.id))
        return details
    },
    head: ({ loaderData }) => {
        if (!loaderData) return {}

        const title = `OnyxStream | ${loaderData.title} (${loaderData.release_date?.slice(0, 4)})`
        const description = loaderData.overview || `Details and information about ${loaderData.title}`

        const poster = getTMDBImageUrl(loaderData.poster_path, "w780") || undefined

        const url = `https://onyxstream.com/movies/${loaderData.id}`

        return {
            meta: [
                // SEO
                { title: title },
                { name: "description", content: description },

                // Open Graph
                { property: "og:type", content: "video.movie" },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
                { property: "og:image", content: poster },
                { property: "og:url", content: url },

                // Twitter
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: description },
                { name: "twitter:image", content: poster },
                { name: "twitter:url", content: url },
            ],
            links: [
                {
                    rel: "canonical",
                    href: url,
                },
            ],
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const loaderData: MovieDetails = Route.useLoaderData()

    return (
        <main>
            <section>
                <img
                    src={getTMDBImageUrl(loaderData.backdrop_path, "w780") || undefined}
                    alt={`backdrop_path-${loaderData.title}`}
                />
            </section>
            <div>
                <section>
                    <p>Overview</p>
                    <div className="space-y-4 p-4">
                        <div>
                            <div>"{loaderData.tagline}"</div>
                            <div className="text-muted-foreground">{loaderData.overview}</div>
                        </div>
                        <div>
                            <div>Released</div>
                            <div className="text-muted-foreground">{loaderData.release_date}</div>
                        </div>
                        <div>
                            <div>Runtime</div>
                            <div className="text-muted-foreground">{loaderData.runtime}</div>
                        </div>
                        <div>
                            <div>Genre</div>
                            <div className="text-muted-foreground">
                                {loaderData.genres.map((genre) => `${genre.name}, `)}
                            </div>
                        </div>
                        <div>
                            <div>Spoken Languages</div>
                            <div className="text-muted-foreground">
                                {loaderData.spoken_languages.map((language) => `${language.name}, `)}
                            </div>
                        </div>
                        <div>
                            <div>Production Countries</div>
                            <div className="text-muted-foreground">
                                {loaderData.production_countries.map((country) => `${country.name}, `)}
                            </div>
                        </div>
                        <div>
                            <div>Production Countries</div>
                            <div className="text-muted-foreground">
                                {loaderData.production_companies.map((company) => `${company.name}, `)}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
