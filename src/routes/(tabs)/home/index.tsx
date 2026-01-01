import { createFileRoute } from "@tanstack/react-router"
import { tmdb } from "@/lib/services/tmdb"
import { Spinner } from "@/components/ui/spinner"
import { HomeHeroSection } from "./-components/sections/home-hero-section"
import CategorySection from "./-components/sections/category-section"

export const Route = createFileRoute("/(tabs)/home/")({
    ssr: false,
    pendingComponent: () => (
        <div className="grid place-content-center p-4">
            <Spinner className="size-6" />
        </div>
    ),
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="space-y-4">
            <HomeHeroSection />
            <CategorySection
                queryKey={["trending", "movies"]}
                queryFn={() => tmdb.getTrendingMovies("day", 1)}
                title="Trending Movies"
                mediaPath="movies"
            />
            <CategorySection
                queryKey={["trending", "tv"]}
                queryFn={() => tmdb.getTrendingTV("day", 1)}
                title="Trending Tv Shows"
                mediaPath="tv"
            />
            <CategorySection
                queryKey={["popular ", "movies"]}
                queryFn={() => tmdb.getPopularMovies()}
                title="Popular Movies"
                mediaPath="movies"
            />
            <CategorySection
                queryKey={["popular ", "tv"]}
                queryFn={() => tmdb.getPopularTV()}
                title="Popular Tv"
                mediaPath="tv"
            />
        </main>
    )
}
